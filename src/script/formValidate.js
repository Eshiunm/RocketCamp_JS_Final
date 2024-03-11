/* eslint-disable comma-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const guestForm = document.querySelector('#guestForm');
// 建立表單約束條件
const constraints = {
  // 顧客姓名欄位驗證
  guestName: {
    presence: {
      message: '&必填！',
    },
  },
  // 電話欄位驗證
  guestPhone: {
    presence: {
      message: '&必填！',
    },
    format: {
      pattern: /^09\d{8}$/,
      message: '&請輸入正確的手機號碼',
    },
  },
  // email 欄位驗證
  guestEmail: {
    presence: {
      message: '&必填！',
    },
    email: {
      message: '&Email 格式不正確',
    },
  },
  // 地址欄位驗證
  guestAddress: {
    presence: {
      message: '&必填！',
    },
  },
};

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

function closestParent(child, className) {
  if (!child || child === document) {
    return null;
  }
  if (child.classList.contains(className)) {
    return child;
  }
  return closestParent(child.parentNode, className);
}

function resetFormGroup(formGroup) {
  _.each(formGroup.querySelectorAll('.help-block.error'), (el) => {
    el.parentNode.removeChild(el);
  });
}

function showErrorsForInput(input, errors) {
  const formGroup = closestParent(input.parentNode, 'form-group');
  messages = formGroup.querySelector('.messages');
  resetFormGroup(formGroup);
  if (errors) {
    _.each(errors, (error) => {
      addError(messages, error);
    });
  }
}

// 更新欄位錯誤訊息
function showErrors(form, errors) {
  // 針對所有 input 欄位跑迴圈，驗證沒過的欄位附上錯誤訊息
  _.each(
    // 搜尋所有帶 name 屬性的 input 欄位，然後針對這些欄位跑迴圈
    form.querySelectorAll('input[name]'),
    (input) => {
      showErrorsForInput(input, errors && errors[input.name]);
    }
  );
}

function handleFormSubmit(form) {
  const errors = validate(form, constraints);
  showErrors(form, errors || {});
  // 表單驗證無誤，執行要做的事
  if (!errors) {
    doLogin();
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
