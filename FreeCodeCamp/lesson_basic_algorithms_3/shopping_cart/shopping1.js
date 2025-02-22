const productsContainer = document.getElementById("products-container");
const totalNumberOf = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const dessertContainer = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const showHideCartSpan = document.getElementById("show-hide-cart");
const cartContainer = document.getElementById("cart-container");
const clearCartBtn = document.getElementById("clear-cart-btn");
const selectCart = document.getElementById("select-Cart");

let isCartShowing = false;

const products = [
  {
    id: 1,
    name: "Vanilla Cupcakes (6 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
  {
    id: 2,
    name: "French Macaron",
    price: 3.99,
    category: "Macaron",
  },
  {
    id: 3,
    name: "Pumpkin Cupcake",
    price: 3.99,
    category: "Cupcake",
  },
  {
    id: 4,
    name: "Chocolate Cupcake",
    price: 5.99,
    category: "Cupcake",
  },
  {
    id: 5,
    name: "Chocolate Pretzels (4 Pack)",
    price: 10.99,
    category: "Pretzel",
  },
  {
    id: 6,
    name: "Strawberry Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 7,
    name: "Chocolate Macarons (4 Pack)",
    price: 9.99,
    category: "Macaron",
  },
  {
    id: 8,
    name: "Strawberry Pretzel",
    price: 4.99,
    category: "Pretzel",
  },
  {
    id: 9,
    name: "Butter Pecan Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 10,
    name: "Rocky Road Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 11,
    name: "Vanilla Macarons (5 Pack)",
    price: 11.99,
    category: "Macaron",
  },
  {
    id: 12,
    name: "Lemon Cupcakes (4 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
  {
    id: 13,
    name: "Chocolate Cupcake",
    price: 12.99,
    category: "Cupcake",
  },
];

const renderList = (arr = products) => {
 dessertContainer.innerHTML = arr.map((item) => {
    return `
    <div class="dessert-card">
    <h2>${item.name}</h2>
    <p class="dessert-price">${item.price}</p>
    <p class="product-category">${item.category}</p>
    <button id="${item.id}" class="btn add-to-cart-btn">Add to cart</button>
    </div>
   `;
  }).join("")
}
renderList();

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.taxes = 8.25;
  }
  addItems(id, products) {
    // trước hết là tìm trong products có id không đã
    const product = products.find((item) => item.id === id);
    const { name, price } = product;
    this.items.push(product);

    const totalCountPerProduct = {};
    // nhắm đến id trong 1 phần tử trong mảng
    this.items.forEach((dessert) => {
      totalCountPerProduct[dessert.id] =
        (totalCountPerProduct[dessert.id] || 0) + 1;  
    });
    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(
      `product-count-for-id${product.id}`
    );
    currentProductCount > 1
      ? (currentProductCountSpan.textContent = `${currentProductCount}x ${name}`)
      : (productsContainer.innerHTML += `
     <div class="product" id="dessert-${id}">
       <p>
       <span class="product-count" id="product-count-for-id${id}">${name}</span>
       </p>
       <p>${price}</p>
      </div>
     `);
  }
  getCount() {
    return (totalNumberOf.textContent = this.items.length);
  }
  calculatorTaxes(amount) {
    // số thuê mặc định / 100 và * cho tổng;
    return parseFloat(((this.taxes / 100) * amount).toFixed(2));
  }
  calculatorTotal() {
    const subTotal = this.items.reduce((acc, el) => acc + el.price, 0);
    const taxes = this.calculatorTaxes(subTotal);
    const total = subTotal + taxes;
    cartSubTotal.textContent = `$${subTotal}`;
    cartTaxes.textContent = `$${taxes}`;
    cartTotal.textContent = `$${total}`;
  }
  clearShopping() {
    productsContainer.innerHTML = ``;
    totalNumberOf.textContent = 0;
    cartSubTotal.textContent = 0;
    cartTaxes.textContent = 0;
    cartTotal.textContent = 0;
  }
  filterCart(target) {
    if(target === "name") {
      renderList(products.filter((item) => item.name === "Chocolate Cupcake"))
    } else if(target === "price") {
      renderList(products.filter((item) => item.price === 3.99))
     } else if(target === "category") {
      renderList(products.filter((item) => item.category === "Ice Cream"))
     } else if(target === "All") {
      renderList()
     }
  }
}
const cart = new ShoppingCart();
const addItems = [
  ...document.getElementsByClassName("add-to-cart-btn"),
].forEach((btn) => {
  btn.addEventListener("click", (event) => {
    cart.addItems(Number(event.target.id), products);
    cart.getCount();
    cart.calculatorTotal();
  });
});

cartBtn.addEventListener("click", () => {
  // kĩ thuật phản biện sai thành đúng
  // gán cho nó bằng toán tử dấu bằng để rồi so sánh
  // thành toán tử ba ngôi
  isCartShowing = !isCartShowing;
  showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});

clearCartBtn.addEventListener("click", () => {
  cart.clearShopping();
});

selectCart.addEventListener("change", (e) => {
  cart.filterCart(e.target.value);
  [...document.getElementsByClassName("add-to-cart-btn")].forEach((btn) => {
      btn.addEventListener("click",(event) => {
        cart.addItems(Number(event.target.id),products);
        cart.getCount();       
        cart.calculatorTotal();
      })
  })
})