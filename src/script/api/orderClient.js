import path from './apiAll.js';

function orderPost(formData) {
  axios
    .post(path.ordersCustomer('mosi'), formData)
    .then((res) => {
      console.log(res);
      alert('已送出訂單！');
    })
    .catch((error) => {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    });
}

function submit(form) {
  let formData = {
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
