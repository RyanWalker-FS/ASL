const { Image } = require("../models");

const index = async (req, res) => {
	const images = await Image.findAll();
	res.status(200).render("images/index.twig", { images });
};

const create = async (req, res, next) => {
	const image = await Image.create(req.body);
	// Sets a pretext "imageId" for our upload middleware
	req.imageId = image.id;
	// Invoke our upload middleware with next()
	next();
	res.redirect("/images/" + image.id);
};

const update = async (req, res, next) => {
	const image = await Image.update(req.body, {
		where: { id: req.params.id },
	});
	// Sets a pretext "imageId" for our upload middleware
	req.imageId = image.id;
	// Invoke our upload middleware with next()
	next();
	res.redirect("/images/" + req.params.id);
};

const form = async (req, res) => {
	const { id } = req.params;
	if (typeof id !== "undefined") {
		const image = await Image.findByPk(req.params.id);
		return res.status(200).render(`images/_form.twig`, { image });
	}
	res.status(200).render("images/_form.twig");
};

const show = async (req, res) => {
	const image = await Image.findByPk(req.params.id);
	res.status(200).render("images/show.twig", { image });
};

const remove = async (req, res) => {
	Image.destroy({ where: { id: req.params.id } });
	res.status(302).redirect("/images");
};

module.exports = { index, show, create, update, remove, form };
