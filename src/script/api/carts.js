import path from './apiAll.js';

const productList = document.querySelector('.product-list');
const cart = document.querySelector('.cart');
const totalAmount = document.querySelector('.total-amount');

// function Render Cart
function render(ary) {
  let str = '';
  ary.forEach((item) => {
    str += `<tr data-id="${item.id}">
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

// delete CartOne
cart.addEventListener('click', (e) => {
  const id = e.target.parentNode.parentNode.parentNode.getAttribute('data-id');
  axios
    .delete(path.cartsDeleteOne('mosi', id))
    .then((res) => {
      getCart('mosi');
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
});

// add Cart
productList.addEventListener('click', (e) => {
  const id = e.target.parentNode.getAttribute('data-id');
  const data = {
    data: {
      productId: id,
      quantity: 1,
    },
  };
  axios
    .post(path.carts('mosi'), data)
    .then((res) => {
      getCart('mosi');
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
});
