Brewtroller = {};
var host;
var username = "admin";
var password = "password";
var connected = false;
var lastUpdate = 0;
var storedHost;
var programList = [];
var programStep1;
var programStep2;
var programName1;
var programName2;

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
			"H2OIn_Temperature",
			"H2OOut_Temperature",
			"WortOut_Temperature",
			"AUX1_Temperature",
			"AUX2_Temperature",
			"AUX3_Temperature",
			"Mash_TimerValue",
			"Mash_TimerStatus",
			"Boil_TimerValue",
			"Boil_TimerStatus",
			"Boil_ControlState",
			"ProgramThread1_Step",
	        "ProgramThread1_Name",
			"ProgramThread1_Recipe",
			"ProgramThread2_Step",
	        "ProgramThread2_Name",
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

var BTCMD_Reset = {
	    reqCode: 'c',
	    reqIndex: true,
	    reqParams: [],
	    rspCode: 'c',
	    rspParams: []
};
var BTCMD_StartStep = {
	    reqCode: 'U',
	    reqIndex: true,
	    reqParams: [
	                "0",
	                "1",
	                "2",
	                "3",
	                "4",
	                "5",
	                "6",
	                "7",
	                "8",
	                "9",
	                "10",
	                "11",
	                "12",
	                "13",
	                "14"
	                ],
	    rspCode: 'n',
	    rspParams: [
					"Fill",
					"Delay",
					"Preheat",
					"Grain In",
					"Refill",
					"Dough In",
					"Acid",
					"Protein",
					"Sacch",
					"Sacch2",
					"Mash Out",
					"Mash Hold",
					"Sparge",
					"Boil",
					"Chill"
	                ]
};

var BTCMD_NextStep = {
	    reqCode: 'S',
	    reqIndex: true,
	    reqParams: [],
	    rspCode: 'n',
	    rspParams: [
					"Fill",
					"Delay",
					"Preheat",
					"Grain In",
					"Refill",
					"Dough In",
					"Acid",
					"Protein",
					"Sacch",
					"Sacch2",
					"Mash Out",
					"Mash Hold",
					"Sparge",
					"Boil",
					"Chill"
	                ]
};

