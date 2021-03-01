const fs = require("fs");
var http = require('http');
const axios = require("axios");

const url_proveedores = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const url_clientes = "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";


function write_list(lista, id, nombre_comp, nombre_cont) {
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
}

function write_table(tipo,res, url, id, nombre_comp, nombre_cont) {
    axios.get(url).then(
        function response(response) {
            fs.readFile("index.html", 
            function (err, data) {
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
                res.write(tabla);
                return res.end(data);
            });
        }).catch(function (error) {
            console.log(error);
        }
    );
}

http.createServer(function (req, res) {
    if (req.url == '/api/clientes') {
        write_table("Clients",res, url_clientes, "idCliente", "NombreCompania", "NombreContacto");
    }
    else if (req.url == '/api/proveedores') {
        write_table("Suppliers",res, url_proveedores, "idproveedor", "nombrecompania", "nombrecontacto");
    }
}).listen(8081);