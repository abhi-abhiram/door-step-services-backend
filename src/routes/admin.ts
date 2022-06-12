import express from 'express';
import makeProfessional from '../controllers/adminController';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth';
import { Roles } from '../models/userModel';

const router = express.Router();

/**
 * @openapi
 '/api/admin/makeProfessional':
   *  post:
   *     tags:
   *     - Admin
   *     summary: Make user to professional
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/makeProfessional'
   *     responses:
   *      201:
   *        description: successfully converted to professional
   */
router
  .route('/makeProfessional')
  .post(isAuthenticatedUser, authorizeRoles(Roles.ADMIN), makeProfessional);

export default router;
