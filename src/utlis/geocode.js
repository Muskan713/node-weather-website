const request = require('request')




const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibXVza2FuMDEiLCJhIjoiY2tseHhpNTNtMWI3ZjJ2bjZieHpsbmtuZiJ9.FFLTkiieIo0-vVOrLRtLzg&limit=1'
 
    request({url, json: true},(error,{body}) => {
      if(error){
        callback('Unable to connect to network',undefined)
      }else if(!body.features[0])
      {
        callback('Unable to find location. Try entering another location')
      }else{
        callback(undefined,{
          location: body.features[0].place_name,
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0]
        })
      }
    })
 
 
 }
 

 module.exports = geocode