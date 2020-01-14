require('dotenv').config()
const fetch = require('node-fetch')

// Get secret API keys from .env
const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

const requestBody = {
    expression: "folder=Banner",
    max_results: "500"
}

// Get list of pictures in "Banner" subfolder in Cloudinary
// On the free tier of Cloudinary, we are allowed 500 API calls per hour
// Will return a maximum of 500 images
exports.getBannerImages = async () => {
    const bannerImagesResponse = await fetch(
        `https://${apiKey}:${apiSecret}@api.cloudinary.com/v1_1/${cloudName}/resources/search`,
        { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        }
    )

    if (!bannerImagesResponse.ok) {
        throw "Default banner image search failed."
    } else {
        return bannerImagesResponse.json()
    }
}
