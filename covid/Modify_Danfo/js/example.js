$(document).ready(function () {
  $("#xmlToJSON").click(function () {
    var data = $("#xmlString").val();
    console.log(data);
    var xmlData = "";
    if (data !== null && data.trim().length !== 0) {
      try {
        xmlData = $.parseXML(data);
      } catch (e) {
        throw e;
      }
      var x2js = new X2JS();
      data = x2js.xml2json(xmlData);
      console.log(data);
    }
  });
});

$.ajax({
  type: "GET",
  url: `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=u%2BXsTVV1nl13bsl5mxFNCaZ0o48loSbVj4pQoNm2xFONwLswAgYcNrabZ9jBp7mIdKQZSgYV7NBAjOyHH6cr%2Fg%3D%3D&startCreateDt=20201231&endCreateDt=20201231`,
  data: {},
  success: function(response) {
    console.log('?')
  }
})