var BTCMD_GetActivePrograms = {
	    reqCode: 'n',
	    reqIndex: false,
	    reqParams: [],
	    rspCode: 'n',
	    rspParams: [
					"Response Code",
					"Program 1 Step",
					"Program 1 Number",
					"Program 2 Step",
					"Program 2 Number"
					]
};
var BTCMD_GetProgramList = {
	    reqCode: '%3e',
	    reqIndex: false,
	    reqParams: [],
	    rspCode: '>',
	    rspParams: [
					"Response Code",
					"Program1_Name",
					"Program2_Name",
					"Program3_Name",
					"Program4_Name",
					"Program5_Name",
					"Program6_Name",
					"Program7_Name",
					"Program8_Name",
					"Program9_Name",
					"Program10_Name",
					"Program11_Name",
					"Program12_Name",
					"Program13_Name",
					"Program14_Name",
					"Program15_Name",
					"Program16_Name",
					"Program17_Name",
					"Program18_Name",
					"Program19_Name"
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
  $('#button_reset').on("click", function() {
	Brewtroller.reset.resetPrograms(); 
  });
  $('#startBtn1').on("click", function () {
	var programRet = $('#recipeDetails table tbody tr:first-child td:nth-child(2)').text();
	var program = programRet.substr(1,1);
	Brewtroller.program.startStep(program, "0"); 
  });
  $('#startBtn2').on("click", function () {
	var programRet = $('#recipeDetails table tbody tr:first-child td:nth-child(2)').text();
	var program = programRet.substr(1,1);
	Brewtroller.program.startStep(program, "0"); 
  });
  $('#button_nextStep').on("click", function () {
	 Brewtroller.program.nextStep("1"); 
  });
  $('#getRecipeList').on("click", function () {
	 //Brewtroller.program.getProgramList();
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
            Brewtroller.program.getProgramList();
        }
    },    
    loop : function () {
      if(connected == true) {
        Brewtroller.connected.checkWatchdog();
        brewTrollerExecCommand(BTCMD_GetStatus, null, {}, host, username, password, Brewtroller.status.printUI);
        setTimeout(Brewtroller.connected.loop, 500);
        Brewtroller.status.updateStatusBar();
      }
    },
    checkWatchdog : function () {
        var d = new Date();
        if (d.getTime() - lastUpdate > 1000) {
            
            $("#button_connect").html("Timeout");
            $("#button_connect").css('color', 'red');
            
        }
    },
    connectWatchdog : function () {
    	var d = new Date();
        lastUpdate = d.getTime();
        $("#button_connect").css('color', '#777777');
        $("#button_connect").html("Disconnect");
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
    brewTrollerExecCommand(BTCMD_GetProgramList, null, null, host, username, password, function(data){
    	programList = data;
    	$.each(data, function(index,value) {
    		if (value != ">" && value != "") {
    			var recipeLine = '<tr><td class="text-muted">';
    			recipeLine += index;
    			recipeLine += '</td><td>';
    			recipeLine += value;
    			recipeLine += '</td><td><button id="';
    			recipeLine += index;
    			recipeLine += '1" type="button" class="btn btn-default" data-dismiss="modal">Start Program 1</button>';
    			recipeLine += '</td><td><button id="';
    			recipeLine += index;
    			recipeLine += '2" type="button" class="btn btn-default" data-dismiss="modal">Start Program 2</button>';
    			recipeLine += '</td></tr>';
    			recipeBtnId1 = index + "1";
    			recipeBtnId2 = index + "2";
    			recipeId = index.substring(7,9);
    			if (recipeId.substring(1) === "_") {
    				recipeId = recipeId.substring(0,1);
    			}
    			$('#recipeDetails table tbody').append(recipeLine);
    			$('#' + recipeBtnId1).on("click", function () {
    				Brewtroller.program.startStep(recipeId, "0"); 
    			  });
    			$('#' + recipeBtnId2).on("click", function () {
    				Brewtroller.program.startStep(recipeId, "0"); 
    			  });
    		}
    	});
    });
  },
  getProgram : function (vessel) {
	$('#recipeDetails table tbody tr').remove();
	brewTrollerExecCommand(BTCMD_GetProgram, vessel, null, host, username, password, function(data){
	$.each(data, function( index, value ) {
		$('#recipeDetails table tbody').append('<tr><td class="text-muted">' + index + '</td><td>' + value + "</td></tr>");
	});
	});
  },
  getProgramName : function (vessel) {
		brewTrollerExecCommand(BTCMD_GetProgram, vessel, null, host, username, password, function(data){
		return data["name"];
		});
	  },
  startStep : function (program, step) {
	  brewTrollerExecCommand(BTCMD_StartStep, program, step, host, username, password, function(data){});
  },
  nextStep : function (program) {
	  brewTrollerExecCommand(BTCMD_GetStatus, null, {}, host, username, password, function(data){
	  var program1currStep = data["ProgramThread1_Step"];
	  var program2currStep = data["ProgramThread2_Step"];
	  if (program = "0") {
		  if (program1currStep != "255") {
			  brewTrollerExecCommand(BTCMD_NextStep, program1currStep, null, host, username, password, function(data){});
		  }
	  }else{
		  if (program2currStep != "255") {
			  brewTrollerExecCommand(BTCMD_NextStep, program2currStep, null, host, username, password, function(data){});	  
		  }
	  }
	});
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

//Reset Functions
Brewtroller.reset = {
	resetPrograms : function() {
		brewTrollerExecCommand(BTCMD_Reset, "0", null, host, username, password, function(data){
	    });
	}
}

//Status Functions
Brewtroller.status = {
	updateStatusBar : function () {
		$('#program1Name').html(programName1);
		$('#program2Name').html(programName2);
		$('#currStatusProg1').html(Brewtroller.status.translateStepCode(programStep1));
		$('#currStatusProg2').html(Brewtroller.status.translateStepCode(programStep2));
	},
	translateStepCode : function (step) {
		var stepTranslate = {
							"0": "Fill",
							"1": "Delay",
							"2": "Preheat",
							"3": "Grain In",
							"4": "Refill",
							"5": "Dough In",
							"6": "Acid",
							"7": "Protein",
							"8": "Sacch",
							"9": "Sacch2",
							"10": "Mash Out",
							"11":"Mash Hold",
							"12": "Sparge",
							"13": "Boil",
							"14": "Chill",
							"255": "Idle"
							}
		return stepTranslate[step];
	},
	printUI : function (data) {
		programName1 = data["ProgramThread1_Name"];
		programName2 = data["ProgramThread2_Name"];
		programStep1 = data["ProgramThread1_Step"];
		programStep2 = data["ProgramThread2_Step"];
		$("#div_status").html("<pre>" + JSON.stringify(data, null, '\t') + "</pre>");
        printProgramThread("#div_programThread1", data.ProgramThread1_Step, data.ProgramThread1_Recipe);
        printProgramThread("#div_programThread2", data.ProgramThread2_Step, data.ProgramThread2_Recipe);
        Brewtroller.timer.printTimer("#div_mashTimer", data.Mash_TimerValue, data.Mash_TimerStatus);
        Brewtroller.timer.printTimer("#div_boilTimer", data.Boil_TimerValue, data.Boil_TimerStatus);
        printAlarm("#button_alarm", data.alarmStatus);
        printTemperature("#div_hltTemperature", data.HLT_Temperature);
        printSetpoint("#div_hltSetpoint", data.HLT_Setpoint);
        printHeatPower("#div_hltHeatPower", data.HLT_HeatPower);
		printVolume("#div_hltVolume", data.HLT_Volume);
		printTargetVolume("#div_hltTargetVolume", data.HLT_TargetVolume);
		printFlowRate("#div_hltFlowRate", data.HLT_FlowRate);
        printTemperature("#div_mashTemperature", data.Mash_Temperature);
        printSetpoint("#div_mashSetpoint", data.Mash_Setpoint);
        printHeatPower("#div_mashHeatPower", data.Mash_HeatPower);
		printVolume("#div_mashVolume", data.Mash_Volume);
		printTargetVolume("#div_mashTargetVolume", data.Mash_TargetVolume);
		printFlowRate("#div_mashFlowRate", data.Mash_FlowRate);
        printTemperature("#div_kettleTemperature", data.Kettle_Temperature);
        printSetpoint("#div_kettleSetpoint", data.Kettle_Setpoint);
        printHeatPower("#div_kettleHeatPower", data.Kettle_HeatPower);
		printVolume("#div_kettleVolume", data.Kettle_Volume);
		printTargetVolume("#div_kettleTargetVolume", data.Kettle_TargetVolume);
		printFlowRate("#div_kettleFlowRate", data.Kettle_FlowRate);
		printBoilControl("#div_boilControl", data.Boil_ControlState);
	    printOutputProfiles("#div_outputProfiles", data.profileStatus);
		printOutputStatus("#div_outputStatus", data.outputStatus);
        Brewtroller.connected.connectWatchdog();
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