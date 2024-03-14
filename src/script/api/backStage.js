/* eslint-disable no-undef */
import path from './apiAll.js';

// API 相關資料
const UID = 'YfUhuAyaz1PZFtU5riwjGtSFygo1';
const apiPath = 'mosi';

// DOM
const orderTableBody = document.querySelector('.orderTable tbody'); // table body
const deleteAllBtn = document.querySelector('#deleteAllBtn'); // delete all button
const changeChartBtn = document.querySelector('#changeChartBtn'); // change chart button
const chart = document.querySelector('#chart');
const chartTitle = document.querySelector('#chartTitle');

// 表單資料
let orderData = null;

const chartPie = c3.generate({
  bindto: '#chart',
  data: {
    columns: [],
    type: 'pie',
  },
  legend: {
    position: 'right',
  },
});

// 渲染「全品項營收比重」圖表
function renderChartItemRevenue() {
  const obj = {};
  orderData.forEach((item) => {
    item.products.forEach((product) => {
      if (obj[product.title] === undefined) {
        obj[product.title] = 1;
      } else {
        obj[product.title] += 1;
      }
    });
  });
  const productItemArr = Object.keys(obj);
  const newData = [];
  productItemArr.forEach((item) => {
    const arr = [];
    arr.push(item);
    arr.push(obj[item]);
    newData.push(arr);
  });

  // 先卸載舊資料，再載入新資料
  chartPie.unload({
    done: () => {
      chartPie.load({
        columns: newData,
      });
    },
  });

  chart.removeAttribute('data-class');
  chart.setAttribute('data-class', 'itemRevenue');
}

// 渲染「全產品類別營收比重」圖表
function renderChartProductCategory() {
  const obj = {};
  orderData.forEach((item) => {
    item.products.forEach((product) => {
      if (obj[product.category] === undefined) {
        obj[product.category] = 1;
      } else {
        obj[product.category] += 1;
      }
    });
  });
  const productCategoryArr = Object.keys(obj);
  const newData = [];
  productCategoryArr.forEach((item) => {
    const arr = [];
    arr.push(item);
    arr.push(obj[item]);
    newData.push(arr);
  });

  // 先卸載舊資料，再載入新資料
  chartPie.unload({
    done: () => {
      chartPie.load({
        columns: newData,
        colors: {
          窗簾: '#5434A7',
          床架: '#DACBFF',
          收納: '#9D7FEA',
        },
      });
    },
  });

  chart.removeAttribute('data-class');
  chart.setAttribute('data-class', 'productCategory');
}

// 切換圖表
changeChartBtn.addEventListener('click', (e) => {
  // 判斷現在的圖表是「全產品類別」還是「全品項」
  if (chart.getAttribute('data-class') === 'productCategory') {
    // 如果是「全產品類別」，就改渲染「全品項」
    chartTitle.textContent = '全品項營收比重';
    renderChartItemRevenue();
  } else {
    // 如果是「全品項」，就改渲染「全產品類別」
    chartTitle.textContent = '全產品類別營收比重';
    renderChartProductCategory();
  }
});

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
  let str = '';
  data.forEach((item) => {
    str += `<tr>
              <td class="pl-4 py-3 border-[1.5px] border-black">
              ${item.createdAt}</td>
              <td class="pl-4 py-3 border-[1.5px] border-black">
                ${item.user.name}<br>
                ${item.user.tel}</td>
              <td class="pl-4 py-3 border-[1.5px] border-black">
              ${item.user.address}
              </td>
              <td class="pl-4 py-3 border-[1.5px] border-black">
              ${item.user.email}
              </td>
              <td class="pl-4 py-3 border-[1.5px] border-black">
                <ul>
                  ${renderCustomerOrder(item.products)}
                </ul>
              </td>
              <td class="pl-4 py-3 border-[1.5px] border-black">
              ${getRealDate(item.createdAt)}</td>
              <td class="pl-4 py-3 border-[1.5px] border-black">
                <a class="p-1 text-[#0067CE] underline cursor-pointer" data-state="notProcess">未處理</a>
              </td>
              <td class="border-[1.5px] border-black">
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
deleteAllBtn.addEventListener('click', () => {
  axios
    .delete(path.ordersAdmin(apiPath), {
      headers: {
        authorization: UID,
      },
    })
    .then((res) => {
      orderData = res.data.orders;
      renderTable(orderData);
      renderChartProductCategory();
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
        orderData = res.data.orders;
        renderTable(orderData);
        // 如果是「全品項」，就改渲染「全產品類別」
        renderChartProductCategory();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// 修改訂單狀態(已處理 & 未處理)
orderTableBody.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    if (e.target.getAttribute('data-state') === 'notProcess') {
      e.target.textContent = '已處理';
      e.target.setAttribute('data-state', 'process');
    } else {
      e.target.textContent = '未處理';
      e.target.setAttribute('data-state', 'notProcess');
    }
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
      orderData = res.data.orders;
      renderTable(orderData);
      renderChartProductCategory();
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
