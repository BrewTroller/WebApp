<!DOCTYPE html>
<html>
<head>
<title>WebAppTroller - A web interface for Brewtroller</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="css/bootstrap.min.css">
<!-- Optional theme -->
<link rel="stylesheet" href="css/bootstrap-theme.min.css">
<link rel="stylesheet" href="css/jquery.sidr.light.css">
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/slider.css">
<!-- User Defined CSS Preferences  -->
<link rel="stylesheet" href="css/userprefs.css">

<!--  Pulled Font-Awesome for NHC with no Internet Access -->
<!-- <link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"> -->

<!-- Latest compiled and minified JavaScript -->
<script src="js/jquery-1.11.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/filereader.js"></script>
<script src="js/jquery.xml2json.js"></script>
<script src="js/bootstrap-slider.js"></script>

<script>
	function printAlarm(id, status)
    {
        if (status == 1) {
            $(id).addClass("btn-danger");
            $(id).removeClass("btn-default");
            
        } else {
            $(id).addClass("btn-default");
            $(id).removeClass("btn-danger");
        }
    }
    
    function printTemperature(id, temperature)
    {
        $(id).html('<small class="text-muted">temp </small><span class="vesselTemp">' + (temperature == 4294934528 ? "N/A" : (temperature / 100.0 + '&deg;F</span> ')));
    }
    
    function printSetpoint(id, setpoint)
    {
        $(id).html('<small class="text-muted">set </small><span class="vesselSet">' + (setpoint == 0 ? "N/A " : (setpoint / 100.0 + '&deg;F</span> ')));
    }
    
    function printHeatPower(id, heatPower)
    {
        $(id).html('<small class="text-muted">heat power </small>' + (heatPower == 0 ? "Off" : heatPower == 100 ? '<span class="text text-danger">On</span>' : (heatPower + "%")));
    }
    
	function printVolume(id, volume)
    {
        $(id).html('<small class="text-muted">volume </small>' + volume / 1000.0 + " Gal");
    }
    
    function printTargetVolume(id, target)
    {
        $(id).html('<small class="text-muted">target volume </small>' + target / 1000.0 + " Gal");
    }
    
    function printFlowRate(id, flowrate)
    {
        $(id).html('<small class="text-muted">flow rate </small>' + flowrate + " Gal/min");
    }
	function printBoilControl(id, data)
	{
		$(id).html("Boil Control: " + data);
	}
	
    function printProgramThread(id, step, recipe)
    {
        $(id).html("Step: " + step + " Recipe: " + recipe);
    }
    
/*     function printTimer(id, value, status)
    {
      if(status == 0) {
        rStatus = "Off";
      }else{
        rStatus == "On";
      }
      $(id).html("Set Time: " + value/1000 + " seconds <br>Status: " + rStatus);
    } */
    
//     function printOutputProfiles(id, status)
//     {
//         $(id).html("Output Profiles: " + status);
//     }
    
    function printOutputStatus(id, status)
    {
        $(id).html("Output Status: " + status);
    }

    function click_buttonAlarm()
    {
        brewTrollerExecCommand(BTCMD_SetAlarm, null, {"alarmStatus": "0"}, host, username, password, function(data){
                               printAlarm(data.alarmStatus);
                               });
    }
    
    function click_buttonAlarmOn()
    {
        brewTrollerExecCommand(BTCMD_SetAlarm, null, {"alarmStatus": "1"}, host, username, password, function(data){
                               printAlarm(data.alarmStatus);
                               });
    }
    
    $(document).ready(function(){
                      });
