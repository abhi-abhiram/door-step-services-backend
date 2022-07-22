import express from 'express';
import {
  createAdmin,
  createService,
  getProfessionals,
  getUsers,
  getAdmin,
  getAdmins,
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
 '/api/admin/getUsers':
   *  get:
   *     tags:
   *     - Admin
   *     summary: get all users in database
   *     responses:
   *      200:
   *        description: success
   */
router
  .route('/getUsers')
  .get(isAuthenticatedUser, authorizeRoles(Roles.ADMIN), getUsers);

/**
 * @openapi
 '/api/admin/getProfessionals':
   *  get:
   *     tags:
   *     - Admin
   *     summary: get all professionals in database
   *     responses:
   *      200:
   *        description: success
   */
router
  .route('/getProfessionals')
  .get(isAuthenticatedUser, authorizeRoles(Roles.ADMIN), getProfessionals);

/**
 * @openapi
 '/api/admin/getAdmins':
   *  get:
   *     tags:
   *     - Admin
   *     summary: get all Admins in database
   *     responses:
   *      200:
   *        description: success
   */
router
  .route('/getAdmins')
  .get(isAuthenticatedUser, authorizeRoles(Roles.ADMIN), getAdmins);

/**
 * @openapi
 '/api/admin/getAdmin':
   *  get:
   *     tags:
   *     - Admin
   *     summary: get admin
   *     responses:
   *      200:
   *        description: success
   */
router
  .route('/getAdmin')
  .get(isAuthenticatedUser, authorizeRoles(Roles.ADMIN), getAdmin);

export default router;
