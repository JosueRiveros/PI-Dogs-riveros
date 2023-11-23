const axios = require("axios")
const { API_KEY } = process.env
const URL = `https://api.thedogapi.com/v1/breeds?api_key=`
const { Temperament } = require("../db")

const getTempController = async () => {

    if (Temperament.length === 0){
        const responseApi = (await axios.get(`${URL}${API_KEY}`)).data
        const temps = await responseApi.map(data => data.temperament)
        const spliceTemps = await temps.map(data => data?.split(", "))

        const TempListo = [...new Set(spliceTemps.flat())]

        TempListo.forEach(temp => {
            if(temp) {
                Temperament.findOrCreate({
                    where: {name:temp}
                })
            }
        })

    }

    const dbTemps = Temperament.findAll()    

    return dbTemps
    }
module.exports = { getTempController }