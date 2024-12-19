const express= require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const { isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");

router.route("/")
.get(wrapAsync (listingController.index)) //Index Route
.post(isLoggedIn, upload.single('listing[image]'), validateListing,  wrapAsync (listingController.createListing)); //Create New Listing Route

//New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync (listingController.showListing))   //Read: Show Route
.put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync (listingController.updateListing))  //Update Route
.delete(isLoggedIn, isOwner, wrapAsync (listingController.destroyListing))   //Delete Route

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync (listingController.renderEditForm));

module.exports = router;