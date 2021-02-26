const axios = require("axios");

const url_proveedores = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";

axios.get(url_proveedores).then(
    function response(response) {
        console.log(response);
    }
).catch(function error(){
    console.log(error);
});
