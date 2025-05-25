import { Router } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { exportCourse, generateCourse } from '../controllers/courseController.js';
import { generateCourseContent } from '../utils/promptEngine.js';
const router = Router();
// Helper function to validate request
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(400).json({ errors: errors.array() });
    };
};
// Generate a new course
router.post('/generate', validate([
    body('topic').trim().notEmpty().withMessage('Topic is required'),
    body('format').isIn(['txt', 'pdf']).withMessage('Invalid format'),
]), generateCourse);
// Export a course
router.get('/export/:id', validate([
    param('id').isMongoId().withMessage('Invalid course ID'),
    query('format').isIn(['txt', 'pdf']).withMessage('Invalid format'),
]), exportCourse);
// Test endpoint for course generation (bypasses auth but includes validation)
router.post('/test-generate', validate([
    body('topic').trim().notEmpty().withMessage('Topic is required'),
    body('format').optional().isIn(['txt', 'pdf']).withMessage('Invalid format'),
]), async (req, res) => {
    try {
        const { topic, format = 'txt' } = req.body;
        console.log('Generating course for topic:', topic);
        const content = await generateCourseContent(topic);
        res.json({
            success: true,
            data: { topic, format, content }
        });
    }
    catch (error) {
        console.error('Error in test endpoint:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate course',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
export default router;
