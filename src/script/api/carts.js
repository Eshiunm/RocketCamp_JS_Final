import path from './apiNext.js';

const productList = document.querySelector('.product-list');
const cart = document.querySelector('.cart');
const totalAmount = document.querySelector('.total-amount');
console.log(totalAmount);

// function Render Cart
function render(ary) {
  let str = '';
  ary.forEach((item) => {
    str += `<tr>
    <td class="border-b border-[#BFBFBF] py-5 pr-5">
      <div class="flex items-center">
        <img
          class="w-20 h-20"
          src="${item.product.images}"
          alt="商品圖片"
        />
        <span class="font-normal ml-4">Charles 系列儲物組合</span>
      </div>
    </td>
    <td class="border-b border-[#BFBFBF] py-5 pr-5">
      <span class="block">NT$${item.product.price}</span>
    </td>
    <td class="border-b border-[#BFBFBF] py-5 pr-5">
      <span>${item.quantity}</span>
    </td>
    <td class="border-b border-[#BFBFBF] py-5 pr-5">
      <span class="block">NT$${item.product.price * item.quantity}</span>
    </td>
    <td class="border-b border-[#BFBFBF] py-5 text-center">
      <button>
        <img src="../images/icon-delete.svg" alt="刪除" />
      </button>
    </td>
  </tr>`;
  });
  cart.innerHTML = str;
}

// fetch Cart
function getCart(token) {
  axios
    .get(path.carts(token))
    .then((res) => {
      const ary = res.data.carts;
      render(ary);
      totalAmount.innerText = `NT$${res.data.finalTotal}`;
    })
    .catch((err) => {
      console.log(err);
    });
}

getCart('mosi');
