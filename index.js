var five = require('johnny-five');
var board = new five.Board();

var minutes, hours, i;

//The pins for the LEDs that shows the minutes
var minuteLedPins = [8, 9, 10, 11, 12, 13];
//The pins for the LEDs that shows the hours
var hourLedPins = [3, 5, 6, 7];

var iterateLEDs = function(timeArray, LedArray) {
    for(i = 0; i < timeArray.length; i++) {
      //Start reverse
      var j = (timeArray.length -1) - i;
      
      //Check if the LED exists
      if(LedArray[i]) {
        //LED on?
        if(timeArray[j] && timeArray[j] == '1') {
          LedArray[i].on();
        //or off?
        } else {
          LedArray[i].off();
        }
      }
    }
};

board.on('ready', function () {
  
  var minuteLed = [],
      hourLed = [],
      led;
  
  //Initalize the LEDs for the minutes
  for(i = 0; i < minuteLedPins.length; i++) {
    led = new five.Led(minuteLedPins[i]);
    minuteLed.push(led);
  }
  
  //Initalize the LEDs for the hours
  for(i = 0; i < hourLedPins.length; i++) {
    led = new five.Led(hourLedPins[i]);
    hourLed.push(led);
  }

  //Update the watch every second
  setInterval(function() {
    //Get the current minutes
    minutes = new Date(Date.now()).getMinutes();
    hours = new Date(Date.now()).getHours();
    //Convert to 12 hour format
    if(hours > 12) {
      hours = hours - 12;
    }
    //console.log('Current Time %d : %d', hours, minutes);

    //Convert to binary and get as array
    minutes = ('000000' + minutes.toString(2)).split('');
    hours = ('0000' + hours.toString(2)).split('');

    //Go over the array and set LEDs
    iterateLEDs(minutes, minuteLed);
    iterateLEDs(hours, hourLed);
  }, 1000);
});