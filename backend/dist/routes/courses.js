import { Router } from 'express';
import { param, query, validationResult } from 'express-validator';
// AI course generation is now handled on the frontend via Puter.js
import { exportCourse } from '../controllers/courseController.js';
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
// Export a course
router.get('/export/:id', validate([
    param('id').isMongoId().withMessage('Invalid course ID'),
    query('format').isIn(['txt', 'pdf']).withMessage('Invalid format'),
]), exportCourse);
// Generate a new course (stub)
router.post('/', async (req, res) => {
    const { coursePrompt, format } = req.body;
    if (!coursePrompt) {
        return res.status(400).json({ error: 'coursePrompt is required.' });
    }
    // Stub: Pretend to generate a course and return a dummy response
    return res.status(200).json({
        fileUrl: `/files/dummy-course-id.${format || 'txt'}`,
        fileId: 'dummy-course-id',
        message: 'Course generated successfully (stub).'
    });
});
export default router;
