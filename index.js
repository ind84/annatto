import { productosFit, productsfitstrong } from "./scripts/data.js";
import confetti from "https://esm.sh/canvas-confetti";


// seleccionamos el elemento diálogo//
const dialog = document.querySelector("#carrito");
// este botón abre el dialogo//
const opencart = document.querySelector(".carrito");
// este botón cierra el dialogo//
const closecart = document.querySelector(".cerrarcarrito");
// activar el buscador//
const dialogsearch = document.querySelector("#search");
const opensearch = document.querySelector(".search");
const closesearch = document.querySelector(".cerrarsearch");
const productsElement = document.querySelector("#products");
const searchinput = document.querySelector("#searchinput");
const boxescartelement = document.querySelector("#entradas");
const storageElement = document.querySelector("#storage");
const boxproductsearch = document.querySelector("boxproductsearch");

const cart = [];
const search=[];

searchinput.addEventListener("input", function (e) {
  const value = e.target.value; // valor del input
  productsElement.innerHTML = "";
  const productFiltered = productosFit.filter((product) =>
    product.name.toLowerCase().includes(value)
  );

  if (productFiltered.length) {
    for (const filterProduct of productFiltered) {
      productsElement.innerHTML = `  <div class="boxproductsearch">
              
          <figure > <img src="${filterProduct.image}"/></figure>
                  <div><h3>${filterProduct.name}</h3>
                <p>${filterProduct.description}</p>
                <h4>$${filterProduct.price}</h4>
                <button class="btn">Agregar al carrito</button>
                </div>
      </div>`;
    }
  } else {
    productsElement.innerHTML = `<h2>Producto no encontrado</h2>`;
  }
  if (value === "") {
    getProductos();
  }
});

function getProductos() {
  for (const product of productosFit) {
    productsElement.innerHTML += `
  
          <div class="boxproductsearch">
      <figure> <img src="${product.image}"/></figure>
              <div><h3>${product.name}</h3>
            <p>${product.description}</p>
            <h4>$${product.price}</h4>
            <button id="add-to-cart-${product.id}"class="btn">Agregar al carrito</button>
            </div>
  </div>
    
      `;
    
  }
}

function getProductoscart() {
  for (const product of productsfitstrong) {
    const container = document.createElement("div");
    container.innerHTML += `
  <div class="boxproductcart">
          
      <figure> <img src="${product.foto}"/></figure>
              <div><h3>${product.nombre}</h3>
            <p>${product.descripcion}</p>
            <h4>$${product.precio}</h4>
            <button id="add-to-cart-${product.id}" class="btn">Agregar al carrito</button>
            </div>
  </div>
    
      `;
    const btnCart = container.querySelector(`#add-to-cart-${product.id}`);
    btnCart.addEventListener("click", () => {
      addToCart(product)
    });
    boxescartelement.appendChild(container);
  }
}

function deleteProductByIndex(id) {
  const cartLocal = JSON.parse(globalThis.localStorage.getItem("cart") || "[]");

  const nuevoArray = cartLocal.filter(product => product.id !== id)
  localStorage.setItem("cart", JSON.stringify(nuevoArray));
  loadCart()
}
function addToCart(product) {
 cart.push(product) 
 globalThis.localStorage.setItem('cart', JSON.stringify(cart))
 loadCart()
 confetti()
}

function loadCart() {
  const cartLocal = JSON.parse(globalThis.localStorage.getItem("cart") || '[]');
  const cartEmptyTemplate = ` <aside class="infovacio">
        <h2>TU CARRITO ESTA VACÍO</h2>
        <p>Agrega tu platillo favorito para hacer tu compra</p>
        <img src="LOGOS/IMG HOME/CARRITO.png" width="200px" />
       <a href="index.html"> <button class="buy">Comenzar a comprar</button></a>
      </aside>`; 
   
    storageElement.innerHTML = ''
      if (cartLocal.length) {
        cartLocal.forEach(function(product, index) {
          const productcontainer=document.createElement("div")
          productcontainer.classList.add("productcontainer")
          productcontainer.innerHTML += `
         <figure>
       <img src="${product.foto}"/>
       </figure>
              <div>
              <h3>${product.nombre}</h3>
            <p>${product.descripcion}</p>
            <h4>$${product.precio}</h4>
         <button id="product-${product.id}">Eliminar</button>
        <a href="https://www.paypal.com/co/webapps/mpp/account-selection"> <button id="product-${product.id}">Comprar</button></a>
       </div>
         
         `;
         const buttonDelete = productcontainer.querySelector(`#product-${product.id}`)
         buttonDelete.addEventListener('click', () => {
          deleteProductByIndex(product.id)
         })

         storageElement.appendChild(productcontainer)
       })
        
      } else {
        storageElement.innerHTML = cartEmptyTemplate;
      }
}
getProductos();
getProductoscart();
loadCart()
// el add evenlistener dispara un evento según el elemento que le indique//
opencart.addEventListener("click", function () {
  dialog.showModal();
  document.body.classList.add("quitar-scroll");
});

closecart.addEventListener("click", function () {
  dialog.close();
  document.body.classList.remove("quitar-scroll");
});

opensearch.addEventListener("click", function () {
  dialogsearch.showModal();
});

closesearch.addEventListener("click", function () {
  dialogsearch.close();
});
