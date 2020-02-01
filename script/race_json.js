$(document).ready(function(){

    var repeat = true;
    var FREQ = 10000;

    function startAjaxCalls(){
        if(repeat) {
            setTimeout(function () {
                startAjaxCalls();
                getDbRacers();
            }, FREQ)
        }
    }
 
   function getDbRacers() {
       $.getJSON("race_json.php?action=getRunners", function(json){
           if(json.length > 0){
               $('#finishers_all').empty();
               $('#female_all').empty();
               $('#male_all').empty();
               $.each(json, function () {
                   var text = 'Name: ' + this['first_name'] + ' ' + this['last_name'] + ': ' + this['finish_time'] + '</br>';
                   if(this['gender'] === 'm'){
                       $('#male_all').append(text);
                   }
                   else if(this['gender'] === 'f'){
                       $('#female_all').append(text);
                   }
                   $('#finishers_all').append(text);
               })
           }
       });
       getTime();
   }

    function getTime(){
        $('#updateTime').load("race_new.php");
    }

    function showFrequency(){
        $('#freq').html('Page refreshes every ' + FREQ/1000 + " second(s)!")
    }

    function clearInputs(){
        $('#addRunner :input').each(function () {
            $(this).val("");
        })
    }

    $("#updateStop").click(function(){
        repeat = false;
        $('#freq').html("Updates paused!");
    });

    $("#updateStart").click(function(){
        repeat = true;
        startAjaxCalls();
        showFrequency();
    });

    $('#addRunner').submit(function(){
        return false;
    });

    $("#btnSave").click(function () {
        var data = $("#addRunner").serializeArray();
        $.post($('#addRunner').attr('action'), data, function(json){
            if(json.status === 'fail'){
                alert(json.message);
            }
            if(json.status === 'success'){
                alert(json.message);
                clearInputs();
            }
        }, "json")
    });

    showFrequency();
    getDbRacers();;
    startAjaxCalls();
});