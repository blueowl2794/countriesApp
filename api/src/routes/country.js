const { Op } = require('sequelize');//operadores de sequelize
const axios = require('axios');//nos permite hacer peticiones HTTP
const express = require('express');
const router = express.Router();//Utilice la clase express.Router para crear manejadores de rutas montables y modulares. Una instancia Router es un sistema de middleware y direccionamiento completo; por este motivo, a menudo se conoce como una “miniaplicación”.
const { Country, Types } = require('../db'); 

router.get('/',  (req, res, next) => {  
    let name = req.query.name
    let countryPromiseApi
    let countryPromiseDb
    
    try{ 
        if(name) {
            countryPromiseDb = Country.findAll({//promesa
                include: Types,//agrego el contenido a los Type de la tabla
                where: {
                    name: {
                        [Op.iLike]: "%" + name + "%"
                    }
                },
                order: [ 
                    ['name', 'ASC'],
                ],
                attributes: ['id', 'name', 'image', 'continent', 'capital', 'subregion', 'area', 'population'],      
            })
        } else{                                                         
            countryPromiseApi = axios.get('https://restcountries.com/v3.1/all/')
            
            countryPromiseDb = Country.findAll({//promesa
                include: Types,
                order: [ 
                    ['name', 'ASC'],
                ],     
                attributes: ['id', 'name', 'image', 'continent', 'capital', 'subregion', 'area', 'population'],    
            })
        }

        Promise.all([//all: Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
            countryPromiseApi,
            countryPromiseDb
        ])
        .then( (respuesta) => {
            const [countryApi, countryDb] = respuesta //mis respuestas, la de la api y la de la base de datos
            
            countryDb.length === 0 ? 
                countryApi.data.map( async(c) => { 
                        return await Country.create({
                        id: c.fifa? c.fifa : c.name.common.slice(1,4)?c.name.common.slice(1,4):c.name.common.slice(0,3), //("0000" + ((Math.random() * Math.pow(36, 3)) | 0).toString(36)).slice(-3),
                        name: c.name.common?c.name.common:'this field does not exist',
                        image: c.flags.png?c.flags.png: 'this field does not exist',
                        continent: c.region?.toString()?c.region.toString(): c.continents.toString(),
                        capital:c.capital?.toString()?c.capital.toString() : 'this field does not exist',
                        subregion: c.subregion?.toString()?c.subregion.toString() : 'this field does not exist',
                        area: c.area? c.area : 0,
                        population: c.population?c.population: 0,
                        landlocked: c.landlocked,
                        // borders: c.borders,
                        // languages: c.languages,
                    }).catch(err => err)//este si
                }) :countryDb.length&& res.json(countryDb)

            
            let allCountry = [  ...countryDb]//concateno
            
            return res.json(allCountry);
            
        }).catch(err => err)//este si
    }   
    catch(err) {
        next(err) 
    }
})


router.get('/:idPais', async (req, res, next) => {
    const id = req.params.idPais;
    
    if(!id) next({msg: 'no mando id', status: 500})
    
    var country
    
    try{
        if(typeof id === 'string') {
            country = await Country.findByPk(id, {
                include: Types
            }) 
            country = {
                id: country.id,
                name: country.name,
                image: country.image,
                continent: country.continent,
                capital: country.capital,
                subregion: country.subregion,
                area: country.area,
                population: country.population, 
                types: country.types,
            }
        }
        return res.json(country)
        
    } catch(err) {
        next(err)
    }
})

module.exports = router;