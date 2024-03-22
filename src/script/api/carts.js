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
    })
    .catch((err) => {
      console.log(err);
    });
});
