//Map BTNic CGI Byte Codes to Human Readable Functions
var BTCMD_GetVersion = {
    reqCode : "G",
    reqIndex : false,
    reqParams : [],
    rspCode : "G",
    rspParams : [
            "responseCode", "btVersion", "build", "protocol", "schema", "metric"
    ]
};

var BTCMD_SetAlarm = {
    reqCode : "V",
    reqIndex : false,
    reqParams : [
        "alarmStatus"
    ],
    rspCode : "e",
    rspParams : [
            "responseCode", "alarmStatus"
    ]
};

var BTCMD_SetTimerValue = {
    reqCode : "Z",
    reqIndex : true,
    reqParams : [
        "TimerValue"
    ],
    rspCode : "o",
    rspParams : [
            "TimerValue", "Status"
    ]
};

var BTCMD_StartTimer = {
    reqCode : "Y",
    reqIndex : true,
    reqParams : [
        "TimerStatus"
    ],
    rspCode : "o",
    rspParams : [
            "responseCode", "TimerValue", "Status"
    ]
};

var BTCMD_GetTimerStatus = {
    reqCode : "o",
    reqIndex : true,
    reqParams : [],
    rspCode : "o",
    rspParams : [
            "responseCode", "TimerValue", "TimerStatus"
    ]
};

