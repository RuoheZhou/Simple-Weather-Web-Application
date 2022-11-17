
const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true})); //bodyPaser让你能够接收到通过html输入的信息

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){ //req,res 用在app.get里; 在https里用response用于区分； 不然网页会出错
  const location = req.body.city_name;

  console.log(location);
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=f4a4c485009955353abe94a1961bada0";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const icon_url =  "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      // console.log(temperature);
      console.log(weatherData);
      console.log(icon);
      res.write("<h1>The temperature is: </h1>" + "<h3>" + temperature + "</h3>");
      res.write("<h1>The location is: </h1>" + "<h3>" + weatherData.name + "</h3>");
      res.write("<image src =" + icon_url + ">");
      res.send();
    })
  })
})
app.listen(3000, function(){
  console.log("server start on port 3000");
});
