import Guide from '../models/guide.model';

/**
 * Load guide and append to req.
 */
function load(req, res, next, id) {
  Guide.get(id)
    .then((guide) => {
      req.guide = guide; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get guide
 * @returns {Guide}
 */
function get(req, res) {
  return res.json(req.guide);
}

/**
 * Create new guide
 * @property {string} req.body.username - The username of guide.
 * @property {string} req.body.mobileNumber - The mobileNumber of guide.
 * @returns {Guide}
 */
function create(req, res, next) {
  const guide = new Guide({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    licence: req.body.licence,
    address: req.body.address,
    skills: req.body.skills,
    langaugesKnown: req.body.languagesKnown
  });

  guide.save()
    .then(savedGuide => res.json(savedGuide))
    .catch(e => next(e));
}

/**
 * Update existing guide
 * @property {string} req.body.username - The username of guide.
 * @property {string} req.body.mobileNumber - The mobileNumber of guide.
 * @returns {Guide}
 */
function update(req, res, next) {
  const guide = req.guide;
  guide.username = req.body.username;
  guide.firstName = req.body.firstName;
  guide.lastName = req.body.lastName;
  guide.gender = req.body.gender;
  guide.email = req.body.email;
  guide.mobileNumber = req.body.mobileNumber;
  guide.licence = req.body.licence;
  guide.address.lines = req.body.address.lines;
  guide.address.city = req.body.address.city;
  guide.address.state = req.body.address.state;
  guide.address.zip = req.body.address.zip;
  guide.address.country = req.body.address.country;
  guide.skills = req.body.skills;
  guide.languagesKnown = req.body.languagesKnown;
  guide.save()
    .then(savedGuide => res.json(savedGuide))
    .catch(e => next(e));
}

/**
 * Get guide list.
 * @property {number} req.query.skip - Number of guides to be skipped.
 * @property {number} req.query.limit - Limit number of guides to be returned.
 * @returns {Guide[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Guide.list({ limit, skip })
    .then(guides => res.json(guides))
    .catch(e => next(e));
}

/**
 * Delete guide.
 * @returns {Guide}
 */
function remove(req, res, next) {
  const guide = req.guide;
  guide.remove()
    .then(deletedGuide => res.json(deletedGuide))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
