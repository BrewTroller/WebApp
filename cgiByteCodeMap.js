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
var BTCMD_SetBoilControl = {
	      reqCode: '%7d',
	      reqIndex: false,
	      reqParams: [
	                  "Kettle_Off",
	                  "Auto_Boil",
	                  "Manual_Boil"
	                  ],
	      rspCode: '~',
	      rspParams: [
					   "Kettle_Off",
					   "Auto_Boil",
					   "Manual_Boil"
					 ]
	};