import express from 'express';
import {
  logout,
  loginClient,
  registerClient,
  createCheckout,
  createOrder,
} from '../controllers/commonController';

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

/**
 * @openapi
 '/api/createCheckout':
   *  post:
   *     tags:
   *     - Client
   *     summary: create a checkout page
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/createCheckout'
   */
router.route('/createCheckout').post(createCheckout);

router.route('/createOrder').post(createOrder);
export default router;
