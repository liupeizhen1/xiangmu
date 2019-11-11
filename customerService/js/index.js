var mySwiper = new Swiper('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 2000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
})
$('.el-tabs_header p span').click(function(){
    $(this).addClass('active')
    $(this).siblings().removeClass('active')
})   
var rum = $('.el-tabs_content').height()
$('.el-tab-pane').height(rum/1.9)   
window.onresize = function(){
    var rum = $('.el-tabs_content').height()
    $('.el-tab-pane').height(rum/2)
}
$('.notice-close').click(function(){
    $('.sf-bar').css('display','none')
})
$('.chat-sound').click(function(){
   if($(this).children().attr('src') == 'img/1020.png'){
    $(this).children().attr('src','img/1021.png')
   }else(
    $(this).children().attr('src','img/1020.png')
   )
})
// 自定义弹出框
function myalert(str) {
    var div = '<div class="'+str+'"></div>';
    $('body').append(div);
    $('.'+str).show();
    setTimeout(function() {
      $('.'+str).hide();
      $('.'+str).remove();
    }, 2000)
}
$('.tool-expression .img3').click(function(){
    myalert('mark')
})
$('.tool-expression .img1').click(function(){
    myalert('mark1')
})
$('.tool-expression .img2').click(function(){
    myalert('mark2')
})
// 结束对话跳转
$('.submit-btn1').click(function(){
    history.go(-1)
})
//编辑输出内容
$('.app-chat_import')
function addIpunt(){
    var input = $('<input ytpe="text" placeholder="请输入你的内容" class="import-in">');
    $('.app-chat_import').prepend (input)
    $(input).focus();
}
addIpunt()
// 获取事件
function dataChat(){
    var data = new Date();
    var hours = data.getHours();
    hours = hours > 9 ? hours : '0' + hours;
    var mins = data.getMinutes();
    mins = mins > 9 ? mins : '0' + mins;
   return hours + ':' + mins
}
var dara = dataChat()
$('.chat-container .cont-centen>p').text(dara);
//监听input事件
$('.import-in').keydown(function(){
    $('.left-btn2').css({
        'background':'#FF706F',
        'color':'#fff',
        'cursor': 'pointer',
    })
    $('.left-btn2').removeAttr('disabled')
})
$('.left-btn2').click(function(){
    var oDiv2 = $('<div class="cont-right"></div>')
    var values = $('.import-in').val();
    $(oDiv2).text(values);
    var oDiv = $('<div class="cont-rights"></div>')
   $(oDiv).append(oDiv2)
    $('.chat-container .cont-centen').append(oDiv);
    $('.import-in').val('');
    ajax({
        url: './data/data.php',
        type: 'get',
        data: 'age=' + values,
        success: function (data) {
        //    console.log(JSON.parse(data));
        var obj = JSON.parse(data);
        if(obj.span2){
            var cont = obj.span;
            var cont2 = obj.span2;
            var content = `<div class="left-left">
            <img src="img/ia_10011.jpg" alt="">
        </div>
        <div class="left-right">
            <span>${cont}</span><br>
            <span>${cont2}</span><br>
        </div>`;
        $('.cont-centen').append(content);
        }else{
            var cont = obj.span;
            var content = `<div class="left-left">
            <img src="img/ia_10011.jpg" alt="">
        </div>
        <div class="left-right">
            <span>${cont}</span><br>
        </div>`;
        $('.cont-centen').append(content);
        };
       
        },
        failed: function (status) {
            alert('请求失败');
        }
    })
    
})
//自动回复
function ajax(option){
    var xhr = new XMLHttpRequest();
    if(option.type == 'get' || option.type == 'GET'){
        xhr.open(option.type,option.url + '?' + option.data + '&_=' + new Date().getTime(),true)
        xhr.send(null)
    }else if(option.type == 'post' || option.type == 'POST'){
        xhr.open(option.type,option.url,true)
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
        xhr.send(option.data)
    }else{
        alert('目前仅支持get和post请求方式')
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                option.success(xhr.responseText)
            }else{
                option.failed(xhr.status)
            }
        }
    }
}

