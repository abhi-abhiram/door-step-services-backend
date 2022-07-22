import express from 'express';
import { registerClient } from '../controllers/commonController';
import {
  editUser,
  getPendingOrders,
  getUser,
  makeOrderComplete,
} from '../controllers/userController';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth';
import { Roles } from '../models/userModel';

const router = express.Router();

/**
 * @openapi
 '/api/user/getUser':
   *  get:
   *     tags:
   *     - User
   *     summary: Get logined User data
   *     responses:
   *      200:
   *        description: success
   */
router
  .route('/getUser')
  .get(isAuthenticatedUser, authorizeRoles(Roles.USER), getUser);

/**
 * @openapi
 '/api/user/register':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/createUser'
   *     responses:
   *      201:
   *        description: User created successfully
   *      409:
   *        description: values already exists
   */
router.route('/register').post(registerClient);

/**
 * @openapi
 '/api/user/edit':
   *  post:
   *     tags:
   *     - User
   *     summary: edit current user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/editUser'
   *     responses:
   *      201:
   *        description: user editted successfully
   */
router
  .route('/edit')
  .post(isAuthenticatedUser, authorizeRoles(Roles.USER), editUser);

/**
 * @openapi
 '/api/user/makeOrderComplete':
   *  post:
   *     tags:
   *     - User
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
  .post(isAuthenticatedUser, authorizeRoles(Roles.USER), makeOrderComplete);

/**
 * @openapi
 '/api/user/getPendingOrders':
   *  get:
   *     tags:
   *     - User
   *     summary: Get pending orders
   *     responses:
   *      200:
   *        description: All current pending orders
   */
router
  .route('/getPendingOrders')
  .get(isAuthenticatedUser, authorizeRoles(Roles.USER), getPendingOrders);

export default router;
