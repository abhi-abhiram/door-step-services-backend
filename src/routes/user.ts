import express from 'express';
import { registerClient } from '../controllers/commonController';
import { editUser, getUser } from '../controllers/userController';
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

export default router;
