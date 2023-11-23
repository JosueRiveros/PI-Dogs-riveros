const { Router } = require("express")

const { getDogsHandler, getBreedHandler, postDogsHandler } = require("../handlers/dogsHandler")


const dogsRouters = Router()

dogsRouters.get("/", getDogsHandler)
dogsRouters.get("/:id", getBreedHandler)
dogsRouters.post("/", postDogsHandler)

module.exports = dogsRouters