var BTCMD_GetProgram = {
    reqCode : "@",
    reqIndex : true,
    reqParams : [],
    rspCode : "@",
    rspParams : [
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
    reqCode : "a",
    reqIndex : false,
    reqParams : [],
    rspCode : "a",
    rspParams : [
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
            //                  "H2OIn_Temperature",
            //                  "H2OOut_Temperature",
            //                  "WortOut_Temperature",
            //                  "AUX1_Temperature",
            //                  "AUX2_Temperature",
            //                  "AUX3_Temperature",
            "Mash_TimerValue",
            "Mash_TimerStatus",
            "Boil_TimerValue",
            "Boil_TimerStatus",
            "Boil_ControlState",
            //                  "Program1_Step",
            //                  "Program1_Name",
            //                  "Program1_Number",
            //                  "Program2_Step",
            //                  "Program2_Name",
            //                  "Program2_Number"
            "Mash_Zone_Active_Program_Step",
            "Mash_Zone_Active_Program_Recipe",
            "Boil_Zone_Active_Program_Step",
            "Boil_Zone_Active_Program_Recipe"
    ]
};

var BTCMD_SetSetpoint = {
    reqCode : "X",
    reqIndex : true,
    reqParams : [
        "Setpoint"
    ],
    rspCode : "t",
    rspParams : [
        "Setpoint"
    ]
};

var BTCMD_Reset = {
    reqCode : "c",
    reqIndex : true,
    reqParams : [],
    rspCode : "c",
    rspParams : []
};
var BTCMD_StartStep = {
    reqCode : "U",
    reqIndex : true,
    reqParams : [
        "Program_Index"
    ],
    rspCode : "n",
    rspParams : [
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
    reqCode : "S",
    reqIndex : true,
    reqParams : [],
    rspCode : "n",
    rspParams : [
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
    reqCode : "n",
    reqIndex : false,
    reqParams : [],
    rspCode : "n",
    rspParams : [
            "Response_Code", "Program_1_Step", "Program_1_Number", "Program_2_Step", "Program_2_Number"
    ]
};
var BTCMD_GetProgramList = {
    reqCode : "%3e",
    reqIndex : false,
    reqParams : [],
    rspCode : ">",
    rspParams : [
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
    reqCode : "%7d",
    reqIndex : false,
    reqParams : [
            "Control_Mode", "Percentage",
    ],
    rspCode : "~",
    rspParams : [
            "Control_Mode", "Percentage",
    ]
};
var BTCMD_SetProgramName = {
    reqCode : "%5C",
    reqIndex : true,
    reqParams : [
        "Program_Name"
    ],
    rspCode : "[",
    rspParams : [
        "Program_Name"
    ]
};
var BTCMD_SetProgramMashTemps = {
    reqCode : "^",
    reqIndex : true,
    reqParams : [
            "Dough_In_Temp", "Acid_Temp", "Protein_Temp", "Sacch_Temp", "Sacch2_Temp", "Mash_Out_Temp"
    ],
    rspCode : "]",
    rspParams : [
            "Dough_In_Temp", "Acid_Temp", "Protein_Temp", "Sacch_Temp", "Sacch2_Temp", "Mash_Out_Temp"
    ]
};
var BTCMD_SetProgramMashMins = {
    reqCode : "`",
    reqIndex : true,
    reqParams : [
            "Dough_In_Mins", "Acid_Mins", "Protein_Mins", "Sacch_Mins", "Sacch2_Mins", "Mash_Out_Mins"
    ],
    rspCode : "_",
    rspParams : [
            "Dough_In_Mins", "Acid_Mins", "Protein_Mins", "Sacch_Mins", "Sacch2_Mins", "Mash_Out_Mins"
    ]
};
var BTCMD_SetProgramVolumes = {
    reqCode : "y",
    reqIndex : true,
    reqParams : [
            "Batch_Volume", "Grain_Weight", "Mash_Ratio"
    ],
    rspCode : "x",
    rspParams : [
            "Batch_Volume", "Grain_Weight", "Mash_Ratio"
    ]
};
var BTCMD_SetProgramSettings = {
    reqCode : "O",
    reqIndex : true,
    reqParams : [
            "Sparge_Temp", "HLT_Setpoint", "Boil_Mins", "Pitch_Temp", "Boil_Additions", "Mash_Liquor_Heat_Source"
    ],
    rspCode : "E",
    rspParams : [
            "Sparge_Temp", "HLT_Setpoint", "Boil_Mins", "Pitch_Temp", "Boil_Additions", "Mash_Liquor_Heat_Source"
    ]
};

var BTCMD_SetProgram = {
    reqCode : "%3F",
    reqIndex : true,
    reqParams : [
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
    rspCode : "@",
    rspParams : [
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
    reqCode : "d",
    reqIndex : true,
    reqParams : [],
    rspCode : "d",
    rspParams : [
            "Response_Code", "Valves"
    ]
};

var BTCMD_SetValveProfileConfig = {
    reqCode : "Q",
    reqIndex : true,
    reqParams : [
        "Valve_Bits"
    ],
    rspCode : "d",
    rspParams : [
            "Response_Code", "Valves"
    ]
};

// Unimplemented Command stubs

/**
 * ?, @
 * %3f, %40
 */
var BTCMD_SetProgramSettings = {
    reqCode : "%3f",
    reqIndex : true,
    reqParams : [
            "Program Name",
            "Batch Volume (thousandths of gal/l)",
            "Grain Weight (thousandths of lb/kg)",
            "Mash Ratio (hundreths of lbs/kg per qt/l, 0 = No Sparge)",
            "Dough In Temperature",
            "Dough in Minutes",
            "Acid Temperature",
            "Acid Minutes",
            "Protein Temperature",
            "Protein Minutes",
            "Sacch Temperature",
            "Sacch Minutes",
            "Sacch2 Temperature",
            "Sacch2 Minutes",
            "Mashout Temperature",
            "Mashout Minutes",
            "Sparge_Temp",
            "HLT_Setpoint",
            "Boil_Mins",
            "Pitch_Temp",
            "Boil_Additions",
            "Mash_Liquor_Heat_Source"
    ],
    rspCode : "%40",
    rspParams : [
            "Program Name",
            "Batch Volume (thousandths of gal/l)",
            "Grain Weight (thousandths of lb/kg)",
            "Mash Ratio (hundreths of lbs/kg per qt/l, 0 = No Sparge)",
            "Dough In Temperature",
            "Dough in Minutes",
            "Acid Temperature",
            "Acid Minutes",
            "Protein Temperature",
            "Protein Minutes",
            "Sacch Temperature",
            "Sacch Minutes",
            "Sacch2 Temperature",
            "Sacch2 Minutes",
            "Mashout Temperature",
            "Mashout Minutes",
            "Sparge Temp",
            "HLT Setpoint",
            "Boil Mins",
            "Pitch Temp",
            "Boil Additions (Bit Mask)",
            "Mash Liquor Heat Source (0=HLT, 1=Mash)"
    ]

};

/* @, @
 * %40, %40
 */
var BTCMD_GetProgramSettings = {
    reqCode : "%40",
    reqIndex : false,
    reqParams : [],
    rspCode : "%40",
    rspParams : [
            "Program Name",
            "Batch Volume (thousandths of gal/l)",
            "Grain Weight (thousandths of lb/kg)",
            "Mash Ratio (hundreths of lbs/kg per qt/l, 0 = No Sparge)",
            "Dough In Temperature",
            "Dough in Minutes",
            "Acid Temperature",
            "Acid Minutes",
            "Protein Temperature",
            "Protein Minutes",
            "Sacch Temperature",
            "Sacch Minutes",
            "Sacch2 Temperature",
            "Sacch2 Minutes",
            "Mashout Temperature",
            "Mashout Minutes",
            "Sparge Temp",
            "HLT Setpoint",
            "Boil Mins",
            "Pitch Temp",
            "Boil Additions (Bit Mask)",
            "Mash Liquor Heat Source (0=HLT, 1=Mash)"
    ]
};
var BTCMD_GetBoilTemperature = {
    reqCode : "A",
    reqIndex : false,
    reqParams : [],
    rspCode : "A",
    rspParams : [
        "Boil Temperature"
    ]
};
var BTCMD_GetVolumeCalibrations = {
    reqCode : "B",
    reqIndex : true,
    reqParams : [],
    rspCode : "B",
    rspParams : [
            "Volume", "Value"
    ]

};
var BTCMD_GetEvaporationRate = {
    reqCode : "C",
    reqIndex : false,
    reqParams : [],
    rspCode : "C",
    rspParams : [
        "Rate"
    ]

};
var BTCMD_GetOutputSettings = {
    reqCode : "D",
    reqIndex : true,
    reqParams : [],
    rspCode : "D",
    rspParams : [
            "Mode (0=On/Off, 1=PID)",
            "PID Cycle (In seconds)",
            "PID P Gain (0-255)",
            "PID I Gain (0-255)",
            "PID D Gain (0-255)",
            "Hysteresis (In tenths of degrees) if Vessel = 0-2 or Steam Zero if Vessel = 3",
            "Steam Target Pressure (Vessel = 3 Only; Otherwise blank)",
            "Steam Pressure Sensor Sensitivity (Vessel = 3 Only; Otherwise blank)"
    ]

};
var BTCMD_GetTemperatureSensorAddress = {
    reqCode : "F",
    reqIndex : true,
    reqParams : [],
    rspCode : "F",
    rspParams : [
            "Byte 0 (0-255)",
            "Byte 1 (0-255)",
            "Byte 2 (0-255)",
            "Byte 3 (0-255)",
            "Byte 4 (0-255)",
            "Byte 5 (0-255)",
            "Byte 6 (0-255)",
            "Byte 7 (0-255)"
    ]
};
var BTCMD_GetVersionInformation = {
    reqCode : "G",
    reqIndex : false,
    reqParams : [],
    rspCode : "G",
    rspParams : [
            "Version String", "Build Number"
    ]
};
var BTCMD_GetVolumeSettings = {
    reqCode : "H",
    reqIndex : false,
    reqParams : [],
    rspCode : "H",
    rspParams : [
            "Capacity", "Dead Space"
    ]
};
var BTCMD_InitializeEeprom = {
    reqCode : "I",
    reqIndex : false,
    reqParams : [],
    rspCode : "I",
    rspParams : []
};
var BTCMD_ScanforTemperatureSensor = {
    reqCode : "J",
    reqIndex : false,
    reqParams : [],
    rspCode : "J",
    rspParams : [
            "Byte 1 (0-255)",
            "Byte 2 (0-255)",
            "Byte 3 (0-255)",
            "Byte 4 (0-255)",
            "Byte 5 (0-255)",
            "Byte 6 (0-255)",
            "Byte 7 (0-255)",
            "Byte 8 (0-255)"
    ]
};
var BTCMD_SetBoilTemperature = {
    reqCode : "K",
    reqIndex : false,
    reqParams : [
        "Temperature"
    ],
    rspCode : "K",
    rspParams : [
        "Temperature"
    ]
};
var BTCMD_SetVolumeCalibration = {
    reqCode : "L",
    reqIndex : true,
    reqParams : [
            "Calibration Volume", "Calibration Value"
    ],
    rspCode : "B",
    rspParams : [
            "Calibration Volume", "Calibration Value"
    ]
};

var BTCMD_SetEvaporationRate = {
    reqCode : "M",
    reqIndex : false,
    reqParams : [
        "Rate (Percentage per hour 0-100)"
    ],
    rspCode : "C",
    rspParams : [
        "Rate (Percentage per hour 0-100)"
    ]
};
var BTCMD_SetOutputSettings = {
    reqCode : "N",
    reqIndex : true,
    reqParams : [
            "Mode (0=On/Off, 1=PID)",
            "PID Cycle (In seconds)",
            "PID P Gain (0-255)",
            "PID I Gain (0-255)",
            "PID D Gain (0-255)",
            "Hysteresis (In tenths of degrees) if Vessel = 0-2 or Steam Zero if Vessel = 3",
            "Steam Target Pressure (Vessel = 3 Only; Otherwise blank)",
            "Steam Pressure Sensor Sensitivity (Vessel = 3 Only; Otherwise blank)"
    ],
    rspCode : "D",
    rspParams : [
            "Mode (0=On/Off, 1=PID)",
            "PID Cycle (In seconds)",
            "PID P Gain (0-255)",
            "PID I Gain (0-255)",
            "PID D Gain (0-255)",
            "Hysteresis (In tenths of degrees) if Vessel = 0-2 or Steam Zero if Vessel = 3",
            "Steam Target Pressure (Vessel = 3 Only; Otherwise blank)",
            "Steam Pressure Sensor Sensitivity (Vessel = 3 Only; Otherwise blank)"
    ]
};

var BTCMD_SetTemperatureSensor = {
    reqCode : "P",
    reqIndex : false,
    reqParams : [
            "Byte 0 (0-255)",
            "Byte 1 (0-255)",
            "Byte 2 (0-255)",
            "Byte 3 (0-255)",
            "Byte 4 (0-255)",
            "Byte 5 (0-255)",
            "Byte 6 (0-255)",
            "Byte 7 (0-255)"
    ],
    rspCode : "F",
    rspParams : [
            "Byte 0 (0-255)",
            "Byte 1 (0-255)",
            "Byte 2 (0-255)",
            "Byte 3 (0-255)",
            "Byte 4 (0-255)",
            "Byte 5 (0-255)",
            "Byte 6 (0-255)",
            "Byte 7 (0-255)"
    ]
};
var BTCMD_SetValveProfileConfiguration = {
    reqCode : "Q",
    reqIndex : true,
    reqParams : [
        "Valve Bits (Decimal value representing a 32-bit mask representing the On/Off values of each valve in the profile)"
    ],
    rspCode : "d",
    rspParams : [
        "Valve Bits (Decimal value representing a 32-bit mask representing the On/Off values of each valve in the profile)"
    ]

};
var BTCMD_SetVolumeSettings = {
    reqCode : "R",
    reqIndex : true,
    reqParams : [
            "Capacity (In thousandths of Gallons/Litres)", "Dead Space (In thousandths of Gallons/Litres)"
    ],
    rspCode : "H",
    rspParams : [
            "Capacity (In thousandths of Gallons/Litres)", "Dead Space (In thousandths of Gallons/Litres)"
    ]
};
var BTCMD_AdvanceStep = {
    reqCode : "S",
    reqIndex : true,
    reqParams : [],
    rspCode : "n",
    rspParams : [
            "Fill (Active Program ID or 255 = Not Active)",
            "Delay (Active Program ID or 255 = Not Active)",
            "Preheat (Active Program ID or 255 = Not Active)",
            "Grain In (Active Program ID or 255 = Not Active)",
            "Refill (Active Program ID or 255 = Not Active)",
            "Dough In (Active Program ID or 255 = Not Active)",
            "Acid (Active Program ID or 255 = Not Active)",
            "Protein (Active Program ID or 255 = Not Active)",
            "Sacch (Active Program ID or 255 = Not Active)",
            "Sacch2 (Active Program ID or 255 = Not Active)",
            "Mash Out (Active Program ID or 255 = Not Active)",
            "Mash Hold (Active Program ID or 255 = Not Active)",
            "Sparge (Active Program ID or 255 = Not Active)",
            "Boil (Active Program ID or 255 = Not Active)",
            "Chill (Active Program ID or 255 = Not Active)"
    ]
};
var BTCMD_ExitStep = {
    //stopped here - problem with command numbering.
    reqCode : "T",
    reqIndex : true,
    reqParams : [],
    rspCode : "x",
    rspParams : [
            "Fill (Active Program ID or 255 = Not Active)",
            "Delay (Active Program ID or 255 = Not Active)",
            "Preheat (Active Program ID or 255 = Not Active)",
            "Grain In (Active Program ID or 255 = Not Active)",
            "Refill (Active Program ID or 255 = Not Active)",
            "Dough In (Active Program ID or 255 = Not Active)",
            "Acid (Active Program ID or 255 = Not Active)",
            "Protein (Active Program ID or 255 = Not Active)",
            "Sacch (Active Program ID or 255 = Not Active)",
            "Sacch2 (Active Program ID or 255 = Not Active)",
            "Mash Out (Active Program ID or 255 = Not Active)",
            "Mash Hold (Active Program ID or 255 = Not Active)",
            "Sparge (Active Program ID or 255 = Not Active)",
            "Boil (Active Program ID or 255 = Not Active)",
            "Chill (Active Program ID or 255 = Not Active)"
    ]
};
var BTCMD_SetAlarmStatus = {
    reqCode : "V",
    reqIndex : false,
    reqParams : [
        "Status"
    ],
    rspCode : "e",
    rspParams : [
        "Status"
    ]
};
var BTCMD_SetAutoValveStatus = {
    reqCode : "W",
    reqIndex : false,
    reqParams : [
        "Autovalve Bitmask"
    ],
    rspCode : "u",
    rspParams : [
        "Autovalve Bitmask"
    ]
};
var BTCMD_SetTimerStatus = {
    reqCode : "Z",
    reqIndex : true,
    reqParams : [
        "Timer Value (ms)"
    ],
    rspCode : "o",
    rspParams : [
            "Timer Value (ms)", "Timer Status (0 = Paused, 1 = Active)"
    ]
};
var BTCMD_SetValveProfileStatus = {
    reqCode : "b",
    reqIndex : false,
    reqParams : [
            "Profile Bitmask (Decimal value representing valve profiles to enable/disable)", "Value (0=Off/1=On)"
    ],
    rspCode : "w",
    rspParams : [
        "Profile Bitmask (Decimal value representing valve profiles to enable/disable)"
    ]
};
var BTCMD_GetValveProfileConfiguration = {
    reqCode : "d",
    reqIndex : true,
    reqParams : [],
    rspCode : "d",
    rspParams : [
        "Bitmask (4-Byte) representing Valves 1 - 32"
    ]
};
var BTCMD_GetAlarmStatus = {
    reqCode : "e",
    reqIndex : false,
    reqParams : [
        "Value"
    ],
    rspCode : "e",
    rspParams : [
        "Value"
    ]
};
var BTCMD_GetVolume = {
    reqCode : "p",
    reqIndex : true,
    reqParams : [
            "Value (Gallons/Litre)", "Flow rate (Gallons or litres per minute)"
    ],
    rspCode : "p",
    rspParams : [
            "Value (Gallons/Litre)", "Flow rate (Gallons or litres per minute)"
    ]
};
var BTCMD_GetTemperature = {
    reqCode : "q",
    reqIndex : true,
    reqParams : [],
    rspCode : "q",
    rspParams : [
        "Value"
    ]
};
var BTCMD_GetHeatOutputStatus = {
    reqCode : "s",
    reqIndex : true,
    reqParams : [],
    rspCode : "s",
    rspParams : [
        "Output Percentage (0=Off, 1-99=Variable, 100=On)"
    ]
};
var BTCMD_GetSetpoint = {
    reqCode : "t",
    reqIndex : true,
    reqParams : [
        "Vessel (0=HLT, 1=Mash, 2=Kettle)"
    ],
    rspCode : "t",
    rspParams : [
        "Setpoint"
    ]
};
var BTCMD_GetAutoValveStatus = {
    reqCode : "u",
    reqIndex : false,
    reqParams : [],
    rspCode : "u",
    rspParams : [
        "Autovalve Bitmask (Decimal value representing active autovalve logic)"
    ]
};
var BTCMD_GetValveOutputStatus = {
    reqCode : "v",
    reqIndex : false,
    reqParams : [],
    rspCode : "v",
    rspParams : [
        "Value (Bit mask representing valves 1-32)"
    ]
};
var BTCMD_GetValveProfileStatus = {
    reqCode : "w",
    reqIndex : false,
    reqParams : [],
    rspCode : "w",
    rspParams : [
        "Profile Bitmask (Decimal value representing active valve profiles)"
    ]
};
var BTCMD_SetTargetVolume = {
    reqCode : "%78",
    reqIndex : true,
    reqParams : [
        "Target volume"
    ],
    rspCode : "%&C",
    rspParams : [
        "Target volume"
    ]
};
var BTCMD_GetTargetVolume = {
    reqCode : "%7C",
    reqIndex : true,
    reqParams : [],
    rspCode : "%7C",
    rspParams : [
        "Target volume"
    ]
};
var BTCMD_GetBoilControl = {
    reqCode : "%7E",
    reqIndex : false,
    reqParams : [],
    rspCode : "%7E",
    rspParams : [
        "Boil Control Mode"
    ]
};
var BTCMD_GetProgramSettingsPartial = {
    reqCode : "E",
    reqIndex : true,
    reqParams : [],
    rspCode : "E",
    rspParams : [
            "Sparge Temp",
            "HLT Setpoint",
            "Boil Mins",
            "Pitch Temp",
            "Boil Additions (Bit Mask)",
            "Mash Liquor Heat Source (0=HLT, 1=Mash)"
    ]
};
var BTCMD_SetProgramSettingsPartial = {
    reqCode : "O",
    reqIndex : true,
    reqParams : [
            "Sparge Temp", "HLT Setpoint", "Boil Mins", "Pitch Temp", "Boil Additions (Bit Mask)", "Mash Liquor Heat "
    ],
    rspCode : "O",
    rspParams : [
            "Sparge Temp", "HLT Setpoint", "Boil Mins", "Pitch Temp", "Boil Additions (Bit Mask)", "Mash Liquor Heat "
    ]
};
var BTCMD_GetProgramName = {
    reqCode : "%5B",
    reqIndex : true,
    reqParams : [],
    rspCode : "%5B",
    rspParams : [
        "Program name"
    ]
};
var BTCMD_GetProgramMashTemps = {
    reqCode : "%5D",
    reqIndex : true,
    reqParams : [],
    rspCode : "%5D",
    rspParams : [
            "Dough In Temp", "Acid Temp", "Protein Temp", "Sacch Temp", "Sacch2 Temp", "Mash Out Temp"
    ]
};
var BTCMD_GetProgramMashMins = {
    reqCode : "%5F",
    reqIndex : true,
    reqParams : [],
    rspCode : "%5F",
    rspParams : [
            "Dough In Mins", "Acid Mins", "Protein Mins", "Sacch Mins", "Sacch2 Mins", "Mash Out Mins"
    ]
};
var BTCMD_GetSteamPressure = {
    reqCode : "r",
    reqIndex : false,
    reqParams : [],
    rspCode : "r",
    rspParams : [
        "Value (Decimal value representing psi/kPA)"
    ]
};
var BTCMD_GetProgramVolumes = {
    reqCode : "x",
    reqIndex : true,
    reqParams : [],
    rspCode : "x",
    rspParams : [
            "Batch volume (thousandths of l/gal)",
            "Grain weight (thousandths of kg/lb)",
            "Mash ratio (hundreths of kg/lb per l/qt)"
    ]
};

/*
 * Full list of BTNIC commands with command code.
 //var BTCMD_SetProgramSettings ("?", 63, 0x3F) = {};
 //var BTCMD_GetProgramSettings (@, 64, 0x40) = {};
 //var BTCMD_GetBoilTemperature (A, 65, 0x41) = {};
 //var BTCMD_GetVolumeCalibrations (B, 66, 0x42) = {};
 //var BTCMD_GetEvaporationRate (C, 67, 0x43) = {};
 //var BTCMD_GetOutputSettings (D, 68, 0x44) = {};
 //var BTCMD_GetTemperatureSensorAddress (F, 70, 0x46) = {};
 //var BTCMD_GetVersionInformation (G, 71, 0x47) = {};
 //var BTCMD_GetVolumeSettings (H, 72, 0x48) = {};
 //var BTCMD_InitializeEEPROM (I, 73, 0x49) = {};
 //var BTCMD_ScanforTemperatureSensor (J, 74, 0x4A) = {};
 //var BTCMD_SetBoilTemperature (K, 75, 0x4B) = {};
 //var BTCMD_SetVolumeCalibration (L, 76, 0x4C) = {};
 //var BTCMD_SetEvaporationRate (M, 77, 0x4D) = {};
 //var BTCMD_SetOutputSettings (N, 78, 0x4E) = {};
 //var BTCMD_SetTemperatureSensor (P, 80, 0x50) = {};
 //var BTCMD_SetValveProfileConfiguration (Q, 81, 0x51) = {};
 //var BTCMD_SetVolumeSettings (R, 82, 0x52) = {};
 //var BTCMD_AdvanceStep (S, 83, 0x53) = {};
 //var BTCMD_ExitStep (T, 84, 0x54) = {};
 //var BTCMD_StartStep (U, 85, 0x55) = {};
 //var BTCMD_SetAlarmStatus (V, 86, 0x56) = {};
 //var BTCMD_SetAutoValveStatus (W, 87, 0x57) = {};
 //var BTCMD_SetSetpoint (X, 88, 0x58) = {};
 //var BTCMD_SetTimerStatus (Y, 89, 0x59) = {};
 //var BTCMD_SetTimerValue (Z, 90, 0x5A) = {};
 //var BTCMD_GetStatus (a, 97, 0x61) = {};
 //var BTCMD_SetValveProfileStatus (b, 98, 0x62) = {};
 //var BTCMD_Reset (c, 99, 0x63) = {};
 //var BTCMD_GetValveProfileConfiguration (d, 100, 0x64) = {};
 //var BTCMD_GetAlarmStatus (e, 101, 0x65) = {};
 //var BTCMD_GetActivePrograms (n, 110, 0x6E) = {};
 //var BTCMD_GetTimerStatus (o, 111, 0x6F) = {};
 //var BTCMD_GetVolume (p, 112, 0x70) = {};
 //var BTCMD_GetTemperature (q, 113, 0x71) = {};
 //var BTCMD_GetHeatOutputStatus (s, 115, 0x73) = {};
 //var BTCMD_GetSetpoint (t, 116, 0x74) = {};
 //var BTCMD_GetAutoValveStatus (u, 117, 0x75) = {};
 //var BTCMD_GetValveOutputStatus (v, 118, 0x76) = {};
 //var BTCMD_GetValveProfileStatus (w, 119, 0x77) = {};
 //var BTCMD_SetTargetVolume ("{", 123, 0x7B) = {};
 //var BTCMD_GetTargetVolume ("|", 124, 0x7C) = {};
 //var BTCMD_SetBoilControl ("}", 125, 0x7D) = {};
 //var BTCMD_GetBoilControl ("~", 126, 0x7E)  = {};
 //var BTCMD_GetProgramSettingsPartial (Partial) (E, 69, 0x45) _Depreciated_ = {};
 //var BTCMD_SetProgramSettingsPartial (Partial) (O, 79, 0x4F) _Depreciated_ = {};
 //var BTCMD_GetProgramName ("[", 91, 0x5B) _Depreciated_ = {};
 //var BTCMD_SetProgramName ("\", 92, 0x5C) _Depreciated_ = {};
 //var BTCMD_GetProgramMashTemps ("]", 93, 0x5D) _Depreciated_ = {};
 //var BTCMD_SetProgramMashTemps ("\", 94, 0x5E) _Depreciated_ = {};
 //var BTCMD_GetProgramMashMins ("_", 95, 0x5F) _Depreciated_ = {};
 //var BTCMD_SetProgramMashMins ("`", 96, 0x60) _Depreciated_ = {};
 //var BTCMD_GetSteamPressure (r, 114, 0x72) _Depreciated_ = {};
 //var BTCMD_GetProgramVolumes (x, 120, 0x78) _Depreciated_ = {};
 //var BTCMD_SetProgramVolumes (y, 121, 0x79) _Depreciated_ = {};
 */
