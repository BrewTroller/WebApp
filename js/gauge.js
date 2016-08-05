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
//var printBoilControl = function (id, data)
//{
//$(id).html("Boil Control: " + data);
//}

function printProgramThread(id, step, recipe)
{
    $(id).html("Step: " + step + " Recipe: " + recipe);
}

/*
 * var printTimer = function (id, value, status) { if(status == 0) { rStatus =
 * "Off"; }else{ rStatus == "On"; } $(id).html("Set Time: " + value/1000 + "
 * seconds <br>Status: " + rStatus); }
 */

//var printOutputProfiles = function (id, status)
//{
//$(id).html("Output Profiles: " + status);
//}

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