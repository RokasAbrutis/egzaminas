const express = require('express');
const router = express.Router();

const controller = require("../controllers/eventController")


router.post("/create_event", controller.create)
router.post("/user_events", controller.user_events)
router.post("/edit_event", controller.edit)
router.post("/event_delete", controller.delete)
router.get("/all_events", controller.all)
router.post("/admin/edit_event", controller.adminEdit)
router.post("/vote", controller.vote)
router.post("/votes", controller.getVotes)



module.exports = router;