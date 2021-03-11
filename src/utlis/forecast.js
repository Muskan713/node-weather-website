const request = require('request')


const forecast = (latitude,longitude,callback) => {
    
    const url = 'https://api.weatherbit.io/v2.0/current?lat='+ latitude + '&lon=' + longitude + '&key=b0563688b81f43b1827c1a000a9572ce&include=minutely&units=M'
  
    request({url, json: true},(error,{body}) => {
      if(error){
        callback('Unable to connect to Weather API',undefined)
      }else if(body.error)
      {
        callback('Unable to find the location',undefined)
      }else{
        callback(undefined,body.data[0].weather.description +' It is currently ' + body.data[0].temp + ' degrees out. There is a ' + body.data[0].precip + ' % chance of rain. The air quality index is ' + body.data[0].aqi)
      }
    })

}

module.exports = forecast