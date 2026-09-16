import express from 'express';
import {
  getSymptomsController,
  diagnoseSymptomsController,
  healthCheckController,
} from '../controllers/symptomController.js';

const router = express.Router();

/**
 * @route   GET /api/symptoms
 * @desc    Fetch body zones and list of symptoms
 * @access  Public
 */
router.get('/symptoms', getSymptomsController);

/**
 * @route   POST /api/diagnosa
 * @desc    Submit selected symptoms and retrieve diagnostic matches
 * @access  Public
 */
router.post('/diagnosa', diagnoseSymptomsController);

/**
 * @route   GET /api/health
 * @desc    Health check status
 * @access  Public
 */
router.get('/health', healthCheckController);

export default router;
