const axios = require("axios")
const { API_KEY } = process.env
const URL = `https://api.thedogapi.com/v1/breeds?api_key=`
const { Dog, Temperament } = require("../db")
const { Sequelize } = require("sequelize")
const Op = Sequelize.Op

const getNameController = async (name) => {

    const responseApi = await axios.get(`${URL}${API_KEY}`)
    const apiData = await responseApi.data.map(data => {
        return {
        id: data.id,
        name: data.name,
        image: data.image.url,
        breed_group: data.breed_group,
        temperament: data.temperament ? data.temperament : "Your best friend",
        weightMin: parseInt(data.weight.metric.slice(0, 2).trim()) ? parseInt(data.weight.metric.slice(0, 2).trim()) : 5,
        weightMax: parseInt(data.weight.metric.slice(4).trim()) ? parseInt(data.weight.metric.slice(4).trim()) : 15,
        heightMin: parseInt(data.height.metric.slice(0, 2).trim()),
        heightMax: parseInt(data.height.metric.slice(4).trim()) ? parseInt(data.height.metric.slice(4).trim()) : parseInt(data.height.metric.slice(0, 2).trim())+2,
        life_span: data.life_span,
        createdInBd: false,
        }
    })

    if (name){
    const nameLower = name.toLowerCase()

    const filteredDogsApi = await apiData.filter(dog => dog.name.toLowerCase().includes(nameLower))
    const dataDB = await Dog.findAll({
        include: Temperament,
        where: {name: { [Op.iLike]: `%${nameLower}%` } }, 
        }
    ) 

    const dbResponse = await dataDB.map(dog => {
        let temp = dog.Temperaments.map(te => te.name)
        let aux = temp.join(", ")

        return {
            id: dog.id,
            name: dog.name,
            image: dog.image,
            temperament: aux,
            weightMin: parseInt(dog.weightMin),
            weightMax: parseInt(dog.weightMax),
            heightMin: parseInt(dog.heightMin),
            heightMax: parseInt(dog.heightMax),
            life_span: dog.life_span
        }
    })


    
    const filteredDogsDb = await dataDB.filter((dog) => dog.name.toLowerCase().includes(nameLower))

    if(filteredDogsDb.length === 0 && filteredDogsApi.length === 0){
        throw Error("No se encuentra la raza de perro solicitada.")}


    const totalInfo = filteredDogsApi.concat(dbResponse)

    return totalInfo

    

    } else {
        const dataDB = await Dog.findAll({
            include: Temperament,
        }) 
    
        const info = await dataDB.map(dog => {
            let temp = dog.Temperaments.map(te => te.name)
            let aux = temp.join(", ")
    
            return {
                id: dog.id,
                name: dog.name,
                image: dog.image,
                temperament: aux,
                weightMin: parseInt(dog.weightMin),
                weightMax: parseInt(dog.weightMax),
                heightMin: parseInt(dog.heightMin),
                heightMax: parseInt(dog.heightMax),
                life_span: dog.life_span,
                createdInBd: true,
            }
    
        })
    
    
        return [...apiData,...info]
    }

    

}

module.exports = { getNameController }
