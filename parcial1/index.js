const fs = require("fs");
var http = require('http');
const axios = require("axios");

const url_data = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

/**function write_list(lista, id, nombre_comp, nombre_cont) {
    let rta = ``;
    for (let item of lista) {
        rta += `<tr>
            <th scope="row">`+ item[id] + `</th>
            <td>`+ item[nombre_comp] + `</td>
            <td>`+ item[nombre_cont] + `</td>
        </tr>
        `;
    }
    return rta;
}*/

function productos_asociados(url,res,categoria){
    axios.get(url).then(
        function response(response) {
            fs.readFile("index.html", 
            function (err, data) {
                data_html = `<h1>`+categoria+`</h1>\n`;
                for (let item of response.data){
                    if(item['name'] === categoria){
                        let productos = item['products'];
                        for(let product of productos){
                            console.log(product['image']);
                            data_html += `<div class="card" style="width: 18rem;">
                            <img class="card-img-top" src="`+product['image']+`" alt="Card image cap">
                            <div class="card-body">
                              <h5 class="card-title">`+product['name']+`</h5>
                              <p class="card-text">`+product['description']+`</p>
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

function write_table(tipo,res, url, id, nombre_comp, nombre_cont) {
    axios.get(url).then(
        function response(response) {
            fs.readFile("index.html", 
            function (err, data) {
                /**
                let tabla = `<h1>`+tipo+`</h1>
                <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Contact</th>
                    </tr>
                </thead>
                <tbody>`+ write_list(response.data, id, nombre_comp, nombre_cont) +
                `</tbody>
                </table>`;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(tabla);*/
                return res.end(data);
            });
        }).catch(function (error) {
            console.log(error);
        }
    );
}

http.createServer(function (req, res) {
    if (req.url === '/Burguers' || req.url === '/DrinksandSides' || req.url === '/Tacos' || req.url === '/Salads' || req.url === '/Desserts') {
        if(req.url === '/DrinksandSides'){
            productos_asociados(url_data,res,'Drinks and Sides');
        }
        else{
            productos_asociados(url_data,res,req.url.substring(1));
        }
    }
    write_table("Suppliers",res, url_data, "idproveedor", "nombrecompania", "nombrecontacto");
}).listen(8081);