const { Planet, Star } = require("../models/index");

// Show all resources
const index = async (req, res) => {
  const planets = await Planet.findAll({ include: [Star] });
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(planets);
  } else {
    // Respond with an array and 2xx status code
    res.status(200).render("planet/index.twig", { planets });
  }
};

// Show resource
const show = async (req, res) => {
  const planet = await Planet.findByPk(req.params.id);
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(planet);
  } else {
    // Respond with a single object and 2xx code
    res.status(200).render("planet/show.twig", { planet });
  }
};

// Create a new resource
const create = async (req, res) => {
  const planet = await Planet.create(req.body);
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(planet);
  } else {
    //res.status(201).render("planet/index.twig");
    // Issue a redirect with a success 2xx code
    res.redirect(302, `/planets/${planet.id}`);
  }
};

// Update an existing resource
const update = async (req, res) => {
  await Planet.update(req.body, {
    where: { id: req.params.id },
  });
  // Respond with a single resource and 2xx code
  res.redirect(302, `/planets/${req.params.id}`);
};

// Remove a single resource
const remove = async (req, res) => {
  await Planet.destroy({ where: { id: req.params.id } });
  // Respond with a 2xx status code and bool
  res.redirect(302, `/planets`);
};

const form = async (req, res) => {
  const { id } = req.params;
  if (typeof id !== "undefined") {
    const planet = await Planet.findByPk(req.params.id);
    return res.render(`planet/_form.twig`, { planet });
  } else {
    res.render(`planet/_form.twig`);
  }
  //res.status(200).json(`planet#from(:id)`);
};
// Export all controller actions
module.exports = { index, show, create, update, remove, form };
