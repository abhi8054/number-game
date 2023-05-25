const express = require("express");
const {
    insert_and_update_numbers,
    get_numbers,
}  = require("../controllers/numbers")

const numberRoutes = express.Router()

numberRoutes.post('/insert_and_update_numbers',insert_and_update_numbers);
numberRoutes.get('/get_numbers',get_numbers);

module.exports = numberRoutes


