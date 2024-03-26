import path from './apiAll.js';

const productList = document.querySelector('.product-list');
const cart = document.querySelector('.cart');
const totalAmount = document.querySelector('.total-amount');
const deleteBtn = document.querySelector('.delete-all-btn');
let sessionPath = '';

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
        <span class="font-normal ml-4">${item.product.title}</span>
      </div>
    </td>
    <td class="border-b border-[#BFBFBF] py-5 pr-5">
      <span class="block">NT$${item.product.price}</span>
    </td>
    <td class="border-b border-[#BFBFBF] py-5 pr-5">
    <select name="product-nums" class="bg-white-bg border border-gray-border rounded px-3 py-2" data-q-id="${
      item.id
    }">
    <option value="${item.quantity}" selected disabled hidden>${
      item.quantity
    }</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    </td>
    <td class="border-b border-[#BFBFBF] py-5 pr-5">
      <span class="block">NT$${item.product.price * item.quantity}</span>
    </td>
    <td class="border-b border-[#BFBFBF] py-5 text-center">
      <button class="pt-2 ">
        <span class="material-symbols-outlined">close</span>
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
      if (ary.length === 0) {
        document.querySelector('.clear-cart').classList.remove('hidden');
        document.querySelector('.cart-section').classList.add('hidden');
      } else {
        document.querySelector('.clear-cart').classList.add('hidden');
        document.querySelector('.cart-section').classList.remove('hidden');
      }
      totalAmount.innerText = `NT$${res.data.finalTotal}`;
    })
    .catch((err) => {
      console.log(err);
    });
}

function hasSessionPath() {
  if (sessionStorage.getItem('path')) {
    sessionPath = sessionStorage.getItem('path');
  } else {
    const hexschoolPath = prompt(
      '請輸入個人專屬 Path，若尚未持有，請先至 https://livejs-api.hexschool.io/ 申請'
    );
    window.sessionStorage.setItem('path', hexschoolPath);
    sessionPath = sessionStorage.getItem('path');
  }
  return sessionPath;
}

hasSessionPath();

getCart(sessionPath);
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
    .post(path.carts(sessionPath), data)
    .then((res) => {
      getCart(sessionPath);
      if (!document.querySelector('.clear-cart').classList.contains('hidden')) {
        document.querySelector('.clear-cart').classList.add('hidden');
        document.querySelector('.cart-section').classList.remove('hidden');
      }
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
});

// delete CartOne
cart.addEventListener('click', (e) => {
  const id = e.target.parentNode.parentNode.parentNode.getAttribute('data-id');
  axios
    .delete(path.cartsDeleteOne(sessionPath, id))
    .then((res) => {
      getCart(sessionPath);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete cartAll
deleteBtn.addEventListener('click', () => {
  if (cart.innerHTML === '') {
    alert('購物車無資料');
    return;
  }
  if (!deleteBtn.classList.contains('delete')) {
    deleteBtn.classList.add('delete');
    setTimeout(() => deleteBtn.classList.remove('delete'), 2400);
  }
  axios
    .delete(path.carts(sessionPath))
    .then((res) => {
      cart.innerHTML = '';
      document.querySelector('.total-amount').innerText = 'NT$0';
      document.querySelector('.clear-cart').classList.remove('hidden');
      document.querySelector('.cart-section').classList.add('hidden');
    })
    .catch((err) => {
      console.log(err);
    });
});

//modified quantity
cart.addEventListener('change', (e) => {
  const id = e.target.parentNode.parentNode.getAttribute('data-id');
  const quantity = Number(e.target.value);
  const data = {
    data: {
      id,
      quantity,
    },
  };
  axios
    .patch(path.carts(sessionPath), data)
    .then((res) => {
      getCart(sessionPath);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
});
