import path from './apiAll.js';

function orderPost(formData) {
  axios
    .post(path.ordersCustomer(sessionStorage.getItem('path')), formData)
    .then((res) => {
      alert('已送出訂單！');
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
