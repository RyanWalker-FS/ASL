const { Star, Planet, Galaxy } = require("../models/index");

// Show all resources
const index = async (req, res) => {
  const stars = await Star.findAll();
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(stars);
  } else {
    // Respond with an array and 2xx status code
    res.status(200).render("star/index.twig", { stars });
  }
};

// Show resource
const show = async (req, res) => {
  const star = await Star.findByPk(req.params.id);
  // Respond with a single object and 2xx code
  res.status(200).render("star/show.twig", { star });
};

// Create a new resource
const create = async (req, res) => {
  const star = await Star.create(req.body);
  //res.status(201).render("star/index.twig");
  // Issue a redirect with a success 2xx code
  res.redirect(302, `/stars/${star.id}`);
};

// Update an existing resource
const update = async (req, res) => {
  await Star.update(req.body, {
    where: { id: req.params.id },
  });
  // Respond with a single resource and 2xx code
  res.redirect(302, `/stars/${req.params.id}`);
};

// Remove a single resource
const remove = async (req, res) => {
  await Star.destroy({ where: { id: req.params.id } });
  // Respond with a 2xx status code and bool
  res.redirect(302, `/stars`);
};

const form = async (req, res) => {
  const { id } = req.params;
  if (typeof id !== "undefined") {
    const star = await Star.findByPk(req.params.id);
    return res.render(`star/_form.twig`, { star });
  } else {
    res.render(`star/_form.twig`);
  }
  //res.status(200).json(`star#from(:id)`);
};
// Export all controller actions
module.exports = { index, show, create, update, remove, form };
