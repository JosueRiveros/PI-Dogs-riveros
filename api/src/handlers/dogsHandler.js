const { getBreedController } = require("../controllers/getBreedController")
const { postDogsController } = require("../controllers/postDogsController")
const { getNameController } = require("../controllers/getNameController")



const getDogsHandler = async (req, res) => {
    try {
        const {name} = req.query

        if(name) {
        const filterDogs = await getNameController(name)
        res.status(200).json(filterDogs)
        } else {
        const allDogs = await getNameController()
        res.status(200).json(allDogs)
        }
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

const getBreedHandler = async (req, res) => {
    try {
        const { id } = req.params
        if (id) {
        const filterDogsId = await getBreedController(id)
        res.status(200).json(filterDogsId)
        }
    } catch(error){
        res.status(400).json( { error: error.message })
    }
}

const postDogsHandler = async (req, res) => {
    
    try{
    const { name, image, weightMin, weightMax, heightMin, heightMax, life_span, temperament } = req.body
    if(!name || !weightMin || !weightMax || !heightMin || !heightMax || !life_span || !temperament){
    res.status(400).json ({ message : "Faltan datos" })
    } else {
    const createDog = postDogsController(name, image, weightMin, weightMax, heightMin, heightMax, life_span, temperament)
    res.status(200).json( { message : "Perro creado" })
    }
    } catch(error){
        res.status(400).json( { error: error.message })
    }
}


// router.delete('/deleted/:id', async (req, res, next) => {
//     const {id} = req.params;
//     try {
//         const dog = await Dog.findByPk(id);
//         if(!dog){
//             res.status(404).send("No esta disponible");
//         } else {
//             await dog.destroy();
//             res.status(200).send("Perro eliminado");
//         }
//     } catch (error) {
//         next(error);
//     }
// })

module.exports = {
    getDogsHandler,
    getBreedHandler,
    postDogsHandler,
    
}