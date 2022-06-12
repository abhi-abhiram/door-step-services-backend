import express from 'express';
import createService from '../controllers/professionalController';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth';
import { Roles } from '../models/userModel';

const router = express.Router();

/**
 * @openapi
 '/api/professional/createService':
   *  post:
   *     tags:
   *     - Professional
   *     summary: create a service
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/createService'
   *     responses:
   *      201:
   *        description: serivce added successfully
   */
router
  .route('/createService')
  .post(isAuthenticatedUser, authorizeRoles(Roles.PROFESSIONAL), createService);

export default router;
