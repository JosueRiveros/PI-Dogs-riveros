const { getTempController } = require("../controllers/getTempController")

const getTempHandler = async(req, res) => {
    try{
    const allTemps = await getTempController()
    res.status(200).json(allTemps)
    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

module.exports = { getTempHandler }