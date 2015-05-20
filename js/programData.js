//Inspired/Copied from BT Live Project
Brewtroller.progData = function (recipeSlot) {
	//Always stored in same units as BT (btUnits)
	var pSlot = recipeSlot,
		isLoaded = false,
		name = "",
		batchVolume = 0,
		grainWeight = 0,
		mashRatio = 0,
		spargeTemp = 0,
		hltTemp = 0,
		pitchTemp = 0,	
		boilTime = 0,
		strikeHeat = "0", //TODO: make default user-configurable.
		mashSteps = {
				doughIn:{step: "Dough In", time: 0, temp: 0},
				acid:{step: "Acid Rest", 	time: 0, temp: 0},
				protein:{step: "Protein Rest",	time: 0, temp: 0},
				sacch:{step: "Saccharification",	time: 0, temp: 0},
				sacch2:{step: "Saccharification 2",	time: 0, temp: 0},
				mashOut:{step: "Mash Out",		time: 0, temp: 0}
		},
		boilAdditions = {
				atboil:{time: "At Boil", state: false, bitmask: 1},
				at105:{time: 105, state: false, bitmask: 2},
				at90:{time: 90,  state: false, bitmask: 4},
				at75:{time: 75,  state: false, bitmask: 8},
				at60:{time: 60,  state: false, bitmask: 16},
				at45:{time: 45,  state: false, bitmask: 32},
				at30:{time: 30,  state: false, bitmask: 64},
				at20:{time: 20,  state: false, bitmask: 128},
				at15:{time: 15,  state: false, bitmask: 256},
				at10:{time: 10,  state: false, bitmask: 512},
				at5:{time: 5,   state: false, bitmask: 1024},
				at0:{time: 0,   state: false, bitmask: 2048}
		};
	
	this.isLoaded = function () {
		return isLoaded;
	};
	this.getPSlot = function () {
		return pSlot;
	};
	this.getBoilAddBitmask = function () {
		var boilBitmask = 0;
		$.each(boilAdditions, function(key, value) {
			if(value.state) boilBitmask =  boilBitmask | value.bitmask;
		});
		return boilBitmask;
	};
	
	this.loadFromGetProgram = function (btResp) { // Takes BTResp object and loads Prog data.
		name = btResp["name"];
		
		batchVolume = parseInt(btResp["batchVolume"])/1000;
		grainWeight = parseInt(btResp["grainWeight"])/1000;
		mashRatio = parseInt(btResp["mashRatio"])/100;
		spargeTemp = parseInt(btResp["spargeTemperature"]);
		hltTemp = parseInt(btResp["hltTemperature"]);
		boilTime = parseInt(btResp["boilMinutes"]);
		pitchTemp = parseInt(btResp["pitchTemperature"]);
		strikeHeat = btResp["strikeHeatSource"]; //TODO: Determine assignment	
		
		mashSteps.doughIn.temp = parseInt(btResp["mashDoughIn_Temperature"]);
		mashSteps.doughIn.time = parseInt(btResp["mashDoughIn_Minutes"]);
		
		mashSteps.acid.temp = parseInt(btResp["mashAcid_Temperature"]);
		mashSteps.acid.time = parseInt(btResp["mashAcid_Minutes"]);
		
		mashSteps.protein.temp = parseInt(btResp["mashProtein_Temperature"]);
		mashSteps.protein.time = parseInt(btResp["mashProtein_Minutes"]);
		
		mashSteps.sacch.temp = parseInt(btResp["mashSacch_Temperature"]);
		mashSteps.sacch.time = parseInt(btResp["mashSacch_Minutes"]);
		
		mashSteps.sacch2.temp = parseInt(btResp["mashSacch2_Temperature"]);
		mashSteps.sacch2.time = parseInt(btResp["mashSacch2_Minutes"]);
		
		mashSteps.mashOut.temp = parseInt(btResp["mashMashOut_Temperature"]);
		mashSteps.mashOut.time = parseInt(btResp["mashMashOut_Minutes"]);
		
		$.each(boilAdditions, function(key, value) {
		    value.state = Boolean(parseInt(btResp["boilAdditions"])&value.bitmask);
		});
		
		isLoaded = true;
	};
	this.genSetProgram = function () { // BROKEN: Generate parameters for SetProgram BT command
        var btParams = {};
        btParams = {
        };
        
        return btParams;
	};
	this.genSetProgramName = function () { // Generate parameters for ProgramName BT command
        var btParams = {};
        btParams = {
	        "Program_Name": name
        };
        return btParams;
	};
	this.genSetProgramSettings = function () { // Generate parameters for ProgramSettings BT command
        var btParams = {};
        btParams = {
		      "Sparge_Temp": spargeTemp,
			  "HLT_Setpoint": hltTemp,
			  "Boil_Mins": boilTime,
			  "Pitch_Temp": pitchTemp,
			  "Boil_Additions": this.getBoilAddBitmask(),
			  "Mash_Liquor_Heat_Source": strikeHeat
        };
        
        return btParams;
	};
	this.genSetProgramVolumes = function () { // Generate parameters for ProgramVolumes BT command
        var btParams = {};
        btParams = {
    		  "Batch_Volume": batchVolume*1000,
    		  "Grain_Weight": grainWeight*1000,
    		  "Mash_Ratio": mashRatio*100
        };
        
        return btParams;
	};
	this.genSetProgramMashTemps = function () { // Generate parameters for ProgramMashTemps BT command
        var btParams = {};
        btParams = {
        	  "Dough_In_Temp": mashSteps.doughIn.temp,
    		  "Acid_Temp": mashSteps.acid.temp,
    		  "Protein_Temp": mashSteps.protein.temp,
    		  "Sacch_Temp": mashSteps.sacch.temp,
    		  "Sacch2_Temp": mashSteps.sacch2.temp,
    		  "Mash_Out_Temp": mashSteps.mashOut.temp
        };
        
        return btParams;
	};
	this.genSetProgramMashMins = function () { // Generate parameters for ProgramMashMins BT command
        var btParams = {};
        btParams = {
        	  "Dough_In_Mins": mashSteps.doughIn.time,
    		  "Acid_Mins": mashSteps.acid.time,
    		  "Protein_Mins": mashSteps.protein.time,
    		  "Sacch_Mins": mashSteps.sacch.time,
    		  "Sacch2_Mins": mashSteps.sacch2.time,
    		  "Mash_Out_Mins": mashSteps.mashOut.time
        };
        
        return btParams;
	};
	  
	this.loadFromBeerXML = function (beerXML) { //Takes BeerXML and loads Prog Data
		var beerJSON = $.xml2json(beerXML, true), //Use extended mode. Not as clean but safer for items that don't always have multiple items (hops/grain/mash steps).
			recipe = beerJSON["RECIPE"][0],
			xmlMashSteps = recipe["MASH"][0]["MASH_STEPS"][0]["MASH_STEP"],
			xmlGrains =  recipe["FERMENTABLES"][0]["FERMENTABLE"],
			xmlHops = recipe["HOPS"][0]["HOP"],
			xmlGrainWeight = 0,
			xmlGrainRatio = "";
		
		name = recipe["NAME"][0].text.substring(0,19); //Limit to 20Chars.
		batchVolume = Number(correctUnits(parseFloat(recipe["BATCH_SIZE"][0].text), "volume", "metric", btUnits)).toFixed(1);
		spargeTemp = Number(correctUnits(parseFloat(recipe["MASH"][0]["SPARGE_TEMP"][0].text),"temperature","metric", btUnits)).toFixed(0);
		hltTemp = spargeTemp; // Use sparge temp as HLT Target (need to confirm)
		boilTime = parseInt(recipe["BOIL_TIME"][0].text);
		pitchTemp = Number(correctUnits(parseFloat(recipe["PRIMARY_TEMP"][0].text),"temperature","metric", btUnits)).toFixed(0);	
	  	//this.strikeHeat = "0"; //leave at default, not contained in XML  
		
		//Add up the weight of all grains.
		$.each(xmlGrains, function(index, value) {
			  xmlGrainWeight += parseFloat(value["AMOUNT"][0].text);
		});
		grainWeight = Number(correctUnits(xmlGrainWeight,"weight","metric",btUnits)).toFixed(2);
		
		//Get Mash step info
		var stepsLoaded = 0;
		$.each(xmlMashSteps, function(index, mashStep) {
			var stepTime = parseInt(mashStep["STEP_TIME"][0].text),
				stepTemp = Number(correctUnits(parseFloat(mashStep["STEP_TEMP"][0].text),"temperature","metric", btUnits)).toFixed(0);
			if (index===0) xmlGrainRatio = mashStep["WATER_GRAIN_RATIO"][0].text; //Always taking grain ratio from first mash step (need to confirm)
			
			$.each(mashSteps, function(btIndex, btMashStep) {
				if (mashStep["NAME"][0].text == btMashStep.step ) { //TODO: Deal with other XML step names.
					btMashStep.temp = stepTemp;
					btMashStep.time = stepTime;
					stepsLoaded++;
				}
			});
		});
		
		var ratioUnits = (xmlGrainRatio.lastIndexOf('l/kg')!=-1 ? "metric" : "imperial"); //If not l/kg (metric) default to qt/lbs (imperial). (need to confirm)
		mashRatio = Number(correctUnits(parseFloat(xmlGrainRatio), "ratio", ratioUnits, btUnits).toFixed(2));
		
		//Get boil addition times.
		var hopsLoaded = 0;
		$.each(xmlHops, function(index, xmlHop){
			 var hopTime = parseInt(xmlHop["TIME"][0].text);
			 $.each(boilAdditions, function(btIndex, btHop){ //TODO: Deal with XML hop times that don't exactly match BT hop times.
				 if (btHop.time == hopTime) {
					 btHop.state = true;
					 hopsLoaded++;
				 }
			 });
		});
		
		isLoaded = true;	
	};
};