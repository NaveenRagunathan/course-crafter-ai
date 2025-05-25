import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

// Use environment variable or default to proxy path
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Define a type for the error response data
interface ErrorResponse {
  error?: string;
  message?: string;
  [key: string]: any;
}

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      code: error.code
    });

    // Handle network errors
    if (error.code === 'ERR_NETWORK') {
      const errorMsg = 'Network error. Please check your connection and ensure the backend server is running.';
      console.error(errorMsg);
      toast.error(errorMsg);
      return Promise.reject(new Error(errorMsg));
    }

    // Handle HTTP errors
    if (error.response) {
      const { status, data } = error.response;
      let errorMessage = 'An error occurred';
      
      if (status === 401) {
        errorMessage = 'Unauthorized. Please log in again.';
      } else if (status === 403) {
        errorMessage = 'You do not have permission to perform this action.';
      } else if (status === 404) {
        errorMessage = 'The requested resource was not found.';
      } else if (status === 500) {
        errorMessage = 'Server error. Please try again later or contact support.';
      } else if (data?.message) {
        errorMessage = data.message;
      } else if (data?.error) {
        errorMessage = data.error;
      }
      
      // Only show error toast for client-side errors (4xx) and server errors (5xx)
      if (status >= 400) {
        toast.error(`Error (${status}): ${errorMessage}`);
      }
      
      return Promise.reject(new Error(errorMessage));
    }

    // Handle other errors
    const errorMsg = 'An unexpected error occurred';
    console.error(errorMsg, error);
    toast.error(errorMsg);
    return Promise.reject(error);
  }
);

// Helper function to handle API responses
const handleResponse = async <T>(promise: Promise<AxiosResponse<T>>): Promise<T> => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    // Error is already handled by the interceptor
    throw error;
  }
};

// Interface for API response
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: any;
}

// Auth API
export const authApi = {
  // Register a new user
  register: (name: string, email: string, password: string) =>
    handleResponse<ApiResponse<{ token: string; user: any }>>(
      api.post('/auth/register', { name, email, password })
    ),
  
  // Login user
  login: (email: string, password: string) =>
    handleResponse<ApiResponse<{ token: string; user: any }>>(
      api.post('/auth/login', { email, password })
    ),
  
  // Login with Google
  googleLogin: (token: string) =>
    handleResponse<ApiResponse<{ token: string; user: any }>>(
      api.post('/auth/google', { token })
    ),
  
  // Get current user
  getMe: () =>
    handleResponse<ApiResponse<{ id: string; name: string; email: string; emailVerified: boolean }>>(
      api.get('/auth/me')
    ),
  
  // Update user details
  updateDetails: (userData: { name?: string; email?: string }) =>
    handleResponse<ApiResponse<{ id: string; name: string; email: string }>>(
      api.put('/auth/updatedetails', userData)
    ),
  
  // Update password
  updatePassword: (currentPassword: string, newPassword: string) =>
    handleResponse<ApiResponse<{ token: string }>>(
      api.put('/auth/updatepassword', { currentPassword, newPassword })
    ),
  
  // Forgot password
  forgotPassword: (email: string) =>
    handleResponse<ApiResponse>(
      api.post('/auth/forgotpassword', { email })
    ),
  
  // Reset password
  resetPassword: (token: string, password: string) =>
    handleResponse<ApiResponse<{ token: string }>>(
      api.put(`/auth/resetpassword/${token}`, { password })
    ),
  
  // Verify email
  verifyEmail: (token: string) =>
    handleResponse<ApiResponse>(
      api.get(`/auth/verifyemail/${token}`)
    ),
  
  // Logout
  logout: () => handleResponse<ApiResponse>(api.get('/auth/logout')),
};

// Course API
export const courseApi = {
  // Generate a new course
  generateCourse: (coursePrompt: string, format: 'txt' | 'pdf' = 'txt') =>
    handleResponse<ApiResponse<{ fileUrl: string; fileId: string }>>(
      api.post('/courses', { coursePrompt, format })
    ),
  
  // Get all courses for the current user
  getCourses: () =>
    handleResponse<ApiResponse<Array<{ id: string; title: string; description: string; fileUrl: string; format: string }>>>(
      api.get('/courses')
    ),
  
  // Get a single course
  getCourse: (id: string) =>
    handleResponse<ApiResponse<{ id: string; title: string; description: string; fileUrl: string; format: string }>>(
      api.get(`/courses/${id}`)
    ),
  
  // Update a course
  updateCourse: (id: string, data: { title?: string; description?: string }) =>
    handleResponse<ApiResponse<{ id: string; title: string; description: string }>>(
      api.put(`/courses/${id}`, data)
    ),
  
  // Delete a course
  deleteCourse: (id: string) =>
    handleResponse<ApiResponse>(api.delete(`/courses/${id}`)),
  
  // Download a generated file
  downloadFile: (fileId: string, fileName: string, format: 'txt' | 'pdf') => {
    return api({
      url: `/files/${fileId}.${format}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  },
};

// Health check
export const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get<{ status: string }>('/health');
    return response.status === 200 && response.data.status === 'ok';
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};

// Set auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error status is 401 and we haven't already retried the request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await api.post('/auth/refresh-token', { refreshToken });
          const { token, refreshToken: newRefreshToken } = response.data;
          
          // Update tokens in storage
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', newRefreshToken);
          
          // Update the Authorization header
          originalRequest.headers.Authorization = `Bearer ${token}`;
          
          // Retry the original request
          return api(originalRequest);
        }
      } catch (error) {
        // If refresh token fails, log the user out
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

// Export the axios instance in case it's needed directly
export { api };
