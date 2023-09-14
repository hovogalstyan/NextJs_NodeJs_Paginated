import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import * as fs from "fs/promises";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))
dotenv.config()
app.use(cors({
    origin: 'http://localhost:3000'
}))
const readFilePhotos = async (req, res, next) => {
    const photos = await fs.readFile('./Data/Photos.json', "utf8",)
        .then((data) => {
            return data
        }).catch((err) => {
            return err
        })
    if (photos) {
        req.Photos = JSON.parse(photos)
    }
    next()
}
app.get("/photos_paginated", readFilePhotos, async (req, res) => {
    const photosData = req.Photos
    const {page, limit} = req.query;
    const total_Page = Math.ceil(photosData.length / limit)
    const startIndex = (page - 1) * limit
    const endIndex = limit * page
    const sliceData = photosData.slice(startIndex, endIndex)
    const resultObj = {
        total_photos: photosData.length,
        total_Page,
        limit,
        page,
        results: sliceData
    }
    res.send(resultObj)
})


app.listen(process.env.PORT, () => {
    console.log(`Server start PORT=${process.env.PORT}`)
})
