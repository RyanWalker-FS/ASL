const express = require("express");
const router = express.Router();
const Star = require("../models/Star");

// Show all resources
const index = async (req, res) => {
  try {
    const stars = await Star.findAll();
    res.status(200).json(stars);
  } catch (err) {
    res.status(500).json({ message: "Error fetching stars" });
  }
};

// Show resource
const show = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (!star) {
      res.status(404).json({ message: "Star not found" });
    } else {
      res.status(200).json(star);
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching star" });
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    const star = await Star.create(req.body);
    res.redirect(`/stars/${star.id}`, 201);
  } catch (err) {
    res.status(500).json({ message: "Error creating star" });
  }
};

// Update an existing resource
const update = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (!star) {
      res.status(404).json({ message: "Star not found" });
    } else {
      await star.update(req.body);
      res.status(200).json(star);
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating star" });
  }
};

// Remove a single resource
const remove = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (!star) {
      res.status(404).json({ message: "Star not found" });
    } else {
      await star.destroy();
      res.status(204).json(true);
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting star" });
  }
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
