/* eslint-disable import/extensions */
/* eslint-disable comma-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */

import submit from './api/orderClient.js';

const guestForm = document.querySelector('#guestForm');

// 建立表單約束條件
const constraints = {
  // 顧客姓名欄位驗證
  name: {
    presence: {
      message: '&必填！',
    },
  },
  // 電話欄位驗證
  tel: {
    presence: {
      message: '&必填！',
    },
    format: {
      pattern: /^09\d{8}$/,
      message: '&請輸入正確的手機號碼',
    },
  },
  // email 欄位驗證
  email: {
    presence: {
      message: '&必填！',
    },
    email: {
      message: '&Email 格式不正確',
    },
  },
  // 地址欄位驗證
  address: {
    presence: {
      message: '&必填！',
    },
  },
};

// 顯示錯誤訊息
function addError(messages, error) {
  const index = error.indexOf('&');
  const errorMessage = error.substring(index + 1);
  const block = document.createElement('span');
  block.classList.add('md:absolute');
  block.classList.add('md:bottom-2');
  block.classList.add('md:left-[102%]');
  block.classList.add('whitespace-nowrap');
  block.classList.add('text-red-error');
  block.classList.add('help-block');
  block.classList.add('error');
  block.innerText = errorMessage;
  messages.appendChild(block);
}

// 找父節點
function closestParent(child, className) {
  if (!child || child === document) {
    return null;
  }
  if (child.classList.contains(className)) {
    return child;
  }
  return closestParent(child.parentNode, className);
}

// 移除表單欄位的錯誤訊息
function resetFormGroup(formGroup) {
  _.each(formGroup.querySelectorAll('.help-block.error'), (el) => {
    el.parentNode.removeChild(el);
  });
}

// 對驗證沒過的欄位附上錯誤訊息
function showErrorsForInput(input, errors) {
  const formGroup = closestParent(input.parentNode, 'form-group');
  const messages = formGroup.querySelector('.messages');

  // 附上錯誤訊息之前先清除原有的錯誤訊息
  resetFormGroup(formGroup);

  if (errors) {
    _.each(errors, (error) => {
      addError(messages, error);
    });
  }
}

// 搜尋所有具 name 屬性的 input 欄位
function showErrors(form, errors) {
  // 搜尋所有具 name 屬性的 input 欄位，並針對這些欄位逐一地跑迴圈
  _.each(form.querySelectorAll('input[name]'), (input) => {
    showErrorsForInput(input, errors && errors[input.name]);
  });
}

// 處理表單提交
function handleFormSubmit(form) {
  const errors = validate(form, constraints);
  // 有錯就顯示錯誤訊息
  showErrors(form, errors || {});
  // 沒錯就執行要做的事
  if (!errors) {
    submit(form);
  }
}

// 對表單內可以輸入資料的元素，逐一加上監聽事件達到自動驗證的效果
const inputs = document.querySelectorAll('input, textarea, select');
for (let i = 0; i < inputs.length; ++i) {
  inputs.item(i).addEventListener('change', function () {
    // form 變數儲存表單元素的 DOM
    const errors = validate(guestForm, constraints) || {};
    showErrorsForInput(this, errors[this.name]);
  });
}

// 提交按鈕驗證
guestForm.addEventListener('submit', (e) => {
  e.preventDefault();
  handleFormSubmit(guestForm);
});
