import express from 'express';
import {
  logout,
  loginClient,
  registerClient,
  addAddress,
} from '../controllers/commonController';
import { isAuthenticatedUser } from '../middleware/auth';

const router = express.Router();

/**
 * @openapi
 '/api/register':
   *  post:
   *     tags:
   *     - Client
   *     summary: Register a client
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/Register'
   *     responses:
   *      201:
   *        description: client created successfully
   *      409:
   *        description: values already exists
   */
router.route('/register').post(registerClient);

/**
 * @openapi
 '/api/addAddress':
   *  post:
   *     tags:
   *     - Client
   *     summary: Add address for a client
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/addAddress'
   *     responses:
   *      201:
   *        description: address added successfully
   */
router.route('/addAddress').post(isAuthenticatedUser, addAddress);

/**
 * @openapi
 '/api/login':
   *  post:
   *     tags:
   *     - Client
   *     summary: client login
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/login'
   *     responses:
   *      200:
   *        description: login success
   */
router.route('/login').post(loginClient);

/**
 * @openapi
 '/api/logout':
   *  get:
   *     tags:
   *     - Client
   *     summary: client logout
   *     responses:
   *      200:
   *        description: logout successfull
   */
router.route('/logout').get(logout);

export default router;
