// mini-project
let imgInp = document.querySelector("#product-url-input");
let titleInp = document.querySelector("#product-title-input");
let priceInp = document.querySelector("#product-price-input");
let emailInp = document.querySelector("#product-email-input");
let numInp = document.querySelector("#product-num-input");
let saveChangesBtn = document.querySelector(".save-changes-btn");

function initStorage() {
  if (!localStorage.getItem("products-data")) {
    localStorage.setItem("products-data", "[]");
  }
}
initStorage();

function setProductsToStorage(products) {
  localStorage.setItem("products-data", JSON.stringify(products));
}

function getProductsFromStorage() {
  let products = JSON.parse(localStorage.getItem("products-data"));
  return products;
}

function render(data = getProductsFromStorage()) {
  let container = document.querySelector(".container");
  container.innerHTML = "";
  // let data = getProductsFromStorage();
  //   console.log(data);
  data.forEach((item) => {
    // console.log(item);
    container.innerHTML += `
    <div class="card w-25 m-2" style="width: 18rem;" id="${item.id}" >
        <img src="${item.url}" class="card-img-top" alt="error" height="250">
        <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text"><b>Number:</b> ${item.number}</p>
            <p class="card-text"><b>Address:</b> ${item.price}</p>
            <p class="card-text"><b>Email:</b> ${item.email}</p>
            <a href="#" class="btn btn-danger delete-product-btn">Delete</a>
            <a href="#" class="btn btn-warning upd-product-btn" data-bs-toggle="modal"
            data-bs-target="#staticBackdrop">Update</a>
        </div>
    </div>
    `;
  });

  if (data.length === 0) return;
  addDeleteEvent();
  addUpdateEvent();
}
render();
// create
function createProduct() {
  const productObj = {
    id: Date.now(),
    url: imgInp.value,
    title: titleInp.value,
    number: numInp.value,
    price: priceInp.value,
    email: emailInp.value,
  };

  let products = getProductsFromStorage();
  products.push(productObj);
  setProductsToStorage(products);

  imgInp.value = "";
  titleInp.value = "";
  numInp.value = "";
  priceInp.value = "";
  emailInp.value = "";

  let btnClose = document.querySelector(".btn-close");
  btnClose.click();

  render();
}

let addProductBtn = document.querySelector(".add-product-btn");
addProductBtn.addEventListener("click", createProduct);

// delete
function deleteProduct(e) {
  let productId = e.target.parentNode.parentNode.id;
  let products = getProductsFromStorage();
  products = products.filter((item) => item.id != productId);
  setProductsToStorage(products);
  render();
}

function addDeleteEvent() {
  let delBtns = document.querySelectorAll(".delete-product-btn");
  // console.log(delBtns);
  delBtns.forEach((item) => item.addEventListener("click", deleteProduct));
}

// update
function updateProduct(e) {
  let productId = e.target.parentNode.parentNode.id;
  let products = getProductsFromStorage();
  let productObj = products.find((item) => item.id == productId);
  imgInp.value = productObj.url;
  titleInp.value = productObj.title;
  numInp.value = productObj.number;
  priceInp.value = productObj.price;
  emailInp.value = productObj.email;

  saveChangesBtn.setAttribute("id", productId);
}
function addUpdateEvent() {
  let updateBtns = document.querySelectorAll(".upd-product-btn");
  updateBtns.forEach((item) => item.addEventListener("click", updateProduct));
}

function saveChanges(e) {
  if (!saveChangesBtn.id) return;
  let products = getProductsFromStorage();
  let productObj = products.find((item) => item.id == saveChangesBtn.id);
  // console.log(productObj);
  productObj.url = imgInp.value;
  productObj.title = titleInp.value;
  productObj.number = numInp.value;
  productObj.price = priceInp.value;
  productObj.email = emailInp.value;
  setProductsToStorage(products);
  saveChangesBtn.removeAttribute("id");
  imgInp.value = "";
  titleInp.value = "";
  numInp.value = "";
  priceInp.value = "";
  emailInp.value = "";

  let btnClose = document.querySelector(".btn-close");
  btnClose.click();

  render();
}

saveChangesBtn.addEventListener("click", saveChanges);

// search
let searchInp = document.querySelector("#search-inp");
searchInp.addEventListener("input", (e) => {
  // console.log(e.target.value);
  let products = getProductsFromStorage();
  products = products.filter((item) => {
    return (
      item.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );
  });
  render(products);
  if (!products.length) {
    let titleNoPost = document.querySelectorAll(".title-no");
    return (titleNoPost.innerHTML = "Посты не найдены");
  }
});
