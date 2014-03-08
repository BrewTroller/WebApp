Brewtroller = {};
var host;
var username = "admin";
var password = "password";
var connected = false;
var lastUpdate = 0;
var storedHost;

//Map BTNic CGI Byte Codes to Human Readable Functions
var BTCMD_GetVersion = {
	reqCode: 'G',
	reqIndex: false,
	reqParams: [],
	rspCode: 'G',
	rspParams: [
		"responseCode",
		"btVersion",
		"build",
		"protocol",
		"schema",
		"metric"
	]
};

var BTCMD_SetAlarm = {
	reqCode: 'V',
	reqIndex: false,
	reqParams: ["alarmStatus"],
	rspCode: 'e',
	rspParams: [
		"responseCode",
		"alarmStatus"
	]
};

var BTCMD_SetTimerValue = {
    reqCode: 'Z',
    reqIndex: true,
    reqParams: ["TimerValue"],
    rspCode: 'o',
    rspParams: [
      "TimerValue",
      "Status"
    ]
  };

var BTCMD_StartTimer = {
    reqCode: 'Y',
    reqIndex: true,
    reqParams: ["TimerStatus"],
    rspCode: 'o',
    rspParams: [
      "responseCode",
      "TimerValue",
      "Status"
    ]
  };

var BTCMD_GetTimerStatus = {
    reqCode: 'o',
    reqIndex: true,
    reqParams: [],
    rspCode: 'o',
    rspParams: [
      "responseCode",
      "TimerValue",
      "TimerStatus"
    ]
  };

var BTCMD_GetProgram = {
	reqCode: '@',
	reqIndex: true,
	reqParams: [],
	rspCode: '@',
	rspParams: [
		"responseCode",
		"name",
		"batchVolume",
		"grainWeight",
		"mashRatio",
		"mashDoughIn_Temperature",
		"mashDoughIn_Minutes",
		"mashAcid_Temperature",
		"mashAcid_Minutes",
		"mashProtein_Temperature",
		"mashProtein_Minutes",
		"mashSacch_Temperature",
		"mashSacch_Minutes",
		"mashSacch2_Temperature",
		"mashSacch2_Minutes",
		"mashMashOut_Temperature",
		"mashMashOut_Minutes",
		"spargeTemperature",
		"hltTemperature",
		"boilMinutes",
		"pitchTemperature",
		"boilAdditions",
		"strikeHeatSource",
		"calcStrikeTemperature",
		"firstStepTemperature",
		"calcPreboilVolume",
		"calcStrikeVolume",
		"calcSpargeVolume",
		"calcGrainVolume",
		"calcGrainLiquorLoss"
	]
};

var BTCMD_GetStatus = {
	reqCode: 'a',
	reqIndex: false,
	reqParams: [],
	rspCode: 'a',
	rspParams: [
		"responseCode",
		"alarmStatus",
		"autoValveStatus",
		"profileStatus",
		"outputStatus",
		"HLT_Setpoint",
		"HLT_Temperature",
		"HLT_HeatPower",
		"HLT_TargetVolume",
		"HLT_Volume",
		"HLT_FlowRate",
		"Mash_Setpoint",
		"Mash_Temperature",
		"Mash_HeatPower",
		"Mash_TargetVolume",
		"Mash_Volume",
		"Mash_FlowRate",
		"Kettle_Setpoint",
		"Kettle_Temperature",
		"Kettle_HeatPower",
		"Kettle_TargetVolume",
		"Kettle_Volume",
		"Kettle_FlowRate",
		"Mash_TimerValue",
		"Mash_TimerStatus",
		"Boil_TimerValue",
		"Boil_TimerStatus",
		"Boil_ControlState",
		"ProgramThread1_Step",
		"ProgramThread1_Recipe",
		"ProgramThread2_Step",
		"ProgramThread2_Recipe",
	]
};

var BTCMD_SetSetpoint = {
    reqCode: 'X',
    reqIndex: true,
    reqParams: ["Setpoint"],
    rspCode: 't',
    rspParams: [
      "Setpoint"
    ]
  };

//Brewtroller Web Init
Brewtroller.init = function () {
  $('#button_connect').on("click", function() {
    Brewtroller.connected.click_buttonConnect();
    //Brewtroller.program.getProgramList();
  });
  $('#settingsSaveBtn').on("click", function() {
    Brewtroller.connected.saveConnectionSettings();
  });
  storedHost = localStorage.getItem('btHost');
  if (storedHost) {
    host = storedHost;
    $('#settingsHost').attr('placeholder', host);
  }
  
  Brewtroller.timer.setup();
  Brewtroller.temp.setup();
  //Brewtroller.connected.loop();
};

//Brewtroller Connected Functions

Brewtroller.connected = {
    click_buttonConnect : function () {
        if (connected) {
            connected = false;
            $("#button_connect").html("Connect");
            $("#button_connect").css('color', '#777777');
        } else {
            connected = true;
            Brewtroller.connected.loop();
            //Brewtroller.program.getProgramList();
        }
    },    
    loop : function () {
      if(connected == true) {
        Brewtroller.connected.checkWatchdog();
        brewTrollerExecCommand(BTCMD_GetStatus, null, {}, host, username, password, printUI);
        setTimeout(Brewtroller.connected.loop, 500);
      }
    },
    checkWatchdog : function () {
        var d = new Date();
        if (d.getTime() - lastUpdate > 1000) {
            
            $("#button_connect").html("Timeout");
            $("#button_connect").css('color', 'red');
            
        }
    },
    saveConnectionSettings : function () {
      host = $('#settingsHost').val();
      $('#settingsHost').text("host");
      localStorage.setItem('btHost',host);
    }
    
};

