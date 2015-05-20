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
      "Program1_Step",
      "Program1_Name",
      "Program1_Number",
      "Program2_Step",
      "Program2_Name",
      "Program2_Number"
//      "Mash_Zone_Active_Program_Step",
//      "Mash_Zone_Active_Program_Recipe",
//      "Boil_Zone_Active_Program_Step",
//      "Boil_Zone_Active_Program_Recipe"
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
                  "Program_Index"
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
          "Response_Code",
          "Program_1_Step",
          "Program_1_Number",
          "Program_2_Step",
          "Program_2_Number"
          ]
};
var BTCMD_GetProgramList = {
      reqCode: '%3e',
      reqIndex: false,
      reqParams: [],
      rspCode: '>',
      rspParams: [
          "Response_Code",
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
          "Program19_Name",
          "Program20_Name"
          ]
};
var BTCMD_SetBoilControl = {
	      reqCode: '%7d',
	      reqIndex: false,
	      reqParams: [
	                  "Control_Mode",
	                  "Percentage",
	                  ],
	      rspCode: '~',
	      rspParams: [
					   "Control_Mode",
					   "Percentage",
					 ]
	};
var BTCMD_SetProgramName = {
	      reqCode: '%5C',
	      reqIndex: true,
	      reqParams: [
	                  "Program_Name"
	                  ],
	      rspCode: '[',
	      rspParams: [
					   "Program_Name"
					 ]
	};
var BTCMD_SetProgramMashTemps = {
	      reqCode: '^',
	      reqIndex: true,
	      reqParams: [
	                  "Dough_In_Temp",
	                  "Acid_Temp",
	                  "Protein_Temp",
	                  "Sacch_Temp",
	                  "Sacch2_Temp",
	                  "Mash_Out_Temp"
	                  ],
	      rspCode: ']',
	      rspParams: [
						"Dough_In_Temp",
						"Acid_Temp",
						"Protein_Temp",
						"Sacch_Temp",
						"Sacch2_Temp",
						"Mash_Out_Temp"
					 ]
	};
var BTCMD_SetProgramMashMins = {
	      reqCode: '`',
	      reqIndex: true,
	      reqParams: [
	                  "Dough_In_Mins",
	                  "Acid_Mins",
	                  "Protein_Mins",
	                  "Sacch_Mins",
	                  "Sacch2_Mins",
	                  "Mash_Out_Mins"
	                  ],
	      rspCode: '_',
	      rspParams: [
	                  "Dough_In_Mins",
	                  "Acid_Mins",
	                  "Protein_Mins",
	                  "Sacch_Mins",
	                  "Sacch2_Mins",
	                  "Mash_Out_Mins"
					 ]
	};
var BTCMD_SetProgramVolumes = {
	      reqCode: 'y',
	      reqIndex: true,
	      reqParams: [
	                  "Batch_Volume",
	                  "Grain_Weight",
	                  "Mash_Ratio"
	                  ],
	      rspCode: 'x',
	      rspParams: [
	                  "Batch_Volume",
	                  "Grain_Weight",
	                  "Mash_Ratio"
					 ]
	};
var BTCMD_SetProgramSettings = {
	      reqCode: 'O',
	      reqIndex: true,
	      reqParams: [
	                  "Sparge_Temp",
	                  "HLT_Setpoint",
	                  "Boil_Mins",
	                  "Pitch_Temp",
	                  "Boil_Additions",
	                  "Mash_Liquor_Heat_Source"
	                  ],
	      rspCode: 'E',
	      rspParams: [
	                  "Sparge_Temp",
	                  "HLT_Setpoint",
	                  "Boil_Mins",
	                  "Pitch_Temp",
	                  "Boil_Additions",
	                  "Mash_Liquor_Heat_Source"
	                  ]
	};

var BTCMD_SetProgram = {
	      reqCode: '%3F',
	      reqIndex: true,
	      reqParams: [
		            "name",
	                "Batch_Volume",
	                "Grain_Weight",
	                "Mash_Ratio",
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
	                "Sparge_Temp",
	                "HLT_Setpoint",
	                "Boil_Mins",
	                "Pitch_Temp",
	                "Boil_Additions",
	                "Mash_Liquor_Heat_Source"
	                  ],
          rspCode: '@',
          rspParams: [
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
                "Sparge_Temp",
                "HLT_Setpoint",
                "Boil_Mins",
                "Pitch_Temp",
                "Boil_Additions",
                "Mash_Liquor_Heat_Source",
	            "calcStrikeTemperature",
	            "firstStepTemperature",
	            "calcPreboilVolume",
	            "calcStrikeVolume",
	            "calcSpargeVolume",
	            "calcGrainVolume",
	            "calcGrainLiquorLoss"
          ]
	};

var BTCMD_GetValveProfileConfig = {
	reqCode: 'd',
	reqIndex: true,
	reqParams: [],
	rspCode: 'd',
	rspParams: [
	            "Response_Code",
	            "Valves"
	            ]
	};

var BTCMD_SetValveProfileConfig = {
		reqCode: 'Q',
		reqIndex: true,
		reqParams: [
		            "Valve_Bits"
		            ],
		rspCode: 'd',
		rspParams: [
		            "Response_Code",
		            "Valves"
		            ]
	};