</script>
</head>
<body>
  <div class="container">
    <nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">
                	<img class="img-responsive" src="images/brewtroller-header.png">
                	<span id="tempStatus"></span>
                </a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Controller <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="#" id="button_reset">Reset</a></li>
                            <li><a href="#" id="reboot">Reboot</a></li>
                            <li class="divider"></li>
                            <li><a href="#" data-toggle="modal" data-target="#statusData">Status Data</a></li>
                            <li><a href="#" onClick="click_buttonAlarmOn();">Set Alarm</a></li>
                        </ul>
                    </li>
                    
                    <li><a href="#" id="button_connect">Connect</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Recipes <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="#" id="beerXMLModalButton" data-toggle="modal" data-target="#modal_beerXMLLoader">Load Beer XML</a></li>
                            <li><a href="#"id="programModalButton" data-toggle="modal" data-target="#modal_programPicker">Load Recipe</a></li>
                        </ul>
                    </li>
                    <li><a href="#" class="btn-lg" data-toggle="modal" data-target="#modal_settings"><span class="glyphicon glyphicon-cog"></a></li>
                	<li><button id="button_alarm" class="btn btn-default btn-lg" onClick="click_buttonAlarm('mash');"><span class="glyphicon glyphicon-warning-sign"></span></button></li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
    <div class="row">
        <div class="col-sm-6">
          <div id="mashZonePanel" class="panel panel-default">
          	<div class="panel-heading clearfix">
           	  <h3 class="panel-title pull-left">
           		Mash Zone
           	  </h3>
           	  <button id="button_nextStep1" type="button" class="btn btn-default btn-xs pull-right">Next Step</button>
           </div>
           <div class="panel-body">
  			 <p id="programSlot1" class="alert alert-success" style="padding:5px;"><span id="currStatusProg1"></span></p>
  		   </div>	
       	 </div>
       	</div>
       	<div class="col-sm-6">
       	  <div id="boilZonePanel" class="panel panel-default">
          	<div class="panel-heading clearfix">
           	  <h3 class="panel-title pull-left">
           		Boil Zone
           	  </h3>
           	  <button id="button_nextStep2" type="button" class="btn btn-default btn-xs pull-right">Next Step</button>
           </div>
           <div class="panel-body">
  			 <p id="programSlot2" class="alert alert-success" style="padding:5px;"><span id="currStatusProg2"></span></p>
  		   </div>	
       	  </div>
        </div>
      </div>
      <div class="row">
            <div class="col-sm-4">
            	<div class="panel panel-default vesselPanel">
                    <div class="panel-heading"><h3 class="panel-title">Hot Liquor</h3></div>
                    <div class="panel-body">
                    	<div id="hltTempSet"><span id="div_hltTemperature"></span> <span id="div_hltSetpoint"></span></div>
<!--                         <div id="div_hltTemperature"></div> -->
<!--                         <div id="div_hltSetpoint"></div> -->
                        <div id="div_hltHeatPower"></div>
                        <div id="div_hltVolume"></div>
                        <div id="div_hltTargetVolume"></div>
                        <div id="div_hltFlowRate"></div>
                        <div class="input-group">
					      <span class="input-group-btn">
					        <button id="hltTempSetBtn" class="btn btn-default" type="button"">Set Temp</button>
					      </span>
					      <input id="hltSetTemp" type="text" class="form-control">
					    </div><!-- /input-group -->
				</div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="panel panel-default vesselPanel">
                    <div class="panel-heading clearfix">
                    	<h3 class="panel-title pull-left">Mash</h3>
                    	<button id="mashTimerButton" class="btn btn-default btn-xs pull-right" type="button">Timer Start</button>
                    </div>
                    <div class="panel-body">
                        <div class="row timer-top">
                        <div class="col-sm-12">
                        <div id="mashTempSet"><span id="div_mashTemperature"></span> <span id="div_mashSetpoint"></span></div>
