import path from './apiAll.js';

const productList = document.querySelector('.product-list');
const categorySelector = document.querySelector('.category-selector');

function render(ary) {
  let str = '';
  ary.forEach((item) => {
    str += `<li><div class="relative" data-category="${item.category}" data-id="${item.id}" data-description="${item.description}">
    <span
      class="min-w-[88px] min-h-[44px] bg-black text-white inline-flex justify-center items-center absolute top-3 left-[171px]"
      ><span
        class="text-lg text-center leading-none relative bottom-[3px]"
        >新品</span
      ></span
    >
    <img
      src="${item.images}"
      alt=""
    /><button
      type="button"
      class="w-[255px] h-12 bg-black text-white text-xl"
    >
      加入購物車
    </button>
    <p class="text-xl my-2">${item.title}</p>
    <p class="text-xl line-through">NT$${item.origin_price}</p>
    <p class="text-[28px]">NT$${item.price}</p>
  </div></li>`;

    productList.innerHTML = str;
  });
}
function products(token) {
  axios
    .get(path.products(token))
    .then((response) => {
      const data = response.data.products;

      render(data);

      categorySelector.addEventListener('change', (e) => {
        const category = e.target.value;
        const filter = data.filter((item) => item.category.includes(category));
        productList.innerHTML = '';
        if (category === '全部') {
          render(data);
        } else {
          render(filter);
        }
      });

      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

if (sessionStorage.getItem('path')) {
  const sessionPath = sessionStorage.getItem('path');
  products(sessionPath);
} else {
  const hexschoolPath = prompt(
    '請輸入個人專屬 Path，若尚未持有，請先至 https://livejs-api.hexschool.io/ 申請'
  );
  window.sessionStorage.setItem('path', hexschoolPath);
  const sessionPath = sessionStorage.getItem('path');
  products(sessionPath);
}
