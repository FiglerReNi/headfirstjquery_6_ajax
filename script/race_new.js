$(document).ready(function(){

    var repeat = true;
    var FREQ = 10000;

    function startAjaxCalls(){
        if(repeat) {
            setTimeout(function () {
                startAjaxCalls();
                getXMLRacers();
            }, FREQ)
        }
    }

    function getXMLRacers() {
        $.ajax({
            url: "race.xml",
            cache: false,
            dataType: "xml",
            success: function (xml) {
                $('#male_all').empty();
                $('#female_all').empty();
                $('#finishers_all').empty();
                $(xml).find('runner').each(function(){
                    var info = "<li>Name: " + $(this).find('fname').text() + " " + $(this).find('lname').text() + ". Time: " + $(this).find('time').text() + "</li>";
                    if($(this).find('gender').text() == 'm'){
                        $('#male_all').append(info);
                    }
                    else{
                        $('#female_all').append(info);
                    }
                    $('#finishers_all').append(info);
                });
                getTime();
            }
        });
    }

    //with php
    function getTime(){
        $('#updateTime').load("race_new.php");
    }

    // with javascript
    // function getTime() {
    //     var date = new Date();
    //     var hour = date.getHours();
    //     var minute = date.getMinutes().toString();
    //     var second = date.getSeconds().toString();
    //     var day = '';
    //     (hour < 12 ) ? day = 'AM' : day = 'PM';
    //     (hour === 0) ? hour = 12 : hour;
    //     (hour > 12) ? hour = hour - 12 : hour;
    //     if(minute.length == 1){minute = '0' + minute}
    //     if(second.length == 1){second = '0' + second}
    //     $('#updateTime').html(hour + ':' + minute + ':' + second + ' ' + day)
    // }

    function showFrequency(){
        $('#freq').html('Page refreshes every ' + FREQ/1000 + " second(s)!")
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

    showFrequency();
    getXMLRacers();
    startAjaxCalls();
});

//setInterval - csak rendszeresen ismétlődő időzítésre jó, és akor is újra hívja a functiont, ha az első kör még nem is fejeződött be,
//              de letelt az idő. Így jelen esetben ne lesz jó. Ha user input is van, vagy külső fájl nem használjuk.

//self-referencing functions
/*A self-referencing function calls itself during its normal operations. Such functions can be particularly
useful when you need to wait for the function’s currently running operation to complete before running
it again.
Combine this with a setTimeout call, and you can schedule a function to run but only keep
going if the previous call to the function was successful.
 */