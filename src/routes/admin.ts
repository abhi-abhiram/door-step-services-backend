import express from 'express';
import {
  createAdmin,
  createService,
  getPendingOrders,
  getProfessionals,
  getUsers,
  makeOrderComplete,
} from '../controllers/adminController';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth';
import { Roles } from '../models/userModel';

const router = express.Router();

/**
 * @openapi
 '/api/admin/createAdmin':
   *  post:
   *     tags:
   *     - Admin
   *     summary: Create a Admin Account
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/createAdmin'
   *     responses:
   *      201:
   *        description: New Admin added to database
   */
router
  .route('/createAdmin')
  .post(isAuthenticatedUser, authorizeRoles(Roles.ADMIN), createAdmin);

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

/**
 * @openapi
 '/api/admin/makeOrderComplete':
   *  post:
   *     tags:
   *     - Admin
   *     summary: Make Order complete
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/makeOrderComplete'
   *     responses:
   *      201:
   *        description: success
   */
router
  .route('/makeOrderComplete')
  .post(isAuthenticatedUser, authorizeRoles(Roles.ADMIN), makeOrderComplete);

/**
 * @openapi
 '/api/admin/getUsers':
   *  get:
   *     tags:
   *     - Admin
   *     summary: get all users in database
   *     responses:
   *      200:
   *        description: All current pending orders
   */
router
  .route('/getUsers')
  .post(isAuthenticatedUser, authorizeRoles(Roles.ADMIN), getUsers);

/**
 * @openapi
 '/api/admin/getProfessionals':
   *  get:
   *     tags:
   *     - Admin
   *     summary: get all professionals in database
   *     responses:
   *      200:
   *        description: All current pending orders
   */
router
  .route('/getProfessionals')
  .post(isAuthenticatedUser, authorizeRoles(Roles.ADMIN), getProfessionals);

export default router;
