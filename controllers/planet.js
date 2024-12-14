const { Planet, Star } = require("../models/index");

// Show all resources
const index = async (req, res) => {
  const planets = await Planet.findAll({ include: [Star] });
  // Respond with an array and 2xx status code
  res.status(200).json(planets);
};

// Show resource
const show = async (req, res) => {
  const planet = await Planet.findByPk(req.params.id, { include: [Star] });
  // Respond with a single object and 2xx code
  res.status(200).json(planet);
};

// Create a new resource
const create = async (req, res) => {
  const planet = await Planet.create(req.body);

  res.status(201).json(planet);
  // Issue a redirect with a success 2xx code
  //res.redirect(`/planets`, 201)
};

// Update an existing resource
const update = async (req, res) => {
  const planet = await Planet.update(req.body, {
    where: { id: req.params.id },
  });
  // Respond with a single resource and 2xx code
  res.status(200).json(planet);
};

// Remove a single resource
const remove = async (req, res) => {
  Planet.destroy({ where: { id: req.params.id } });
  // Respond with a 2xx status code and bool
  res.status(204).json(true);
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
