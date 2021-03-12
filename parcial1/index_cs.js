function agregar_al_carrito(){
    let car = document.getElementById("car");
    let car_content= Number(car.innerHTML);
    console.log(car_content);
    car.innerHTML = car_content +1;
    console.log(car.innerHTML);
}