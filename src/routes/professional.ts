import express from 'express';
import {
  createProfessional,
  editProfessional,
  getProfessional,
} from '../controllers/professionalController';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth';
import { Roles } from '../models/userModel';

const router = express.Router();

/**
 * @openapi
 '/api/professional/createProfessional':
   *  post:
   *     tags:
   *     - Professional
   *     summary: Create a professional Account
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/createProfessional'
   *     responses:
   *      201:
   *        description: New Professional added to database
   */
router.route('/createProfessional').post(createProfessional);

/**
 * @openapi
 '/api/professional/getProfessional':
   *  get:
   *     tags:
   *     - Professional
   *     summary: get logined professional
   *     responses:
   *      200:
   *        description: New Professional added to database
   */
router
  .route('/getProfessional')
  .get(
    isAuthenticatedUser,
    authorizeRoles(Roles.PROFESSIONAL),
    getProfessional
  );

/**
 * @openapi
 '/api/professional/edit':
   *  post:
   *     tags:
   *     - Professional
   *     summary: edit current Professional
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/editProfessional'
   *     responses:
   *      201:
   *        description: Professional editted successfully
   */
router
  .route('/edit')
  .post(
    isAuthenticatedUser,
    authorizeRoles(Roles.PROFESSIONAL),
    editProfessional
  );
export default router;
