const fs = require("fs");
var http = require('http');
const axios = require("axios");

const url_data = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";


function productos_asociados(url, res, categoria) {
    axios.get(url).then(
        function response(response) {
            fs.readFile("index.html",
                function (err, data) {
                    data_html = `<h1>` + categoria + `</h1>\n`;
                    for (let item of response.data) {
                        if (item['name'] === categoria) {
                            let productos = item['products'];
                            for (let product of productos) {
                                console.log(product['image']);
                                data_html += `<div class="card" style="width: 18rem;">
                            <img class="card-img-top" src="`+ product['image'] + `" alt="Card image cap">
                            <div class="card-body">
                              <h5 class="card-title">`+ product['name'] + `</h5>
                              <p class="card-text">`+ product['description'] + `</p>
                              <a href="#" class="btn btn-primary">Add to car</a>
                            </div>
                          </div>\n`;
                            }
                        }
                    }
                    var result = data.toString().replace('{{placeholder}}', data_html);
                    return res.end(result);
                }
            );
        });
}


http.createServer(function (req, res) {
    if (req.url === '/Burguers' || req.url === '/DrinksandSides' || req.url === '/Tacos' || req.url === '/Salads' || req.url === '/Desserts') {
        if (req.url === '/DrinksandSides') {
            productos_asociados(url_data, res, 'Drinks and Sides');
        }
        else {
            productos_asociados(url_data, res, req.url.substring(1));
        }
    }
    else{
    fs.readFile("index.html",
        function (err, data) {
            return res.end(data);
        });
    }
}).listen(8081);