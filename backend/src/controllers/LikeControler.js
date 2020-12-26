const { response } = require('express')
const Dev = require('../model/Dev')

module.exports = {
  async store(req, res){
        const { user }  = req.headers
        const { devId } = req.params

        const loggedDev = await Dev.findById({_id: user})
        const targetDev = await Dev.findById({_id: devId})

        if(!targetDev){
            return response.status(400).json({error: 'Dev not exists'})
        }

        if(targetDev.likes.includes(loggedDev._id)){
            console.log('DEU MATCH')
        }
        loggedDev.likes.push(targetDev._id)
        await loggedDev.save()

        return res.json(loggedDev);
    }
}