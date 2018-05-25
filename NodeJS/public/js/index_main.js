
var socket = io("http://localhost:3000");
var list_devices;
PNotify.prototype.options.styling = "fontawesome";
PNotify.prototype.options.delay = 4000;
socket.on("who-are-you", function(){
    socket.emit("i-am-web");
});
socket.on("server-reponse-login", function(data){
    if(data.isLogin == true){
        notify("Thành công", "Đăng nhập thành công! ^^", "success");
        console.log("Đăng nhập thành công");
        list_devices = data.devices;
        if(list_devices.length > 0){
            show_content(0);
            for(var index in data.devices){
                console.log("Thiết bị:" + data.devices[index].name);
                var temp = sprintf("<a href='#' class='list-group-item' onclick='show_content(%d)'> %s - %s <img src='images/check.png'/> ></a>", index, data.devices[index].name, data.devices[index].id);
                $("#danh-sach-tram").append(temp);
            }
        }
        $("#div1").fadeOut(200, function(){
            $("#main-div").attr('class', 'container-login101');
        });
        $("#div2").delay(250).fadeIn(500);
        $("#footer").delay(250).fadeIn(500);
        $("#navbar").delay(250).fadeIn(500);
    }
    else{
        notify("Thất bại", "Đăng nhập thất bại! :(", "error");
        console.log("Đăng nhập thất bại");
    }
});

$(document).ready(function(){
    $("#div2").fadeOut();
    $("#div1").fadeOut();
    $("#footer").fadeOut();
    $("#navbar").fadeOut();
    $("#loader").delay(4000).fadeOut(200, function(){
        notify("Xin Chào", "Chào mứng đến với AutoSprinkler", "success");
        $("#div1").fadeIn(500);
    });
    console.log("Trang web đã sẵn sàng hoạt động");
    socket.emit("new-connection");
    $("#btn-login").click(function(){
        if($("#username").val() != "" && $("#password").val() != ""){
            socket.emit("web-send-login",
            {
                username: $("#username").val(),
                password: $("#password").val()
            });
            console.log("Đã gửi thông tin đăng nhập lên máy chủ");

        }
        else
            console.log("Vui lòng nhập thông tin đăng nhập!");
    });
});
function notify(title, text, type){
    new PNotify({
        title: title,
        text: text,
        type:type,
        animate: {
            animate: true,
            in_class: "fadeInRight",
            out_class: "fadeOutRight"
        },
        mobile: {
            styling: false
        }
    });
}

function show_content(index_device){
    $("#list-devices").html("");
    console.log(list_devices[index_device]);
    notify(list_devices[index_device].name, "Sẵn sàng", "success");
    for(var index in list_devices[index_device].valves){
        var temp = sprintf(
            "<div class='device'>"+
            "<div class='check'><img src='images/check.png' />' </div>"+
            "<div class='img-device'>"+
            "<img src='images/%s'>" +
            "</div>" +
            "<div class='type-device'> Relay %d </div>" +
            "<div class='status-device'><img src='images/%s.jpg' onclick='%s(%d);'/></div>"+
            "<div class='name-device'> %s </div>" +
            "<div class='setting-device'>" +
            "<a href='#dialog-box'><img class='rotate360' src='images/caidat.png' id='dialog-window' onclick='open_dialog(%d);'/></a>" +
            "<div class='text-setting-device'>Cài Đặt</div>"+
            "</div>" +
            "</div>",
            list_devices[index_device].valves[index].item,
            list_devices[index_device].valves[index].relay,
            list_devices[index_device].valves[index].status,
            list_devices[index_device].valves[index].status,
            index,
            list_devices[index_device].valves[index].name,
            index
        );
        $("#list-devices").append(temp);
    }
}

function open_dialog(i){
    //cho hiện bang dialog
     $('.dialog-devices').css("display", "block");
     // thêm phần tử id="over" vào sau body
     $('body').append('<div id="over">');
     $('#over').fadeIn(300);
     alert('id='+i);
}
function closed_dialog(){
    //ẩn bảng dialog
     $('.dialog-devices').css("display", "none");
     //xóa bỏ over
     $('#over').remove();
}
function save_dialog(){
    //code save thiet bi
    alert('save devices');

}
function ON(index){
  alert('bật thiết bị thứ: '+index);
}
function OFF(index){
  alert('tắt thiết bị thứ: '+index);
}
(function ($) {
    "use strict";


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }
        return check;
    });
    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });
    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }
    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }
    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
})(jQuery);
