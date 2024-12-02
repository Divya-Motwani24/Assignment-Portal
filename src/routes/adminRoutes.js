import express from 'express';
import { uploadAssignment, getAssignments, acceptAssignment, rejectAssignment } from '../contollers/adminController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/assignments', authenticate, getAssignments);
router.post('/assignments', authenticate, uploadAssignment);
router.put('/assignments/:id/accept', authenticate, acceptAssignment);
router.put('/assignments/:id/reject', authenticate, rejectAssignment);

export default router;

