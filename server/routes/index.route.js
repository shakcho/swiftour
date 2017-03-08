import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import guideRoutes from './guide.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

//mount guide routes at /guides
router.use('/guides',guideRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
