const { Galaxy, Star } = require("../models/index");

// Show all resources
const index = async (req, res) => {
  const galaxies = await Galaxy.findAll({ include: [Star] });
  // Respond with an array and 2xx status code
  res.status(200).json(galaxies);
};

// Show resource
const show = async (req, res) => {
  const galaxy = await Galaxy.findByPk(req.params.id, { include: [Star] });
  // Respond with a single object and 2xx code
  res.status(200).json(galaxy);
};

// Create a new resource
const create = async (req, res) => {
  const galaxy = await Galaxy.create(req.body);
  res.status(201).json(galaxy);
  // Issue a redirect with a success 2xx code
  //res.redirect(`/galaxies`, 201)
};

// Update an existing resource
const update = async (req, res) => {
  const galaxy = await Galaxy.update(req.body, {
    where: { id: req.params.id },
  });
  // Respond with a single resource and 2xx code
  res.status(200).json(`/galaxies/${req.params.id}`);
};

// Remove a single resource
const remove = async (req, res) => {
  Galaxy.destroy({ where: { id: req.params.id } });
  // Respond with a 2xx status code and bool
  res.status(204).json(true);
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
