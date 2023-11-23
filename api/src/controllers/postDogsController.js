const axios = require("axios")
const { Dog, Temperament } = require("../db")
const { Sequelize } = require("sequelize")
const Op = Sequelize.Op

const postDogsController = async(name, image, weightMin, weightMax, heightMin, heightMax, life_span, temperament) => {

if(!image){
    image = await (await axios.get('https://dog.ceo/api/breeds/image/random')).data.message
}
const newDog = await Dog.create({
        name: name,
        image: image,
        heightMin : heightMin,
        heightMax : heightMax,
        weightMin : weightMin,
        weightMax : weightMax,
        life_span : life_span,
})

    const tempNames = temperament.split(", ");
    const giveTemp = tempNames.map(async temp => { 
        
        const findTemp = await Temperament.findAll({
        where:{ name: { [Op.iLike]: temp }}
    }
    
    ) 
    newDog.addTemperaments(findTemp)
}
)
 return newDog
}

module.exports = { postDogsController }