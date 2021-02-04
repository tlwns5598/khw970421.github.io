import {url} from './Data.js'

let input = document.getElementById('input')
let button = document.getElementById('but');

button.addEventListener('click',function(){
  dfd.read_csv(`${url}${input.value.replace(/-/gi,'').slice(2,8)}.csv`)
    .then(
      function(data) {
        const incDec_Length_Except_Sum = data.body__items__item__incDec.data.length-1;
        const gubun_Length_Except_Sum = data.body__items__item__gubun.data.length-1;

        let df = new dfd.DataFrame({
          Price: data.body__items__item__incDec.data.slice(0,incDec_Length_Except_Sum),   //표의 맨 아래 합계를 제거한 내용들
          Location : data.body__items__item__gubun.data.slice(0,gubun_Length_Except_Sum),
          Type: data.body__items__item__gubun.data.slice(0,gubun_Length_Except_Sum)
        })
        df.plot("plot_div").pie({ values: "Price", labels: "Type" })
      }
    )
    .catch(() => {
      alert('저장된 데이터 이외의 날짜를 클릭했습니다.');
    })
});
