const baseURL_CLIENT = 'https://livejs-api.hexschool.io/api/livejs/v1/customer';
const baseURL_ADMIN = 'https://livejs-api.hexschool.io/api/livejs/v1/admin';
const API_TOKEN = 'Is9upeigtAgXuAiuYoYsyMbhHni2';
const API_PATH = '/eshiunm';

// 購物車某一筆資料的 ID (不是產品 ID)
let cartsItemId;

// 產品相關(客戶) GET
function getProducts() {
  console.log('正在取得產品資料');
  // eslint-disable-next-line no-undef
  axios
    .get(`${baseURL_CLIENT}${API_PATH}/products`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

// 購物車相關(客戶) GET
function getCarts() {
  console.log('正在取得購物車資料');
  axios
    .get(`${baseURL_CLIENT}${API_PATH}/carts`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

// 購物車相關(客戶) POST
function postCarts() {
  const products = {
    data: {
      productId: 'Og2jctdYeNrimN6VDh9c',
      quantity: 12,
    },
  };
  console.log('正在將產品加到購物車中');
  axios
    .post(`${baseURL_CLIENT}${API_PATH}/carts`, products)
    .then((response) => {
      console.log(response.data);
      cartsItemId = response.data.carts[0].id;
    })
    .catch((error) => {
      console.log(error);
    });
}

// 購物車相關(客戶) PATCH
function patchCarts() {
  console.log('正在修改購物車某資料的數量');
  const products = {
    data: {
      id: cartsItemId,
      quantity: 99,
    },
  };
  axios
    .patch(`${baseURL_CLIENT}${API_PATH}/carts`, products)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// 購物車相關(客戶) DELETE One
function deleteOneCarts() {
  console.log('正在刪除購物車其中一筆資料');
  axios
    .delete(`${baseURL_CLIENT}${API_PATH}/carts/${cartsItemId}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

// 購物車相關(客戶) DELETE All
function deleteAllCarts() {
  console.log('正在刪除購物車所有的資料');
  axios
    .delete(`${baseURL_CLIENT}${API_PATH}/carts`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}


// -------------- 