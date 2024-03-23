import path from './apiAll.js';

function orderPost(formData) {
  axios
    .post(path.ordersCustomer(sessionStorage.getItem('path')), formData)
    .then((res) => {
      alert('已送出訂單！');
      document.querySelector('.cart').innerHTML = '';
      document.querySelector('.clear-cart').classList.remove('hidden');
      document.querySelector('.cart-section').classList.add('hidden');
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
}

function submit(form) {
  const formData = {
    data: {
      user: {},
    },
  };
  const inputs = form.querySelectorAll('input[name], select[name]');
  inputs.forEach((input) => {
    formData.data.user[input.name] = input.value;
  });
  orderPost(formData);
}

export default submit;
