document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    $(".enterPinButton").on ("click", function(){
        $.ajax({
            method: "GET",
            url: $('#URL').val()+"/api/start_vr_exercise",
            data : {"pin" : parseInt($('#pinnumber').val())},
            dataType: "json",
        }).done(function (info) {        
            if (info["status"] == "OK"){
                console.log(info)
                localStorage.setItem("URL", $('#URL').val())
                localStorage.setItem("current-username", info['username'])
                localStorage.setItem("current-vr-task", info['VRexerciceID'])
                localStorage.setItem("current-pin", $('#pinnumber').val())
                window.location.assign('task.html');
            } else if (info["status"] != "OK"){
                alert(info["message"])
            }
        }).fail(function () {
            alert("URL incorrecta, por favor introduzca una url valida.");
        });
    });

    $(".sendDataButton").on ("click", function(){
        $.ajax({
            method: "POST",
            url: localStorage.getItem("URL")+"/api/finish_vr_exercise",
            body: JSON.stringify({"pin" : localStorage.getItem("current-pin"),
                "passed_items" : $('#passed_items').val(),
                "failed_items" : $('#failed_items').val(),
                "grade" : $('#grade').val(),
                "comments" : $('#comments').val()}),
            dataType: "json",
        }).done(function (info) {        
            if (info["status"] == "OK"){
                console.log(info)
            } else if (info["status"] != "OK"){
                alert(info["message"])
            }
        }).fail(function () {
            alert("URL incorrecta, por favor introduzca una url valida.");
        });
    });
}
