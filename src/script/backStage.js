/* eslint-disable no-undef */
import path from './api/apiAll.js';

// API 相關資料
const UID = 'YfUhuAyaz1PZFtU5riwjGtSFygo1';
const apiPath = 'mosi';

// DOM
const orderTableBody = document.querySelector('.orderTable tbody'); // table body
const delteAllBtn = document.querySelector('#delteAllBtn');

function renderChart() {}

// 將時間戳轉成日期
function getRealDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}/${month}/${day}`;
}

// 渲染顧客下單的所有品項
function renderCustomerOrder(data) {
  let str = '';
  data.forEach((item, index) => {
    str += `<li>${index + 1}. ${item.title}</li>`;
  });
  return str;
}

// 渲染表格內容
function renderTable(data) {
  console.log(data);
  let str = '';
  data.forEach((item) => {
    str += `<tr>
              <td class="pl-4 py-3 border border-black">${item.createdAt}</td>
              <td class="pl-4 py-3 border border-black">
                ${item.user.name}<br>
                ${item.user.tel}</td>
              <td class="pl-4 py-3 border border-black">
              ${item.user.address}
              </td>
              <td class="pl-4 py-3 border border-black">
              ${item.user.email}
              </td>
              <td class="pl-4 py-3 border border-black">
                <ul>
                  ${renderCustomerOrder(item.products)}
                </ul>
              </td>
              <td class="pl-4 py-3 border border-black">
              ${getRealDate(item.createdAt)}</td>
              <td class="pl-4 py-3 border border-black">
                <a class="p-1 text-[#0067CE] underline cursor-pointer">未處理</a>
              </td>
              <td class="border border-black">
                <button
                  class="bg-red-danger text-white px-3 py-[7px] block mx-auto hover:bg-white hover:text-red-danger hover:font-bold" 
                  data-id=${item.id}
                >
                  刪除
                </button>
              </td>
            </tr>`;
  });
  orderTableBody.innerHTML = str;
}

// 刪除全部訂單資料
delteAllBtn.addEventListener('click', () => {
  axios
    .delete(path.ordersAdmin(apiPath), {
      headers: {
        authorization: UID,
      },
    })
    .then((res) => {
      renderTable(res.data.orders);
    })
    .catch((err) => {
      console.log(err);
    });
});

// 刪除一筆訂單資料
orderTableBody.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' && e.target.getAttribute('data-id')) {
    const id = e.target.getAttribute('data-id');
    axios
      .delete(path.ordersAdminOne(apiPath, id), {
        headers: {
          authorization: UID,
        },
      })
      .then((res) => {
        renderTable(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// 取得訂單資料 + 渲染表格內容
function getOrder(userPath) {
  axios
    .get(path.ordersAdmin(userPath), {
      headers: {
        authorization: UID,
      },
    })
    .then((res) => {
      renderTable(res.data.orders);
    })
    .catch((err) => {
      console.log(err);
    });
}

// 初始化渲染圖跟表
function initial() {
  getOrder(apiPath);
}

initial();

let chart = c3.generate({
  bindto: '#chart',
  data: {
    columns: [
      ['data1', 30, 200, 100, 400, 150, 250], // 這筆陣列資料的名稱叫 data1
      ['data2', 50, 20, 10, 40, 15, 25], // 這筆陣列資料的名稱叫 data2
    ],
  },
});
