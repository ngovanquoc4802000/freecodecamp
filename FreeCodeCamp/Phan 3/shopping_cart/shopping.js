// lập trình theo hướng đối tượng
// là 1 trong những cách tiếp cận chính cho quá trình phát triển phần mềm
// trong OPP các nhà phát triển sử dụng các đối tượng và các lớp cấu trúc mã của chúng
// trong dự án này tôi sẽ học được cách xác định các lớp và sử dụng chúng .
// Bạn sẽ tạo các phiên bản lớp và thực hiện các phương thức để thao tác dữ liệu

const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");

const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");

const showHideCartSpan = document.getElementById("show-hide-cart");
let isCartShowing = false;

//sử dụng 1 mảng rỗng để lưu trữ nhiều sản phẩm;
// 1 sản phẩm sẽ cần 1 định danh duy nhất để phân biệt nó với các sản phẩm khác

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
];

products.forEach(({ name, id, price, category }) => {
  dessertCards.innerHTML += `
   <div class="dessert-card" id="${id}">
     <h2>${name}</h2>
     <p class="dessert-price">$${price}</p>
     <p class="product-category">Category: ${category}</p>
     <button id="${id}" class="btn add-to-cart-btn">Add to cart</button>
   </div>
   `;
});

// 1 lớp giống như bản thiết kế để tạo các đối tượng
class ShoppingCart {
  // constructor được gọi khi 1 thể hiện của lớp được tạo
  constructor() {
    // từ khoá this trong js được sử dụng để chỉ đối tượng hiện tại
    this.items = [];
    this.total = 0;
    this.taxRate = 8.25;
  }
  addItem(id, products) {
    const product = products.find((item) => item.id === id);
    const { name, price } = product;
    this.items.push(product);

    const totalCountPerProduct = {};

    this.items.forEach((dessert) => {
      //update 1 phần tử trong 1 mảng

      // totalCountPerProduct[dessert.id] = totalCountPerProduct[dessert.id] + 1;

      // lúc này bị 1 lỗi nhỏ , khi cố gắng truy cập một thuộc tính
      // của 1 đối tượng và thuộc tính đó không tòn tại
      // để khắc phục:
      totalCountPerProduct[dessert.id] =
        (totalCountPerProduct[dessert.id] || 0) + 1;
    });
    //phần cập nhật hiển thị
    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(
      `product-count-for-id${product.id}`
    );
    // hành vi của Phương pháp additem cần thay đổi nếu sản phẩm đã
    // có trong giỏ hàng hay không
    currentProductCount > 1
      ? // số lượng bao nhiêu x
        (currentProductCountSpan.textContent = `${currentProductCount}x ${name}`)
      : // phần + vào để hiển thị với giá cả
        (productsContainer.innerHTML += `
      <div class="product" id="dessert-${id}">
       <p>
       <span class="product-count" id="product-count-for-id${id}">${name}</span>
       </p>
       <p>${price}</p>
      </div>`);
  }
  // số lượng id có trong phần tử
  getCounts() {
    return this.items.length;
  }
  // tính thuế
  calculateTexas(amount) {
    //this.taxRate / 100 & chuyển đổi nó thành phần trăm
    //  & nhân với amount
    // .toFixed ở đuôi bằng bao nhiêu số sẽ ra bao nhiêu số
    // parseFloat dùng để chuyển đổi một chuỗi thành 1 số thập phân (bỏ qua các khoảng trắng ở đầu)
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
  }
  // tính tổng tiền dùng reduce
  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0);
    const tax = this.calculateTexas(subTotal);
    this.total = subTotal + tax;
    cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
    cartTaxes.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${this.total.toFixed(2)}`;
    return this.total;
  }
  clearCart() {
    if (this.items.length === 0) {
      alert("Your shopping clear is already empty");
      return;
    }
    const isCartClear = confirm(
      "Are you sure you want to clear all items from your shopping cart?"
    );
    if (isCartClear) {
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = 0;
      cartTaxes.textContent = 0;
      cartTotal.textContent = 0;
    }
  }
}

const cart = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");
[...addToCartBtns].forEach((btn) => {
  btn.addEventListener("click", (event) => {
    cart.addItem(Number(event.target.id), products);
    totalNumberOfItems.textContent = cart.getCounts();
    cart.calculateTotal();
  });
});

cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing; // gán cho nó thành true và sử dụng toán tử ba ngôi
  showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});

clearCartBtn.addEventListener(
  "click",
  //bạn cần phải sử dụng đến function bind() để ràng buộc
  cart.clearCart.bind(cart)
);
