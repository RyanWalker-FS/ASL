const express = require("express");
const router = express.Router();
const Planet = require("../models/Planet");

// Show all resources
const index = async (req, res) => {
  try {
    const planets = await Planet.findAll();
    res.status(200).json(planets);
  } catch (err) {
    res.status(500).json({ message: "Error fetching planets" });
  }
};

// Show resource
const show = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (!planet) {
      res.status(404).json({ message: "Planet not found" });
    } else {
      res.status(200).json(planet);
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching planet" });
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    const planet = await Planet.create(req.body);
    res.redirect(`/planets/${planet.id}`, 201);
  } catch (err) {
    res.status(500).json({ message: "Error creating planet" });
  }
};

// Update an existing resource
const update = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (!planet) {
      res.status(404).json({ message: "Planet not found" });
    } else {
      await planet.update(req.body);
      res.status(200).json(planet);
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating planet" });
  }
};

// Remove a single resource
const remove = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (!planet) {
      res.status(404).json({ message: "Planet not found" });
    } else {
      await planet.destroy();
      res.status(204).json(true);
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting planet" });
  }
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
