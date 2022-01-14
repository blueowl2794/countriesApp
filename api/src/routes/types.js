const { Router } = require('express');
const { Country, Types } = require('../db')
const router = Router();

router.get('/' ,async(req, res, next) => {
    try { 
        const type = await Types.findAll({attributes: ['id', 'name', 'difficulty', 'duration' , 'season']}).catch((err) => console.log(' no hay:', err))
        const countries = await Country.findAll().catch((err) => console.log(' no hay:', err))
        // if (type){
        //     return res.json(type)
        // }
        if (type.length === 0) {
            await Types.create({name: "dia de playa", difficulty: 3, duration: "3", season: "Verano"})
        }
        if(type.length === 1 && type[0].name === "dia de playa"){
            var aja = type.map((a) => a.id)[0]
            
            countries.map(async(c)=>{
                const eso = c
                c.landlocked === false && c.continent !== 'Antarctic' && !c.types? await eso.addTypes(aja)  : "no hay Mar"
            })

        }
        return res.json(type)
    }catch(err){
        next(err)
    }
})


router.post('/', async (req, res) => {
    const {name, difficulty, duration, season, types} = req.body;
    
    try {  
        const createdType = await Types.create({name: name, difficulty: difficulty, duration: duration, season: season.join(' ')})
        var aja = createdType.id
        types.map(async (a) => {var b = await Country.findByPk(a); await b.addTypes(aja) })
        res.json(createdType)
    } catch (err) {console.log(err)} 
})

module.exports = router;