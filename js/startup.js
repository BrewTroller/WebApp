$(document).ready(function(){
    $('#settings-button').sidr({
        name: 'sidr-host-settings',
        side: 'left',
        renaming: false,
        source: '#bt-host-settings',
        onOpen: function () {
            console.log($.sidr('status'));
        },
        onClose: function () {
            console.log($.sidr('status'));
        },
        onOpenEnd: function () {
            console.log($.sidr('status'));

//            var storedHost = localStorage.getItem('btHost');
//            var currentHost = $('#sidr-host-settings #settingsHost').attr('placeholder');
//            var placeholderData = $('#sidr-host-settings #settingsHost').data('placeholder');
            
//            console.log('storedHost ' + storedHost);
//            console.log('currentHost ' + currentHost);
//            console.log('placeholderData ' + placeholderData);


            var host = (storedHost) ? storedHost : ""; 
            $('#sidr-host-settings #settingsHost').val(host);
            $('#sidr-overlay').removeClass('hide');
        },
        onCloseEnd: function () {
            console.log($.sidr('status'));

            $('#sidr-overlay').addClass('hide');
        },
    });

    $('#sidr-host-settings button#settingsCancelBtn').on('click',
        function () {
            $.sidr('close', 'sidr-host-settings');
        }
    );
    
    $('#sidr-host-settings input#settingsHost').on('input',
        function () {
            var $this = $('#sidr-host-settings input#settingsHost');
            var input = $this.val();
            console.log('input: ' + input);
            if ((input && !storedHost) || (input && input !== storedHost)) {
                $('button#settingsSaveBtn').removeAttr('disabled');
            } else {
                $('button#settingsSaveBtn').attr('disabled', true);
            }
        }
    );
    $('#sidr-host-settings button#settingsSaveBtn').on("click", function() {
        Brewtroller.connected.saveConnectionSettings();
        $.sidr('close', 'sidr-host-settings');
    });

});
