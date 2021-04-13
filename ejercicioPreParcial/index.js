/**const fs = require("fs");
var http = require('http');


http.createServer(function (req, res) {
    fs.readFile("data.json",(err,data)=>{
        let people = JSON.parse(data);
        let tabla = ``;
        for(let person of people){
            tabla +=`<tr>
            <td>`+person['first_name']+`</td>
            <td>`+person['last_name']+`</td>
            <td>`+person['email']+`</td>
            <td><img src=`+person['photo']+`></td>
            </tr>\n`;
        }
        fs.readFile("index.html",(err,front)=>{
            var result = front.toString().replace('{{placeholder}}', tabla);
            res.end(result);
        });
    });
}).listen(8080);*/