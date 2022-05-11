const { Router } = require("express");
const router = Router();
const cloudinary = require("cloudinary").v2;
const fs = require("fs-extra");
const { newPhoto, getPhotos, deletePhoto } = require("../models/photo");

require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get("/", async(req, res) => {
    const photos = await getPhotos();
    res.render("image", {photos});
})

router.get("/images/add", async(req, res) => {
    const photos = await getPhotos();
    res.render("image_form", {photos});
})

router.post("/images/add", async(req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);
    const photo = {
        title: req.body.title,
        description: req.body.description,
        imageURL: result.url,
        public_id: result.public_id
    }
    await newPhoto(photo)
    await fs.unlink(req.file.path);
    res.redirect("/images/add");
})

router.get("/images/add/:public_id", async(req, res) => {
    await deletePhoto(req.params.public_id);
    await cloudinary.uploader.destroy(req.params.public_id);
    res.redirect("/images/add")
})

module.exports = router;