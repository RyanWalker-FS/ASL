const express = require("express");
const router = express.Router();
const Galaxy = require("../models/Galaxy");

// Show all resources
const index = async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll();
    res.status(200).json(galaxies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching galaxies" });
  }
};

// Show resource
const show = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (!galaxy) {
      res.status(404).json({ message: "Galaxy not found" });
    } else {
      res.status(200).json(galaxy);
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching galaxy" });
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    const galaxy = await Galaxy.create(req.body);
    res.redirect(`/galaxies/${galaxy.id}`, 201);
  } catch (err) {
    res.status(500).json({ message: "Error creating galaxy" });
  }
};

// Update an existing resource
const update = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (!galaxy) {
      res.status(404).json({ message: "Galaxy not found" });
    } else {
      await galaxy.update(req.body);
      res.status(200).json(galaxy);
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating galaxy" });
  }
};

// Remove a single resource
const remove = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (!galaxy) {
      res.status(404).json({ message: "Galaxy not found" });
    } else {
      await galaxy.destroy();
      res.status(204).json(true);
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting galaxy" });
  }
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
