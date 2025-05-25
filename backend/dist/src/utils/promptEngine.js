import { Ollama } from 'ollama';
// Initialize Ollama
const ollama = new Ollama({ host: 'http://localhost:11434' });
// System prompt for course generation
const SYSTEM_PROMPT = `You are an expert course creator. Generate a detailed course outline and content based on the user's prompt. 
Structure it with clear sections, learning objectives, and key points.`;
/**
 * Generates course content using Mistral 7B via Ollama
 * @param {string} prompt - The user's course prompt/idea
 * @returns {Promise<string>} - Generated course content
 * @throws {Error} - If there's an error generating the content
 */
export async function generateCourseContent(prompt) {
    if (!prompt || typeof prompt !== 'string') {
        throw new Error('Prompt must be a non-empty string');
    }
    try {
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: `Create a comprehensive course about: ${prompt}` }
        ];
        const response = await ollama.chat({
            model: 'mistral',
            messages,
            options: {
                temperature: 0.7,
                num_ctx: 4096 // Context window size
            }
        });
        if (!response?.message?.content) {
            throw new Error('No content generated');
        }
        return response.message.content;
    }
    catch (error) {
        console.error('Error in generateCourseContent:', error);
        throw new Error(`Failed to generate course content: ${error instanceof Error ? error.message : String(error)}`);
    }
}
export default {
    generateCourseContent
};
