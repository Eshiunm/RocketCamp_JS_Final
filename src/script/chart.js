let chart = c3.generate({
  bindto: '#chart',
  data: {
    columns: [
      ['data1', 30, 200, 100, 400, 150, 250], // 這筆陣列資料的名稱叫 data1
      ['data2', 50, 20, 10, 40, 15, 25], // 這筆陣列資料的名稱叫 data2
    ],
  },
});
