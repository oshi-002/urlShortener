
const express = require('express')
const { connectToMongodb } = require('./connect')
const urlRoute = require('./routes/url')
const URL = require('./models/url')
const path = require('path')

const app = express()
app.use(express.json())

const port = 8000;


app.set('view engine' , 'ejs')
app.set('views' , path.resolve('./views'))


app.get('/test' ,async (req, res)=>{
    const allUrls  = await URL.find({})
    // return res.end("<h1>Hey from Server</h1>")
    return res.end(`
        <html>
        <head>
        <body>
        <ol>
        ${allUrls.map(url => `<li>${url.shortId}-${url.redirectURL}- ${url.visitHistory.length}</li>`).join('')}
        </ol>
    
        </body>
        </head>
        </html>
        `)
    })

    app.use('/url', urlRoute)



app.get('/url/:shortId', async (req, res) => {
    // for redirection : we need to fetch from database , increment and redirect 
    //  id provided by the user 
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        // to find we give shortid
        shortId
    }, {
        // what to update
        $push: {
            visitHistory: {timestamp: Date.now()}
        },
    })
    res.redirect(entry.redirectURL)
    // redirect to url
    
});




connectToMongodb('mongodb://localhost:27017/urlShortener')
    .then(() => console.log("mongodb connected")
    )



app.listen(port, () => console.log("Server started")
)
