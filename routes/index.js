var express = require('express');
var router = express.Router();
const item_controller = require("../controllers/itemController");

/* GET home page. */
router.get("/", item_controller.index);

router.get("/create", item_controller.item_create_get);

router.post("/create", item_controller.item_create_post);

router.get("/:id/update", item_controller.item_update_get);

router.post("/:id/update", item_controller.item_update_post);

module.exports = router;
