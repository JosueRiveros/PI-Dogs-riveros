const axios = require("axios")
const URL = `https://api.thedogapi.com/v1/breeds?api_key=`
const { Dog, Temperament, dog_temperament } = require("../db")
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const IMAGE_URL = `https://cdn2.thedogapi.com`

const getBreedController = async(id) => {

    if (!Number.isNaN(Number(id))) {

    const responseApi = await axios.get(`${URL}`)

    const response = responseApi.data.filter((dog) => dog.id === +id);

    let archiv = ".jpg"

    if(response[0].id == 15 || response[0].id == 125 || response[0].id == 212){
      archiv = ".png"
    }
    
    const dog = {
        id: response[0].id,
        name: response[0].name,
        image: (`${IMAGE_URL}/images/${response[0].reference_image_id}${archiv}`),
        breed_group: response[0].breed_group,
        temperament: response[0].temperament ? response[0].temperament : "Your best friend",
        weightMin: parseInt(response[0].weight.metric.slice(0, 2).trim()) ? parseInt(response[0].weight.metric.slice(0, 2).trim()) : 5,
        weightMax: parseInt(response[0].weight.metric.slice(4).trim()) ? parseInt(response[0].weight.metric.slice(4).trim()) : 15,
        heightMin: parseInt(response[0].height.metric.slice(0, 2).trim()),
        heightMax: parseInt(response[0].height.metric.slice(4).trim()) ? parseInt(response[0].height.metric.slice(4).trim()) : parseInt(response[0].height.metric.slice(4).trim())+2,
        life_span: response[0].life_span

      };
      return dog

    } else {

        const dogDB = await Dog.findOne({
            where: { id: id },
          });
          if (dogDB) {
            const dogTemp = await dog_temperament.findAll({
              where: { DogId: dogDB.id },
            });
            const tempIds = dogTemp.map((temp) => temp.TemperamentId);
            const tempDB = await Temperament.findAll({
              where: { id: { [Op.in]: tempIds } },
            });

            const tempString = tempDB.map((temp) => temp.name);
      
            const dogWithTempName = {
              ...dogDB.toJSON(),
              tempNames: tempString.join(", "),
            };

            return dogWithTempName;
        }
    }
}


module.exports = { getBreedController }