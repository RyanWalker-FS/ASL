// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const planetCtlr = require(`../controllers/planet.js`)

// Create a new Router instance and call it "router"
const router = new express.Router()

// RESTful resource mappings
router.get(`/`, planetCtlr.index)
router.get(`/new`, planetCtlr.form)
router.post(`/`, planetCtlr.create)
router.get(`/:id`, planetCtlr.show)
router.get(`/:id/edit`, planetCtlr.form)
router.put(`/:id`, planetCtlr.update)
router.delete(`/:id`, planetCtlr.remove)
router.get(`/:id/delete`, planetCtlr.remove)
// export "router"
module.exports = router
