import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import guideCtrl from '../controllers/guide.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(guideCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createGuide), guideCtrl.create);

router.route('/:guideId')
  /** GET /api/users/:userId - Get user */
  .get(guideCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateGuide), guideCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(guideCtrl.remove);

/** Load user when API with userId route parameter is hit */
 router.param('guideId', guideCtrl.load);

export default router;
