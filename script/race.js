$(document).ready(function(){
   getTime();
   
   function getTime() {
       var date = new Date();
       var hour = date.getHours();
       var minute = date.getMinutes().toString();
       var second = date.getSeconds().toString();
       var day = '';
       (hour < 12 ) ? day = 'AM' : day = 'PM';
       (hour === 0) ? hour = 12 : hour;
       (hour > 12) ? hour = hour - 12 : hour;
       if(minute.length == 1){minute = '0' + minute}
       if(second.length == 1){second = '0' + second}
       $('#updateTime').html(hour + ':' + minute + ':' + second + ' ' + day)
   }
});