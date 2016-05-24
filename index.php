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
<link rel="stylesheet" href="css/slider.css">
<link rel="stylesheet" href="css/bootstrap-formhelpers.min.css">
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/mbExtruder.css">
<!-- User Defined CSS Preferences  -->
<link rel="stylesheet" href="css/userprefs.css">

<!--  Pulled Font-Awesome for NHC with no Internet Access -->
<!-- <link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"> -->

<!-- Latest compiled and minified JavaScript -->
<script src="framework/jquery-1.11.1.min.js"></script>
<script src="framework/bootstrap.min.js"></script>
<script src="framework/filereader.js"></script>
<script src="framework/jquery.xml2json.js"></script>
<script src="framework/bootstrap-slider.js"></script>
<script type="text/javascript" src="framework/segment-display.js"></script>
<script src="framework/gauge.min.js"></script>
<script src="framework/bootstrap-formhelpers.js"></script>
<script src="framework/mbExtruder.js"></script>
<script src="framework/jquery.mb.flipText.js"></script>
<script src="framework/jquery.hoverIntent.min.js"></script>
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
        $(id).html('<small class="text-muted">flow rate </small>' +  flowrate / 1000 + " Gal/min");
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
  <div class="container" style="padding-left: 30px;">
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
                    <div class="panel-heading">
                    	<span id="hltLED" class="pull-left">
                    		<img src="images/redOffLED.png" width="20" height="20">
                    	</span>
                    	<h3 class="panel-title">Hot Liquor</h3>
                    </div>
                    <div class="panel-body">
                    	<div id="hltTempSet">
	                    	<span id="div_hltTemperature">
	                    		<canvas id="hltGauge" width="200" height="200"></span>
	                    	<span id="div_hltSetpoint"></span>
                    	</div>
                      <div id="div_hltVolume"></div>
                      <div id="div_hltTargetVolume"></div>
                      <div id="div_hltFlowRate"></div>
                      <div class="row">
                        	<div class="col-md-8">
                        		<div class="input-group">
														  <span class="input-group-addon" id="sizing-addon2"><i class="glyphicon glyphicon-fire"></i></span>
														  <input id="hltSetTemp" type="text" class="form-control" placeholder="Temp Set" aria-describedby="sizing-addon2" size="200">
														</div>
                        	</div>
                        	<div class="col-md-4">
                        		<button id="hltTempSetBtn" class="btn btn-default" type="button">Set Temp</button>
												  </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="panel panel-default vesselPanel">
                    <div class="panel-heading clearfix">
                    	<span id="mashLED" class="pull-left">
                    		<img src="images/redOffLED.png" width="20" height="20">
                    	</span>
                    	<h3 class="panel-title pull-left">Mash</h3>
                    	<button id="mashTimerButton" class="btn btn-default btn-xs pull-right" type="button">Timer Start</button>
                    </div>
                    <div class="panel-body">
                        <div class="row timer-top">
                        <div class="col-sm-12">
                        <div id="mashTempSet">
                        	<span id="div_mashTemperature">
                        		<canvas id="mashGauge" width="200" height="200"></canvas>
                        	</span>
                        	<canvas class="seg" id="mashDisplay" width="200" height="50">
													  Your browser is unfortunately not supported.
													</canvas>
                        	<span id="div_mashSetpoint">
                        	</span>
                        </div>
                        <div id="div_mashVolume"></div>
                        <div id="div_mashTargetVolume"></div>
                        <div id="div_mashFlowRate"></div>
                        <div class="row">
                        	<div class="col-md-8">
                        		<div class="input-group">
														  <span class="input-group-addon" id="sizing-addon2"><i class="glyphicon glyphicon-fire"></i></span>
														  <input id="mashSetTemp" type="text" class="form-control" placeholder="Temp Set" aria-describedby="sizing-addon2" size="200">
														</div>
                        	</div>
                        	<div class="col-md-4">
                        		<button id="mashTempSetBtn" class="btn btn-default" type="button">Set Temp</button>
												  </div>
                        </div>
                        <div class="row">
                        	<div class="col-md-8">
                        		<div id="mashTimePicker" class="bfh-timepicker"></div>
                        	</div>
                        	<div class="col-md-4">
                        		<button id="mashSetTimer" class="btn btn-default" type="button">Set Timer</button>
                        	</div>
                        </div>
                      </div>
					    			</div>
					</div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="panel panel-default vesselPanel">
                    <div class="panel-heading clearfix">
                    	<span id="boilLED" class="pull-left">
                    		<img src="images/redOffLED.png" width="20" height="20">
                    	</span>
                    	<h3 class="panel-title pull-left">
                    		Boil Kettle
                    	</h3>
                    	<button id="boilTimerButton" class="btn btn-default btn-xs pull-right" type="button">Timer Start</button>
                    </div>
                    <div class="panel-body" style="background-color: #000000;">
						<div class="row timer-top">
						<div class="col-sm-12">
							<div class="row">
								<div class="col-sm-6">
									<div id="kettleTempSet">
										<span id="div_kettleTemperature">
											<canvas id="boilGauge" width="200" height="200"></canvas>
										</span>
										<canvas class="seg" id="boilDisplay" width="200" height="50">
										  Your browser is unfortunately not supported.
										</canvas>
										<span id="div_kettleSetpoint">
										</span>
								  </div>
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

								</div>
							</div>
							<div class="row">
                <div class="col-md-8">
                <div id="boilTimePicker" class="bfh-timepicker"></div>
                </div>
                <div class="col-md-4">
                <button id="boilSetTimer" class="btn btn-default" type="button">Set Timer</button>
                </div>
              </div>
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
  <div id="extruderLeft" class="{title:'Settings'}">
  <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Network Setup
        </a>
      </h4>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">
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
      <div class="panel-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button id="settingsSaveBtn" type="button" class="btn btn-default" data-dismiss="modal">Save</button>
                </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingTwo">
      <h4 class="panel-title">
        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Temperature Probe Settings
        </a>
      </h4>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
      <div class="panel-body">
      	<ul>
      		<li>HLT: [Address]</li>
      		<li>Mash: [Address]</li>
      		<li>Boil: [Address]</li>
      		<li>Chill: [Address]</li>
      		<li>Aux 1: [Address]</li>
      		<li>Aux 2: [Address]</li>
      		<li>Aux 3: [Address]</li>
      	</ul>
      	<select>
      		<option value="">HLT</option>
      		<option value="">Mash</option>
      		<option value="">Boil</option>
      		<option value="">Chill</option>
      		<option value="">Aux 1</option>
      		<option value="">Aux 2</option>
      		<option value="">Aux 3</option>
      	</select>
      	<button>Scan and Set</button>
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingThree">
      <h4 class="panel-title">
        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Valve Profile Settings
        </a>
      </h4>
    </div>
    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
      <div class="panel-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingFour">
      <h4 class="panel-title">
        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          Recipe Settings
        </a>
      </h4>
    </div>
    <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
      <div class="panel-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingFive">
      <h4 class="panel-title">
        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
          Misc Settings
        </a>
      </h4>
    </div>
    <div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
      <div class="panel-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
</div>
</div>

</body>
<script src="js/brewtroller.js"></script>
<script src="js/cgiByteCodeMap.js"></script>
<script src="js/programData.js"></script>
<script>
	Brewtroller.init();
</script>
</html>
