import {url} from './Data.js'

let input = document.getElementById('input')
let Plot_Button = document.getElementById('plot');
let Bar_Button = document.getElementById('bar');
let Cancel_Plot_Button = document.getElementById('cancel_plot');
let Cancel_Bar_Button = document.getElementById('cancel_bar');

Plot_Button.addEventListener('click',function(){
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

Bar_Button.addEventListener('click',function(){
  dfd.read_csv(`https://khw970421.github.io/covid/Modify_Danfo/Data/Date/${input.value.replace(/-/gi,'').slice(2,8)}.csv`)
    .then(
      function(data) {
        const incDec_Length_Except_Sum = data.body__items__item__incDec.data.length-1;
        const gubun_Length_Except_Sum = data.body__items__item__gubun.data.length-1;

        let df = new dfd.DataFrame(
          {Price: data.body__items__item__incDec.data.slice(0,incDec_Length_Except_Sum)},   //표의 맨 아래 합계를 제거한 내용들
          { index: data.body__items__item__gubun.data.slice(0,gubun_Length_Except_Sum)}
        )
        df.plot("bar_div").bar()
      }
    )
    .catch(() => {
      alert('저장된 데이터 이외의 날짜를 클릭했습니다.');
    })
});

Cancel_Plot_Button.addEventListener('click',function(){
  if(document.getElementById('plot_div').childNodes[0]==undefined){
    alert('삭제할 내용이 없어');
    return 0;
  }

  let chart = confirm("원 차트를 지우겠습니까?");
  if (chart == false)
    alert('지우기 취소')
  else
    document.getElementById('plot_div').childNodes[0].remove();
})

Cancel_Bar_Button.addEventListener('click',function(){
  if(document.getElementById('bar_div').childNodes[0]==undefined){
    alert('삭제할 내용이 없어');
    return 0;
  }

  let chart = confirm("막대 차트를 지우겠습니까?");
  if(chart == false)
    alert('지우기 취소')
  else
    document.getElementById('bar_div').childNodes[0].remove();
})
