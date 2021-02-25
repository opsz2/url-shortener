const express = require("express");
const { validate } = require("../middlewares");
const { shortenUrl } = require("../validations");
const { generateShortUrlController, routeShortUrlController } = require("../controllers");

const router = express.Router();

/**
 * GET status
 */
router.get("/status", (req, res) => res.send("URL shortener API is healthy"));

router.route("/").post(validate(shortenUrl), generateShortUrlController);

router.route("/:urlCode").get(routeShortUrlController);

module.exports = router;