<!--                         <div id="div_mashTemperature"></div> -->
<!--                         <div id="div_mashSetpoint"></div> -->
                        <div id="div_mashHeatPower"></div>
                        <div id="div_mashVolume"></div>
                        <div id="div_mashTargetVolume"></div>
                        <div id="div_mashFlowRate"></div>
                        <div class="input-group">
					      <span class="input-group-btn">
					        <button id="mashTempSetBtn" class="btn btn-default" type="button"">Set Temp</button>
					      </span>
					      <input id="mashSetTemp" type="text" class="form-control">
					    </div><!-- /input-group -->
					    </div>
					    </div>
					    <div id="div_mashTimer"></div>
					    <div class="input-group">
					      <span class="input-group-btn">
					        <button class="btn btn-default" type="button" onClick="Brewtroller.timer.click_setTimer('mash');">Set Timer</button>
					      </span>
					      <select id="mashHours" class="form-control">
							  <option value="0">Hours</option>
  							  <option value="1">1</option>
  							  <option value="2">2</option>
  							  <option value="3">3</option>
  							  <option value="4">4</option>
  							  <option value="5">5</option>
  							  <option value="6">6</option>
  							  <option value="7">7</option>
  							  <option value="8">8</option>
  							  <option value="9">9</option>
  							  <option value="10">10</option>
  							  <option value="11">11</option>
  							  <option value="12">12</option>
  							  <option value="13">13</option>
  							  <option value="14">14</option>
  							  <option value="15">15</option>
  							  <option value="16">16</option>
  							  <option value="17">17</option>
  							  <option value="18">18</option>
  							  <option value="19">19</option>
  							  <option value="20">20</option>
  							  <option value="21">21</option>
  							  <option value="22">22</option>
  							  <option value="23">23</option>
  							  <option value="24">24</option>
  							</select>
						 <select id="mashMinutes" class="form-control">
							  <option value="0">Minutes</option>
  							  <option value="1">1</option>
  							  <option value="2">2</option>
  							  <option value="3">3</option>
  							  <option value="4">4</option>
  							  <option value="5">5</option>
  							  <option value="6">6</option>
  							  <option value="7">7</option>
  							  <option value="8">8</option>
  							  <option value="9">9</option>
  							  <option value="10">10</option>
  							  <option value="11">11</option>
  							  <option value="12">12</option>
  							  <option value="13">13</option>
  							  <option value="14">14</option>
  							  <option value="15">15</option>
  							  <option value="16">16</option>
  							  <option value="17">17</option>
  							  <option value="18">18</option>
  							  <option value="19">19</option>
  							  <option value="20">20</option>
  							  <option value="21">21</option>
  							  <option value="22">22</option>
  							  <option value="23">23</option>
  							  <option value="24">24</option>
  							  <option value="25">25</option>
  							  <option value="26">26</option>
  							  <option value="27">27</option>
  							  <option value="28">28</option>
  							  <option value="29">29</option>
  							  <option value="30">30</option>
  							  <option value="31">31</option>
  							  <option value="32">32</option>
  							  <option value="33">33</option>
  							  <option value="34">34</option>
  							  <option value="35">35</option>
  							  <option value="36">36</option>
  							  <option value="37">37</option>
  							  <option value="38">38</option>
  							  <option value="39">39</option>
  							  <option value="40">40</option>
  							  <option value="41">41</option>
  							  <option value="42">42</option>
  							  <option value="43">43</option>
  							  <option value="44">44</option>
  							  <option value="45">45</option>
  							  <option value="46">46</option>
  							  <option value="47">47</option>
  							  <option value="48">48</option>
  							  <option value="49">49</option>
  							  <option value="50">50</option>
  							  <option value="51">51</option>
  							  <option value="52">52</option>
  							  <option value="53">53</option>
  							  <option value="54">54</option>
  							  <option value="55">55</option>
  							  <option value="56">56</option>
  							  <option value="57">57</option>
  							  <option value="58">58</option>
  							  <option value="59">59</option>
  							  <option value="60">60</option>
  							</select>
					    </div><!-- /input-group -->
					</div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="panel panel-default vesselPanel">
                    <div class="panel-heading clearfix">
                    	<h3 class="panel-title pull-left">
                    		Boil Kettle
                    	</h3>
                    	<button id="boilTimerButton" class="btn btn-default btn-xs pull-right" type="button">Timer Start</button>
                    </div>
                    <div class="panel-body">
						<div class="row timer-top">
						<div class="col-sm-12">
							<div class="row">
								<div class="col-sm-6">
									<div id="kettleTempSet"><span id="div_kettleTemperature"></span> <span id="div_kettleSetpoint"></span></div>
	<!-- 								<div id="div_kettleTemperature"></div> -->
	<!-- 								<div id="div_kettleSetpoint"></div> -->
									<div id="div_kettleHeatPower"></div>
									<div id="div_kettleVolume"></div>
									<div id="div_kettleTargetVolume"></div>
									<div id="div_kettleFlowRate"></div>
								</div>
								<div class="col-sm-6">
									<div class="btn-group-vertical btn-group-sm" data-toggle="buttons">
									  <label class="btn btn-default">
									  	<input type="radio" class="boilControl" name="boilOff" id="boilOff">Kettle Off</input>
									  </label>
									   <label class="btn btn-default">
									  	<input type="radio" class="boilControl" name="boilAuto" id="boilAuto">Auto Boil</input>
									  </label>
									   <label class="btn btn-default">
									  	<input type="radio" class="boilControl" name="boilManual" id="boilManual">Manual Boil</input>
									  </label>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-12">
									<div id="powerControl">
										<p>Power: <span id="boilPower">0</span>%</p>
										<input id="powerSlider" type="text" class="span2" value="" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="0" data-slider-orientation="horizontal" data-slider-selection="after" data-slider-tooltip="hide">
									</div>
								</div>
							</div>
						</div>
						</div>
						<div class="row timer-bottom">
						<div class="col-sm-12">
							<div class="row">
								<div class="col-sm-12">
									<div id="div_boilTimer"></div>
								</div>
							</div>
							<div class="row">
							  <div class="col-md-12">
							    <div class="input-group">
							      <span class="input-group-btn">
							        <button class="btn btn-default" type="button" onClick="Brewtroller.timer.click_setTimer('boil');">Set Timer</button>
							      </span>
							      <select id="boilHours" class="form-control">
								      <option value="0">Hours</option>
		  							  <option value="1">1</option>
		  							  <option value="2">2</option>
		  							  <option value="3">3</option>
		  							  <option value="4">4</option>
		  							  <option value="5">5</option>
		  							  <option value="6">6</option>
		  							  <option value="7">7</option>
		  							  <option value="8">8</option>
		  							  <option value="9">9</option>
		  							  <option value="10">10</option>
		  							  <option value="11">11</option>
		  							  <option value="12">12</option>
		  							  <option value="13">13</option>
		  							  <option value="14">14</option>
		  							  <option value="15">15</option>
		  							  <option value="16">16</option>
		  							  <option value="17">17</option>
		  							  <option value="18">18</option>
		  							  <option value="19">19</option>
		  							  <option value="20">20</option>
		  							  <option value="21">21</option>
		  							  <option value="22">22</option>
		  							  <option value="23">23</option>
		  							  <option value="24">24</option>
								  </select>
							      <select id="boilMinutes" class="form-control">
									  <option value="0">Minutes</option>
		  							  <option value="1">1</option>
		  							  <option value="2">2</option>
		  							  <option value="3">3</option>
		  							  <option value="4">4</option>
		  							  <option value="5">5</option>
		  							  <option value="6">6</option>
		  							  <option value="7">7</option>
		  							  <option value="8">8</option>
		  							  <option value="9">9</option>
		  							  <option value="10">10</option>
		  							  <option value="11">11</option>
		  							  <option value="12">12</option>
		  							  <option value="13">13</option>
		  							  <option value="14">14</option>
		  							  <option value="15">15</option>
		  							  <option value="16">16</option>
		  							  <option value="17">17</option>
		  							  <option value="18">18</option>
		  							  <option value="19">19</option>
		  							  <option value="20">20</option>
		  							  <option value="21">21</option>
		  							  <option value="22">22</option>
		  							  <option value="23">23</option>
		  							  <option value="24">24</option>
		  							  <option value="25">25</option>
		  							  <option value="26">26</option>
		  							  <option value="27">27</option>
		  							  <option value="28">28</option>
		  							  <option value="29">29</option>
		  							  <option value="30">30</option>
		  							  <option value="31">31</option>
		  							  <option value="32">32</option>
		  							  <option value="33">33</option>
		  							  <option value="34">34</option>
		  							  <option value="35">35</option>
		  							  <option value="36">36</option>
		  							  <option value="37">37</option>
		  							  <option value="38">38</option>
		  							  <option value="39">39</option>
		  							  <option value="40">40</option>
		  							  <option value="41">41</option>
		  							  <option value="42">42</option>
		  							  <option value="43">43</option>
		  							  <option value="44">44</option>
		  							  <option value="45">45</option>
		  							  <option value="46">46</option>
		  							  <option value="47">47</option>
		  							  <option value="48">48</option>
		  							  <option value="49">49</option>
		  							  <option value="50">50</option>
		  							  <option value="51">51</option>
		  							  <option value="52">52</option>
		  							  <option value="53">53</option>
		  							  <option value="54">54</option>
		  							  <option value="55">55</option>
		  							  <option value="56">56</option>
		  							  <option value="57">57</option>
		  							  <option value="58">58</option>
		  							  <option value="59">59</option>
		  							  <option value="60">60</option>
								  </select>
							    </div><!-- /input-group -->
							  </div><!-- /.col-lg-6 -->
							</div><!-- /.row -->
						</div>
						</div>
					</div>
                </div>
            </div>
        </div>
        <div class="row">
        	<div class="col-sm-12">
        		<div class="panel panel-default">
				  <div class="panel-heading clearfix">
				  	<h3 class="panel-title pull-left">
				  		<a data-toggle="collapse" href="#activeVP">
				  		Active Valve Profiles
				  		</a>
				  	</h3>
				  	<small id="activeValveProfile" class="pull-right"></small>
				  </div>
				  <div id="activeVP" class="panel-collapse collapse in">
				  <div class="valveBtn panel-body">
				  	<div class="row">
				  		<div class="col-sm-3">
					  		<div class="btn-group">
							  <button id="fillHLT" type="button" class="btn btn-default">Fill HLT</button>
							  <button id="fillMash" type="button" class="btn btn-default">Fill Mash</button>
							</div>
							<div class="btn-group">
							  <button id="addGrain" type="button" class="btn btn-default">Add Grain</button>
							</div>
							<div class="btn-group">
							  <button id="mashHeat" type="button" class="btn btn-default">Mash Heat</button>
							  <button id="mashIdle" type="button" class="btn btn-default">Mash Idle</button>
							</div>
							<div class="btn-group">
							  <button id="spargeIn" type="button" class="btn btn-default">Sparge In</button>
							  <button id="spargeOut" type="button" class="btn btn-default">Sparge Out</button>
							</div>
				  		</div>
				  		<div class="col-sm-3">
				  			<div class="btn-group">
							  <button id="hltHeat" type="button" class="btn btn-default">HLT Heat</button>
							  <button id="hltIdle" type="button" class="btn btn-default">HLT Idle</button>
							</div>
							<div class="btn-group">
							  <button id="kettleHeat" type="button" class="btn btn-default">Kettle Heat</button>
							  <button id="kettleIdle" type="button" class="btn btn-default">Kettle Idle</button>
							</div>
				  		</div>
				  		<div class="col-sm-3">
				  			<div class="btn-group">
							  <button id="boilAdditions" type="button" class="btn btn-default">Boil Additions</button>
							  <button id="kettleLid" type="button" class="btn btn-default">Kettle Lid</button>
							</div>
							<div class="btn-group">
							  <button id="chillerH20" type="button" class="btn btn-default">Chiller H20</button>
							  <button id="chillerBeer" type="button" class="btn btn-default">Chiller Beer</button>
							  <button id="boilRecirc" type="button" class="btn btn-default">Boil Recirc</button>
							</div>
							<div class="btn-group">
							  <button id="drain" type="button" class="btn btn-default">Drain</button>
							</div>
						</div>
				  		<div class="col-sm-3">
				  			<div class="btn-group-vertical">
							  <button id="user1" type="button" class="btn btn-default">User 1</button>
							  <button id="user2" type="button" class="btn btn-default">User 2</button>
							  <button id="user3" type="button" class="btn btn-default">User 3</button>
							</div>
				  		</div>
				  	</div>
				  </div>
				  </div>
				</div>
        	</div>
        </div>
        <div  class="row">
            <div class="col-sm-12">
                <div class="panel panel-default">
				  <div class="panel-heading clearfix">
				  	<h3 class="panel-title pull-left">
				  		<a data-toggle="collapse" href="#outputStat">
				  		Individual Valve Output Status
				  		</a>
				  	</h3>
				  	<button id="outputSave" type="button" class="btn btn-default pull-right">Save Output Settings</button>
				  	<select id="valveSelect" class="pull-right form-control">
				  		<option value="Select Profile">Select Profile</option>
				  	</select>
				  </div>
				  <div id="outputStat" class="panel-collapse collapse">
				  <div id="outPutStatus"class="panel-body">
				  	<div class="row">
				  		<div class="col-sm-12">
						    <div class="row">
						    <div class="col-sm-12">
						    <div id="valve1" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve2" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve3" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve4" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve5" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve6" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve7" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve8" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve9" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve10" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve11" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve12" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve13" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve14" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve15" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve16" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							</div>
							</div>
							<div class="row">
							<div class="col-sm-12">
							<div id="valve17" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve18" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve19" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve20" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve21" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve22" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve23" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve24" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve25" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve26" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve27" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve28" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve29" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve30" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve31" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							<div id="valve32" class="btn-group-vertical">
							  <button type="button" class="btn btn-default btn-sm">On</button>
							  <button type="button" class="btn btn-default btn-sm">Off</button>
							</div>
							</div>
							</div>
						  </div>
						</div>
					  </div>
					  </div>
					</div>
