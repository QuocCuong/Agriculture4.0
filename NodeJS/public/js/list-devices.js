function get_list_devices(data){
var list_device_data="";
var counts_device=data.devices.length;
list_device_data+="<div id='list-devices'>";
for(var i=0;i<counts_device;i++){
  list_device_data+="<div class='device'>";
    list_device_data+="<div class='img-device'>";
      list_device_data+="<img src='images/"+data.devices[i].image+"' />";
    list_device_data+="</div>";
    list_device_data+="<div class='type-device'>";
      list_device_data+=data.devices[i].type;
    list_device_data+="</div>";
    list_device_data+="<div class='name-device'>";
      list_device_data+=data.devices[i].name;
    list_device_data+="</div>";
    list_device_data+="<div class='sumit-device'>";
      list_device_data+="<a id='dialog-window' href='#dialog-box' onclick='open_dialog("+i+");'> chỉnh sửa</a>";
    list_device_data+="</div>";
  list_device_data+="</div>";
}
list_device_data+="</div>";
$('#list-devices').replaceWith(list_device_data);
}
function open_dialog(i){
      //cho hiện bang dialog
       $('.dialog-devices').css("display", "block");
       // thêm phần tử id="over" vào sau body
       $('body').append('<div id="over">');
       $('#over').fadeIn(300);
       //alert('id='+i);
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
