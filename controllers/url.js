const shortId = require('shortid')
const URL = require('../models/url')


async function generateShortid(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({msg:" enter url"})
const shortID = shortId.generate()
 await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory:[],
 })

 return res.json({id: shortID})
}

module.exports = {generateShortid}