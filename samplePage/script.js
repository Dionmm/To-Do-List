'use strict';
$(document).ready(function(){

  $("#butt").on("click", function(){

    $.ajax({
      url: window.location+"users",
      dataType: "json",
      success: function(data){
        $("#requestResult").append("<p>Project manager: <b>"+data.Project_manager+"</b><br><br>Frontend: <b>"+data.Frontend+"</b><br><br>Backend: <b>"+data.Backend[0]+", "+data.Backend[1]+"</b></p>")
      },
      error: function(data) {
        console.log("ERROR");
        console.log(data);
      }
    });
  });
});
