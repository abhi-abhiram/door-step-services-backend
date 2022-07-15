import express from 'express';
import {
  logout,
  loginClient,
  createCheckout,
  createOrder,
} from '../controllers/commonController';

const router = express.Router();

/**
 * @openapi
 '/api/login':
   *  post:
   *     tags:
   *     - All
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
   *     - All
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
   *     - All
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
