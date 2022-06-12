import express from 'express';
import createCheckout, { createOrder } from '../controllers/userController';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth';
import { Roles } from '../models/userModel';

const router = express.Router();

/**
 * @openapi
 '/api/user/createCheckout':
   *  post:
   *     tags:
   *     - User
   *     summary: create a checkout page
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/createCheckout'
   */
router
  .route('/createCheckout')
  .post(isAuthenticatedUser, authorizeRoles(Roles.USER), createCheckout);

router.route('/createOrder').post(createOrder);
export default router;
