const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utlis/geocode')
const forecast = require('./utlis/forecast')
const { title } = require('process')

const app = express()


// Define Paths for express config
const PathToDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Set up handlars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directoy to use
app.use(express.static(PathToDirectory))

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        name:'Muskan'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        name: 'Muskan',
        title: 'About Me'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'HELP PAGE',
        name:'Muskan'
    })
})


app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error:'You must  provide an address'
        })
    }
    geocode(req.query.address,(error,{location,latitude,longitude} = {}) => {
        if(error)
        {
          return res.send({
              error
          })
        }
        forecast(latitude,longitude, (error,data)=> {
          if(error){
            return res.send({
                error
            })
            }
            res.send({
                location,
                forecast:data,
                address:req.query.address
            })
        })
    }) 
})

app.get('/products',(req,res) => {
    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})






app.get('/help/*', (req,res) =>
{
    res.render('error',{
        title:404,
        error: 'Help Article Not Found'
    })
})

app.get('*', (req,res) => {
    res.render('error',{
        title:404,
        error: 'Page Not Found'
    })
})


app.listen(3000,() => {
    console.log('Server is up on port 3000')
})