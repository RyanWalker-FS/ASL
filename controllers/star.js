const { Star, Planet, Galaxy } = require("../models/index");

// Show all resources
const index = async (req, res) => {
  const stars = await Star.findAll({ include: [Planet, Galaxy] });
  // Respond with an array and 2xx status code
  res.status(200).json(stars);
};

// Show resource
const show = async (req, res) => {
  const star = await Star.findByPk(req.params.id, {
    include: [Planet, Galaxy],
  });
  // Respond with a single object and 2xx code
  res.status(200).json(star);
};

// Create a new resource
const create = async (req, res) => {
  const star = await Star.create(req.body);
  res.status(201).json(star);
  // Issue a redirect with a success 2xx code
  //res.redirect(`/stars`, 201)
};

// Update an existing resource
const update = async (req, res) => {
  const star = await Star.update(req.body, { where: { id: req.params.id } });
  // Respond with a single resource and 2xx code
  res.status(200).json(star);
};

// Remove a single resource
const remove = async (req, res) => {
  Star.destroy({ where: { id: req.params.id } });
  // Respond with a 2xx status code and bool
  res.status(204).json(true);
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
