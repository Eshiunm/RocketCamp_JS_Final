const baseUrl = 'https://livejs-api.hexschool.io/api/livejs/v1/customer';
const baseUrlAdmin = 'https://livejs-api.hexschool.io/api/livejs/v1/admin';

const path = {
  products(token) {
    return `${baseUrl}/${token}/products`;
  },
  carts(token) {
    return `${baseUrl}/${token}/carts`;
  },
  cartsDeleteOne(token, id) {
    return `${baseUrl}/${token}/carts/${id}`;
  },
  ordersCustomer(token) {
    return `${baseUrl}/${token}/orders`;
  },
  ordersAdmin(token) {
    return `${baseUrlAdmin}/${token}/orders`;
  },
  ordersAdminOne(token, id) {
    return `${baseUrlAdmin}/${token}/orders/${id}`;
  },
};

export default path;
