import { getBodyZonesAndSymptoms, matchConditionsFromSymptoms } from '../models/symptomModel.js';

/**
 * Controller to fetch all body zones and available symptoms
 * GET /api/symptoms
 */
export const getSymptomsController = async (req, res) => {
  try {
    const data = await getBodyZonesAndSymptoms();
    return res.status(200).json({
      success: true,
      message: 'Berhasil mengambil daftar gejala dan area tubuh',
      data,
    });
  } catch (error) {
    console.error('[Controller Error - getSymptoms]:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil data gejala dari server.',
      error: error.message,
    });
  }
};

/**
 * Controller to process user selected symptoms and calculate diagnostic results
 * POST /api/diagnosa
 */
export const diagnoseSymptomsController = async (req, res) => {
  try {
    const { symptoms } = req.body;

    // Validation: check if symptoms payload exists and is an array
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Daftar gejala tidak boleh kosong. Harap pilih minimal 1 gejala.',
        data: null,
      });
    }

    console.log(`[Controller - diagnose] Processing diagnosis request for ${symptoms.length} symptoms...`);

    // Execute matching logic via Model
    const result = await matchConditionsFromSymptoms(symptoms);

    return res.status(200).json({
      success: true,
      message: 'Analisis keluhan berhasil diproses.',
      data: {
        totalSymptomsReported: symptoms.length,
        overallUrgency: result.overallUrgency,
        conditions: result.conditions,
        selfCareSteps: result.selfCareSteps,
        warningSigns: result.warningSigns,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('[Controller Error - diagnoseSymptoms]:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan sistem saat memproses diagnosis.',
      error: error.message,
    });
  }
};

/**
 * Health check controller
 * GET /api/health
 */
export const healthCheckController = (req, res) => {
  return res.status(200).json({
    status: 'OK',
    service: 'Sembuhinkuy Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
};