//Program Functions
Brewtroller.program = {
  getProgramList : function () {
    var programList = [];
    $i = 0;
    while($i < 20) {
      brewTrollerExecCommand(BTCMD_GetProgram, $i, null, host, username, password, function(data){
        $a = "werwe";
        array_push(programList, data.name);
        $i++;
      });
    }
  }  
};

//Timer Functions
Brewtroller.timer = {
  setup : function () {
    $('#mashTimerButton').on("click", function() {
      Brewtroller.timer.click_startTimer("mash");
    });
    $('#boilTimerButton').on("click", function() {
      Brewtroller.timer.click_startTimer("boil");
    });
    $.each([ 0 , 1 ], function( index, timerId ){ 
    if (timerId == 0) {vessel = "mash";};
    if (timerId == 1) {vessel = "boil";};
    brewTrollerExecCommand(BTCMD_GetTimerStatus, timerId, null, host, username, password, function(data){
      timerStatus = data.TimerStatus;
      if (timerStatus == "0") {
        $("#" + vessel + "TimerButton").text("Manual Start");
        Brewtroller.timer.printTimer();
      }else{
        $("#" + vessel + "TimerButton").text("Pause");
        Brewtroller.timer.printTimer();
      }
    });
    });
  },
  printTimer : function (id, value, status) {
    var rStatus;
    if(status == 0) {
        rStatus = "Off";
      }else{
        rStatus = "On";
      }
    $(id).html("Set Time: " + millisecondsToTime(value) + " seconds <br>Status: " + rStatus);
    },
    click_startTimer : function (vessel) {
      var timerStatus;
      var timerId = "";
      var setTime = "";
      var vessel = vessel;
      if (vessel == "mash") {
        timerId = 0;
      } else if (vessel="boil") {
        timerId = 1;
      }
      brewTrollerExecCommand(BTCMD_GetTimerStatus, timerId, null, host, username, password, function(data){
        timerStatus = data.TimerStatus;
        if (timerStatus == "0") {
          $timer = "werwe";
          brewTrollerExecCommand(BTCMD_StartTimer, timerId, {"TimerStatus": 1}, host, username, password, function(data){
          });
          $("#" + vessel + "TimerButton").text("Pause");
          Brewtroller.timer.printTimer("div_" + vessel + "Timer", "", "1");
        }else{
          $timer = "wwerwe";
          brewTrollerExecCommand(BTCMD_StartTimer, timerId, {"TimerStatus": 0}, host, username, password, function(data){
          });
          $("#" + vessel + "TimerButton").text("Manual Start");
          Brewtroller.timer.printTimer("div_" + vessel + "Timer", "", "0");
        }
      });
      
    }
};

//Temp Functions
Brewtroller.temp = {
    setup : function() {
      $('#hltTempSetBtn').on("click", function () {
        temp = $('#hltTempSet').val();
        Brewtroller.temp.setTemp(0, temp);
      });
      $('#mashTempSetBtn').on("click", function () {
        temp = $('#mashTempSet').val();
        Brewtroller.temp.setTemp(1, temp);
      });
    },
    setTemp : function (vessel, temp) {
            brewTrollerExecCommand(BTCMD_SetSetpoint, vessel, {"Setpoint":temp}, host, username, password, function(data){
      });
    }  
};

//Command Helper Functions
function brewTrollerExecCommand(cmdObj, index, params, host, user, pwd, callback){
	var command = cmdObj.reqCode;
	if (cmdObj.reqIndex) {
		command += index;
	}
	command += brewtrollerParseRequestParameters(cmdObj, params);
	$.ajax({
		url: "http://" + host + "/btnic.cgi",
//		beforeSend: function (xhr) {
//           if(user != null) {
//                xhr.withCredentials = true;
//                var tok = user + ':' + password;
//                var hash = btoa(tok);
//                xhr.setRequestHeader("Authorization", "Basic " + hash);
//           }
//		},
		data: command,
		dataType: "json",
		success:function(result){
			var object = brewTrollerParseResponse(result, cmdObj);
			callback(object);
			return object;
		},
		error: function(result) {
		}
	});
}

function brewtrollerParseRequestParameters(cmdObj, params) {
	var parameters = [];
	if (cmdObj.reqParams.length) {
		for (var i = 0; i < cmdObj.reqParams.length; i++) {
			parameters[i] = params[cmdObj.reqParams[i]];
		}
	}
	return (parameters.length ? "&" + parameters.join('&') : "");
}

function brewTrollerParseResponse(result, cmdObject)
{
	if (result[0][0] != cmdObject.rspCode) {
		var errorText;
		switch (result[0]) {
			case '!':
				errorText = "Bad Command";
				break;
			case '#':
				errorText = "Bad Parameter";
				break;
			case '$':
				errorText = "Bad Index";
				break;
			default:
				errorText = "Unknown response: " + result[0];
				break;
		}
		throw new Error("BrewTroller response error: " + errorText);
	}
	var returnObject;
	returnObject = {};
	for (var i = 0; i < cmdObject.rspParams.length; i++){
		returnObject[cmdObject.rspParams[i]] = result[i];
	}
	return returnObject;
};


function millisecondsToTime(milli)
{
      var milliseconds = milli % 1000;
      var seconds = Math.floor((milli / 1000) % 60);
      var minutes = Math.floor((milli / (60 * 1000)) % 60);

      return minutes + "m" + seconds + "s" + milliseconds + "ms";
};