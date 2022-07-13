import express from 'express';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth';
import { Roles } from '../models/userModel';

const router = express.Router();

export default router;
