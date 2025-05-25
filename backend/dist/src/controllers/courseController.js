import { v4 as uuidv4 } from 'uuid';
import fs from 'fs-extra';
import path from 'path';
import { generateCourseContent } from '../utils/promptEngine';
export const generateCourse = async (req, res) => {
    try {
        const { topic, format = 'txt' } = req.body;
        // Generate course content
        const content = await generateCourseContent(topic);
        // Generate a unique ID for the course
        const courseId = uuidv4();
        const fileName = `${courseId}.${format}`;
        const filePath = path.join(process.cwd(), 'exports', fileName);
        // Ensure exports directory exists
        await fs.ensureDir(path.dirname(filePath));
        // Save the file
        await fs.writeFile(filePath, content);
        // Return the course ID and download URL
        res.status(201).json({
            success: true,
            data: {
                id: courseId,
                topic,
                format,
                downloadUrl: `/api/v1/courses/export/${courseId}?format=${format}`
            }
        });
    }
    catch (error) {
        console.error('Error generating course:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate course',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
export const exportCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const format = (req.query.format || 'txt');
        const fileName = `${id}.${format}`;
        const filePath = path.join(process.cwd(), 'exports', fileName);
        // Check if file exists
        if (!await fs.pathExists(filePath)) {
            return res.status(404).json({
                success: false,
                error: 'Course not found or expired'
            });
        }
        // Set appropriate headers for file download
        res.setHeader('Content-Disposition', `attachment; filename="course-${id}.${format}"`);
        // Send the file
        res.sendFile(filePath);
    }
    catch (error) {
        console.error('Error exporting course:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to export course',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
