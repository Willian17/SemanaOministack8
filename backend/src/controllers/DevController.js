const axios = require('axios')
const Dev = require('../model/Dev')

module.exports = {

    async index(req, res){
        const { user } = req.headers

        const loggedDev = await Dev.findById(user)

        const users = await Dev.find({
            $and: [
                {_id: { $ne: user }},
                {_id: { $nin: loggedDev.likes }},
                {_id: { $nin: loggedDev.deslikes }},
            ]
        })

        res.json(users)
    },

    async store(req, res){
        const { username } = req.body

        const userExists = await Dev.findOne({user: username})

        if(userExists){
            return res.json(userExists)
        }

        const response = await axios.get(`https://api.github.com/users/${username}`)

        const { avatar_url: avatar, name, bio  } = response.data

       const dev = await Dev.create({
            name,
            avatar,
            user: username,
            bio
        })

        return res.json(dev)
    }
}