<!-- 				</div> -->
            </div>
        </div>
    </div>
    
    <!-- Status Data modal -->
    <div class="modal fade" id="statusData" tabindex="-1" role="dialog" aria-labelledby="statusDataLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">Status Data</h4>
                </div>
                <div id="div_status" class="modal-body">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Settings modal -->
    <div class="modal fade" id="modal_settings" tabindex="-1" role="dialog" aria-labelledby="settingsLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">Settings</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Host</label>
                            <input type="email" class="form-control" id="settingsHost" placeholder="Enter hostname or IP">
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox"> Use authentication
                            </label>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Username</label>
                            <input type="email" class="form-control" id="settingsUser" placeholder="Enter email">
                                </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="settingsPassword" placeholder="Password">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button id="settingsSaveBtn" type="button" class="btn btn-default" data-dismiss="modal">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Program Picker modal -->
    <div class="modal fade" id="modal_programPicker" tabindex="-1" role="dialog" aria-labelledby="settingsLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">Pick Recipe</h4>
                </div>
                <div class="modal-body" id="recipeModalBody">
                    <div id="recipeDetails">
						<table class="table table-condensed">
						  <tbody>
						  	
						  </tbody>
						</table>
					</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
      <div class="modal fade" id="modal_beerXMLLoader" tabindex="-1" role="dialog" aria-labelledby="settingsLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">Load Beer XML</h4>
                </div>
                <div class="modal-body" id="loadBeerXMLModalBody">
                	<input type="file" id="file" name="myFile" />  
                	<label>
                	Select a recipe slot to load recipe in to:
                	<select class="form-control" id="loadProgramNumber">
					  <option>1</option>
					  <option>2</option>
					  <option>3</option>
					  <option>4</option>
					  <option>5</option>
					  <option>6</option>
					  <option>7</option>
					  <option>8</option>
					  <option>9</option>
					  <option>10</option>
					  <option>11</option>
					  <option>12</option>
					  <option>13</option>
					  <option>14</option>
					  <option>15</option>
					  <option>16</option>
					  <option>17</option>
					  <option>18</option>
					  <option>19</option>
					</select>   
					</label>          
                </div>
                <div class="modal-footer">
                <button type="button" id="loadBeerXMLButton" class="btn btn-default">Save Recipe to Brewtroller</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modal_Timeout" tabindex="-1" role="dialog" aria-labelledby="settingsLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body" id="recipeModalBody">
                    <h3 class="text-danger">Establishing Connection - Please Wait</h3>
	<!--  Commented out Font Awesome for NHC -->
    <!--                     <i class="fa fa-spinner fa-spin fa-5x"></i> -->
                </div>
                <div class="modal-footer">
                <button id="connectionModalCancel" type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
            </div>
            </div>
        </div>
    </div>
  </div>
</body>
<script src="js/brewtroller.js"></script>
<script src="js/cgiByteCodeMap.js"></script>
<script>
	Brewtroller.init();
</script>
</html>
