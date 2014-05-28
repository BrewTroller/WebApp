<!DOCTYPE html>
<html>
<head>
<title>WebAppTroller - A web interface for Brewtroller</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
<!-- Optional theme -->
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css">
<link rel="stylesheet" href="css/jquery.sidr.light.css">
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/slider.css">
<link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

<!-- Latest compiled and minified JavaScript -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
<script src="js/jquery.sidr.min.js"></script>
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
        $(id).html("Temperature: " + (temperature == 4294934528 ? "N/A" : (temperature / 100.0 + "F")));
    }
    
    function printSetpoint(id, setpoint)
    {
        $(id).html("Setpoint: " + (setpoint == 0 ? "N/A" : (setpoint / 100.0 + "F")));
    }
    
    function printHeatPower(id, heatPower)
    {
        $(id).html("Heat Power: " + (heatPower == 0 ? "Off" : heatPower == 100 ? '<span class="text text-danger">On</span>' : (heatPower + "%")));
    }
    
	function printVolume(id, volume)
    {
        $(id).html("Volume: " + volume / 1000.0 + " Gal");
    }
    
    function printTargetVolume(id, target)
    {
        $(id).html("Target Volume: " + target / 1000.0 + " Gal");
    }
    
    function printFlowRate(id, flowrate)
    {
        $(id).html("Flow Rate: " + flowrate + " Gal/min");
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
    
    function printOutputProfiles(id, status)
    {
        $(id).html("Output Profiles: " + status);
    }
    
    function printOutputStatus(id, status)
    {
        $(id).html("Output Status: " + status);
    }
    
    function click_setTimer(vessel) {
      var timerId = "";
      var setTime = "";
      if (vessel == "mash") {
        timerId = 0;
        setTime = $('#mashTimerSet').val();
        a = "werwe";
      } else if (vessel == "boil") {
        timerId = 1;
        setTime = $('#boilTimerSet').val();
        b = "wefawe";
      } else {
        alert("Unable To Set Timer");
      }
      brewTrollerExecCommand(BTCMD_SetTimerValue, timerId, {"TimerValue": setTime}, host, username, password, function(data){
        });
      
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
                      Brewtroller.connected.loop();
                      $('#simple-menu').sidr();
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
                <a class="navbar-brand" href="#">WebAppTroller - A web interface for Brewtroller<span id="tempStatus"></span></a>
            </div>
            
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Development <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="#" data-toggle="modal" data-target="#statusData">Status Data</a></li>
                            <li><a href="#" onClick="click_buttonAlarmOn();">Set Alarm</a></li>
                        </ul>
                    </li>
                    
                    <li><a href="#" id="button_connect">Connect</a></li>
                    <li><a href="#" class="btn-lg" data-toggle="modal" data-target="#modal_settings"><span class="glyphicon glyphicon-cog"></a></li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
    <div class="container">
        <div class="row">
        <div class="col-sm-5">
          <div id="mashZonePanel" class="panel panel-default">
          	<div class="panel-heading">
           	  <h3 class="panel-title">
           		Mash Zone
           	  </h3>
           </div>
           <div class="panel-body">
  			 <p id="programSlot1" class="alert alert-success" style="padding:5px;"><span class="program1Name">No Program Selected (1)</span> : <span id="currStatusProg1"></span></p>
  		   </div>	
       	 </div>
       	</div>
       	<div class="col-sm-5">
       	  <div id="boilZonePanel" class="panel panel-default">
          	<div class="panel-heading">
           	  <h3 class="panel-title">
           		Boil Zone
           	  </h3>
           </div>
           <div class="panel-body">
  			 <p id="programSlot2" class="alert alert-success" style="padding:5px;"><span class="program2Name">No Program Selected (2)</span> : <span id="currStatusProg2"></span></p>
  		   </div>	
       	  </div>
        </div>
        <div class="col-sm-2">
        	<div class="btn-group">
				  <button id="button_nextStep" type="button" class="btn btn-default">Next Step</button>
				  <button id="button_reset" type="button" class="btn btn-default">Reset</button>
					</div>
        </div>
        </div>
        </div>
        <div class="row">
            <div class="col-sm-5">
                <div id="programThreadPanel" class="panel panel-default">
                    <div class="panel-heading clearfix">
                    	<h3 class="panel-title pull-left">
                    		Program Threads
                    	</h3>
                    	<div class="btn-group pull-right">
	                    	<button id="beerXMLModalButton" data-toggle="modal" data-target="#modal_beerXMLLoader" class="btn btn-default btn-xs" type="button">Import Beer XML</button>
	                    	<button id="programModalButton" data-toggle="modal" data-target="#modal_programPicker" class="btn btn-default btn-xs" type="button">Load Recipe</button>
                    	</div>
                    </div>
                    <div class="panel-body">
                        <div id="div_programThread1"></div>
                        <div id="div_programThread2"></div>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div id="mashTimerPanel" class="panel panel-default">
                    <div class="panel-heading clearfix">
                    	<h3 class="panel-title pull-left">Mash Timer</h3>
                    	<button id="mashTimerButton" class="btn btn-default btn-xs pull-right" type="button">Manual Start</button>
                    </div>
                    <div class="panel-body" id="div_mashTimer"></div>
                    <div class="row">
									  <div class="col-md-12">
									    <div class="input-group">
									      <span class="input-group-btn">
									        <button class="btn btn-default" type="button" onClick="click_setTimer('mash');">Manual Set</button>
									      </span>
									      <input id="mashTimerSet" type="text" class="form-control">
									    </div><!-- /input-group -->
									  </div><!-- /.col-lg-6 -->
									</div><!-- /.row -->
                </div>
            </div>
            <div class="col-sm-3">
                <div id="boilTimerPanel" class="panel panel-default">
                    <div class="panel-heading clearfix">
                    	<h3 class="panel-title pull-left">Boil Timer</h3>
                    	<button id="boilTimerButton" class="btn btn-default btn-xs pull-right" type="button">Manual Start</button>
                   	</div>
                    <div class="panel-body" id="div_boilTimer"></div>
                    <div class="row">
									  <div class="col-md-12">
									    <div class="input-group">
									      <span class="input-group-btn">
									        <button class="btn btn-default" type="button" onClick="click_setTimer('boil');">Manual Set</button>
									      </span>
									      <input id="boilTimerSet" type="text" class="form-control">
									    </div><!-- /input-group -->
									  </div><!-- /.col-lg-6 -->
									</div><!-- /.row -->
                </div>
            </div>
            <div class="col-sm-1 text-right">
                <div class="row">
                	<div class="col-sm-12">
                		<button id="button_alarm" class="btn btn-default btn-lg" onClick="click_buttonAlarm('mash');"><span class="glyphicon glyphicon-warning-sign"></span></button>
                	</div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4">
            	<div class="row">
                <div class="panel panel-default">
                    <div class="panel-heading"><h3 class="panel-title">Hot Liquor</h3></div>
                    <div class="panel-body">
                        <div id="div_hltTemperature"></div>
                        <div id="div_hltSetpoint"></div>
                        <div id="div_hltHeatPower"></div>
                        <div id="div_hltVolume"></div>
                        <div id="div_hltTargetVolume"></div>
                        <div id="div_hltFlowRate"></div>
                        <div class="input-group">
					      <span class="input-group-btn">
					        <button id="hltTempSetBtn" class="btn btn-default" type="button"">Set Temp</button>
					      </span>
					      <input id="hltTempSet" type="text" class="form-control">
					    </div><!-- /input-group -->
				</div>
                </div>
            	</div>
            </div>
            <div class="col-sm-4">
                <div class="panel panel-default">
                    <div class="panel-heading"><h3 class="panel-title">Mash</h3></div>
                    <div class="panel-body">
                        <div id="div_mashTemperature"></div>
                        <div id="div_mashSetpoint"></div>
                        <div id="div_mashHeatPower"></div>
                        <div id="div_mashVolume"></div>
                        <div id="div_mashTargetVolume"></div>
                        <div id="div_mashFlowRate"></div>
                        <div class="input-group">
					      <span class="input-group-btn">
					        <button id="mashTempSetBtn" class="btn btn-default" type="button"">Set Temp</button>
					      </span>
					      <input id="mashTempSet" type="text" class="form-control">
					    </div><!-- /input-group -->
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="panel panel-default">
                    <div class="panel-heading">
                    	<h3 class="panel-title">
                    		Boil Kettle
                    	</h3>
                    </div>
                    <div class="panel-body">
						<div class="row">
							<div class="col-sm-6">
								<div id="div_kettleTemperature"></div>
								<div id="div_kettleSetpoint"></div>
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
            </div>
        </div>
        <div  class="row">
            <div class="col-sm-12">
                <div id="div_outputProfiles" class="well well-sm"></div>
				<div id="div_outputStatus" class="well well-sm"></div>
            </div>
        </div>
        <div class="row">
        <a id="simple-menu" href="#sidr">Toggle menu</a>
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
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">Connection Issue</h4>
                </div>
                <div class="modal-body" id="recipeModalBody">
                    <h3 class="text-danger">Connection Timeout - Please Wait</h3>
                    <i class="fa fa-spinner fa-spin fa-5x"></i>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
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
