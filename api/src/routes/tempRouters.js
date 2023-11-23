const { Router } = require("express")

const { getTempHandler } = require("../handlers/tempHandlers")


const tempRouters = Router()

tempRouters.get("/", getTempHandler)

module.exports = tempRouters