//Array with the car products
const car = new Array();
//Array with the categories and its products
let categories;

//Reads the data from the .json
fetch(
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json",
)
  .then((response) => response.json())
  .then((data) => {
    setCategories(data);
  });

//Updates the html nav with the categories
function setCategories(data) {
  //Updates the array
  categories = data;
  let optionList = document.getElementById("option-list");
  for (let cat of categories) {
    optionList.innerHTML +=
      `<li class="nav-item cat-list"><a class="nav-link" onclick="updateProducts('` +
      cat.name +
      `')">` +
      cat.name +
      `</a></li>\n`;
  }
}

//Updates the product list inside the HTML given the category they belong to
function updateProducts(category) {
  //cleans all content
  cleanAll();

  let productsContainer = document.getElementById("productsContainer");

  //Updates the category title
  let title = document.getElementById("cat-title");
  title.innerHTML = category;

  const products = categories.find((element) => element.name === category)
    .products;
  for (let product of products) {
    let divCard = document.createElement("div");
    divCard.className = "card product";
    divCard.innerHTML =
      `
        <img alt="product" class="card-img-top" src="` +
      product.image +
      `">
        <div class="card-body">
          <h5 class="card-title">` +
      product.name +
      `</h5>
          <p class="card-text">` +
      product.description +
      `</p>
          <h5>$` +
      product.price +
      `</h5>
          <button class="btn btn-primary bg-dark border-dark" onclick="addToCar('` +
      product.name +
      `', '` +
      product.price +
      `')" >Add to car</button>
        </div>`;
    productsContainer.appendChild(divCard);
  }
}

//Updates the car product list
function updateCar() {
  let total = 0;

  //cleans all content
  cleanAll();

  //makes the car layout visible again
  document.getElementById("car_layout").style.display = "block";

  let car_table = document.getElementById("car_items");
  car_table.innerHTML = ``;

  //updates the shopping car table's content
  for (let i = 0; i < car.length; i++) {
    let p = car[i];
    let amount = p.unitPrice * p.quantity;
    total += amount;

    let tr = document.createElement("tr");
    tr.innerHTML =
      `
        <th>` +
      (i + 1) +
      `</th>
        <td>` +
      p.quantity +
      `</td>
        <td>` +
      p.description +
      `</td>
        <td>` +
      p.unitPrice +
      `</td>
        <td>` +
      amount +
      `</td>
        <td>
            <button type="button" class="btn btn-secondary btn-lg" onclick='modifyProductAmount(` +
      i +
      `,true,true)' >+</button>
            <button type="button" class="btn btn-secondary btn-lg" onclick='modifyProductAmount(` +
      i +
      `,false,true)' >-</button>
        </td>`;
    car_table.appendChild(tr);
  }

  //updates the total amount
  let total_span = document.getElementById("total");
  total_span.innerHTML = `Total: $` + total.toString();
}

//Adds a product to the car array
function addToCar(description, unitPrice) {
  let exists = car.find((element) => element.description === description);
  if (exists) {
    modifyProductAmount(car.indexOf(exists), true, false);
  } else {
    let product = {
      quantity: 1,
      description: description,
      unitPrice: unitPrice,
    };

    car.push(product);
    document.getElementById("car_items_number").innerHTML =
      car.length.toString() + " items";
  }
}

// modifies the product's amount given its index in the car list
function modifyProductAmount(index, increase, update) {
  if (increase) {
    car[index].quantity += 1;
  } else {
    car[index].quantity -= 1;
  }
  if (car[index].quantity === 0) {
    car.splice(index, 1);
  }
  if (update) {
    updateCar();
  }
}

//removes all the elements inside the car
function cancelOrder() {
  car.length = 0;
  updateCar();
}

//confirms the order
function confirmOrder() {
  //prints the order
  for (let i = 0; i < car.length; i++) {
    car[i].item = i + 1;
  }
  console.log(car);
  //the items inside the car are removed after the order is confirmed
  //cancelOrder();
}

function cleanAll() {
  //Makes the car layout invisible
  document.getElementById("car_layout").style.display = "none";
  //cleans all content inside the products container
  document.getElementById("productsContainer").innerHTML = ``;
}
