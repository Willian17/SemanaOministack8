const { response } = require('express')
const Dev = require('../model/Dev')

module.exports = {
  async store(req, res){
        const { user }  = req.headers
        const { devId } = req.params

        const loggedDev = await Dev.findById({_id: user})
        const targetDev = await Dev.findById({_id: devId})

        console.log(loggedDev)

        if(!targetDev){
            return response.status(400).json({error: 'Dev not exists'})
        }

        loggedDev.deslikes.push(targetDev._id)
        await loggedDev.save()

        return res.json(loggedDev);
    }
}