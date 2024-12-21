const { Galaxy, Star } = require("../models/index");

// Show all resources
const index = async (req, res) => {
  const galaxies = await Galaxy.findAll({ include: [Star] });
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(galaxies);
  } else {
    // Respond with an array and 2xx status code
    res.status(200).render("galaxy/index.twig", { galaxies });
  }
};

// Show resource
const show = async (req, res) => {
  const galaxy = await Galaxy.findByPk(req.params.id);
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(galaxy);
  } else {
    // Respond with a single object and 2xx code
    res.status(200).render("galaxy/show.twig", { galaxy });
  }
};

// Create a new resource
const create = async (req, res) => {
  const galaxy = await Galaxy.create(req.body);
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(galaxy);
  } else {
    //res.status(201).render("planet/index.twig");
    // Issue a redirect with a success 2xx code
    res.redirect(302, `/galaxies/${galaxy.id}`);
  }
};

// Update an existing resource
const update = async (req, res) => {
  await Galaxy.update(req.body, {
    where: { id: req.params.id },
  });
  // Respond with a single resource and 2xx code
  res.redirect(302, `/galaxies/${req.params.id}`);
};

// Remove a single resource
const remove = async (req, res) => {
  await Galaxy.destroy({ where: { id: req.params.id } });
  // Respond with a 2xx status code and bool
  res.redirect(302, `/galaxies`);
};

const form = async (req, res) => {
  const { id } = req.params;
  if (typeof id !== "undefined") {
    const galaxy = await Galaxy.findByPk(req.params.id);
    return res.render(`galaxy/_form.twig`, { galaxy });
  } else {
    res.render(`galaxy/_form.twig`);
  }
};
// Export all controller actions
module.exports = { index, show, create, update, remove, form };
