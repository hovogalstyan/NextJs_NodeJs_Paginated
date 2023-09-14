import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000'
})

export class Api {
    static getPhotos(page, limit) {
        return api.get('/photos_paginated', {
            params: {
                page,
                limit
            }
        })
    }
}