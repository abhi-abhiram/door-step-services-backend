import express from 'express';
import {
  createProfessional,
  createService,
  getPendingOrders,
} from '../controllers/adminController';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth';
import { Roles } from '../models/userModel';

const router = express.Router();

/**
 * @openapi
 '/api/admin/createProfessional':
   *  post:
   *     tags:
   *     - Admin
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
router
  .route('/createProfessional')
  .post(isAuthenticatedUser, authorizeRoles(Roles.ADMIN), createProfessional);

/**
 * @openapi
 '/api/admin/createService':
   *  post:
   *     tags:
   *     - Admin
   *     summary: Create a Service
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/createService'
   *     responses:
   *      201:
   *        description: New Service added to database
   */
router
  .route('/createService')
  .post(isAuthenticatedUser, authorizeRoles(Roles.ADMIN), createService);

/**
 * @openapi
 '/api/admin/getPendingOrders':
   *  get:
   *     tags:
   *     - Admin
   *     summary: Get pending orders
   *     responses:
   *      200:
   *        description: All current pending orders
   */
router
  .route('/getPendingOrders')
  .get(isAuthenticatedUser, authorizeRoles(Roles.ADMIN), getPendingOrders);

export default router;
