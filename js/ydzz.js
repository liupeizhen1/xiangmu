import { header, onLogin} from './header.js';//引入头部js
import footer from './footer.js';//引入底部js


header('../common/header.html');//执行底部脚本

footer('../common/footer.html');//执行底部脚本

var timer = setInterval(function(){
    if($('.logo h1 a').length){
        $('.logo h1 a').attr('href','../index.html');       
    } 
    if($('.nav li[class=shouye] a').length){
        $('.nav li[class=shouye] a').attr('href','../index.html');
    }
    if($('.con4 ul li[class=wyjj] a').length){
        $('.con4 ul li[class=wyjj] a').attr('href','wyjj.html');
    }
    if($('.right dl dt a[class=wyjj]').length){
        $('.right dl dt a[class=wyjj]').attr('href','wyjj.html');
    }
    if($('.con4 ul li[class=ydzz] a').length){
        $('.con4 ul li[class=ydzz] a').attr('href','ydzz.html');
    }
    if($('.list dl dd[class=wyjj] a').length){
        $('.list dl dd[class=wyjj] a').attr('href','wyjj.html');
    }
    if($('.list dl dd[class=ydzz] a').length){
        $('.list dl dd[class=ydzz] a').attr('href','ydzz.html');
        clearInterval(timer);

    }
},0)




var num1 = localStorage.getItem('num');
window.onload = () => {
    if (num1 == '199608292019') {
        $('.input_suc li a').html('199608292019');
        $('.input_suc').css({
            display: 'block'
        });       
    }
    if (num1 == 'undefined') {
        $('.input_suc').css({
            display: 'none'
        });
    }
    
}
$(function () {
     
    // 我的包裹span点击样式切换
    $('.l_mybox .l_my_span span').click(function () {
        $('.l_mybox .l_my_span span').each(function (index, item) {
            // console.log(item);         
            $(item).removeAttr('class');
        })
        $(this).addClass('l_spanstyle')
    })
    // var number = $('.l_input .l_search').val();
    // var reg = /^[0-9]{12}$/;
    //     var rit = reg.test(number);
    //订单搜索输入验证
    var number
    $('.l_input .l_search').blur(function () {
        number = $('.l_input .l_search').val();
        if (number == '') {
            return;
        }
        if (number == '199608292019') {
            localStorage.setItem('num', number);
        }
        // console.log(number);
        var reg = /^[0-9]{12}$/;
        var rit = reg.test(number);
        // console.log(rit);
        if (rit) {
            var suc_p = document.createElement('p');
            $(this).before(suc_p);
            $(suc_p).addClass('l_odd_number l_suc_style');
            var suc_span = document.createElement('span');
            suc_span.innerText = number;
            var suc_b = document.createElement('b');
            suc_b.innerText = 'X';
            $(suc_p).append(suc_span);
            $(suc_p).append(suc_b);
            $('.l_input .l_search').attr('placeholder', '');
            $('.l_input .l_search').val(''); var p_width = $(suc_p).width();
            var i_width = $(this).width();
            $(this)[0].style.width = i_width - p_width - 27 + 'px';
            // console.log($(this).width());
            // 当单号正确是隐藏错误提示
            $('.l_inp_hint').css({
                display: 'none'
            });
            if (($(this).width()) < 90) {
                $(this).width(548);
                $(suc_p).css({
                    marginBottom: '10px'
                });
                $('.l_input').css({
                    height: $('.l_input .l_inp_len').height()+15 + 'px',
                })
                $('.l_input .l_del').css({
                    height: $('.l_input').height() + 'px',
                    lineHeight: $('.l_input').height() + 'px'
                })
                $('.l_input .l_btn').css({
                    height: $('.l_input').height() + 'px',
                    lineHeight: $('.l_input').height() + 'px'
                })
            }
            $(suc_p).bind("selectstart", function () { return false; });

            // 点击查询
            $('.l_input').on('click', '.l_btn', onlod)

        } else {
            var suc_p = document.createElement('p');
            $(this).before(suc_p);
            $(suc_p).addClass('l_odd_number l_err_style');
            var suc_span = document.createElement('span');
            suc_span.innerText = number;
            var suc_b = document.createElement('b');
            suc_b.innerText = 'X';
            $(suc_p).append(suc_span);
            $(suc_p).append(suc_b);
            $('.l_input .l_search').attr('placeholder', '');
            $('.l_input .l_search').val(''); var p_width = $(suc_p).width();
            var i_width = $(this).width();
            $(this)[0].style.width = i_width - p_width - 27 + 'px';
            // console.log($(this).width());
            $('.l_inp_hint').css({
                display: 'block'
            });
            $('.input_suc').css({
                display: 'none'
            });
            if (($(this).width()) < 90) {
                $(this).width(548);
                $(suc_p).css({
                    marginBottom: '10px'
                });
                $('.l_input').css({
                    height: $('.l_input .l_inp_len').height()+15 + 'px',
                })
                $('.l_input .l_del').css({
                    height: $('.l_input').height() + 'px',
                    lineHeight: $('.l_input').height() + 'px'
                })
                $('.l_input .l_btn').css({
                    height: $('.l_input').height() + 'px',
                    lineHeight: $('.l_input').height() + 'px'
                })
            }
            $(suc_p).bind("selectstart", function () { return false; });
        }
    })

    // 点击的函数
    function onlod() {
        //请求数据

        if (number == '199608292019') {
            $('.input_suc').css({
                display: 'block'
            });

            $('.input_suc li a').html('199608292019');
            $('.remarks_con .inner ul').css({
                display: 'block'
            });
            $.ajax({
                url: '../data/carriage.json',
                type: 'get',
                dataType: 'json',
                success: function (json) {
                    $('.remarks_con .inner ul li').each(function (index, item) {
                        $(item).remove();
                    });
                    var len = 0;
                    for (var i in json) {
                        // console.log(json[i])
                        var list = document.createElement('li');
                        $('.remarks_con .inner ul').append(list);
                        $(list).addClass('clearfix');
                        list.innerHTML = `<div class="con_left">
                    <strong>${json[i][0]}</strong>
                    <b><img src="../img/line_bg.png" alt=""></b>
                    <i>${json[i][1]}</i>
                </div>
                <div class="con_right">
                    <span>${json[i][2]}</span>
                </div>`
                        len += $(list).height();
                    }
                    $('.line').height(len - ($(list).height()) / 2);
                },
                error: function (err) {
                    alert('请求失败');
                    console.log(err.status);
                }
            })
            $('.l_tolead').css({
                display: 'block'
            });
            $('.remarks').css({
                display: 'block'
            });
            $('.re_title').css({
                display: 'none'
            });

        } else {           
            $('.l_tolead').css({
                display: 'block'
            });
            $('.remarks').css({
                display: 'block'
            });
            $('.remarks_con .inner ul').css({
                display: 'none'
            });
            $('.re_title').css({
                display: 'block'
            });
        }
    }
    // 点击确定和X隐藏
    $('.remarks').on('click', '.save', function () {

        $('.l_tolead').css({
            display: 'none'
        });
        $('.remarks').css({
            display: 'none'
        });
        $('.remarks .re_title').css({
            display: 'none'
        });

    });
    $('.remarks h2 span').click(function () {

        $('.l_tolead').css({
            display: 'none'
        });
        $('.remarks').css({
            display: 'none'
        });
        $('.remarks .re_title').css({
            display: 'none'
        });
    });
    $('.input_suc li span').click(function () {
        $('.input_suc').css({
            display: 'none'
        });
        localStorage.removeItem('num');
    })

    //点击单号时直接查找
    $('.l_see').on('click', '.input_suc li a', function () {       
        if (num1== '199608292019') {
            $('.input_suc').css({
                display: 'block'
            });

            $('.input_suc li a').html('199608292019');
            $('.remarks_con .inner ul').css({
                display: 'block'
            });
            $.ajax({
                url: '../data/carriage.json',
                type: 'get',
                dataType: 'json',
                success: function (json) {
                    $('.remarks_con .inner ul li').each(function (index, item) {
                        $(item).remove();
                    });
                    var len = 0;
                    for (var i in json) {
                        // console.log(json[i])
                        var list = document.createElement('li');
                        $('.remarks_con .inner ul').append(list);
                        $(list).addClass('clearfix');
                        list.innerHTML = `<div class="con_left">
                    <strong>${json[i][0]}</strong>
                    <b><img src="../img/line_bg.png" alt=""></b>
                    <i>${json[i][1]}</i>
                </div>
                <div class="con_right">
                    <span>${json[i][2]}</span>
                </div>`
                        len += $(list).height();
                    }
                    $('.line').height(len - ($(list).height()) / 2);
                },
                error: function (err) {
                    alert('请求失败');
                    console.log(err.status);
                }
            })
            $('.l_tolead').css({
                display: 'block'
            });
            $('.remarks').css({
                display: 'block'
            });
            $('.re_title').css({
                display: 'none'
            });

        } else {           
            $('.l_tolead').css({
                display: 'block'
            });
            $('.remarks').css({
                display: 'block'
            });
            $('.remarks_con .inner ul').css({
                display: 'none'
            });
            $('.re_title').css({
                display: 'block'
            });
        }
    })

    //点击X时删除
    $('.l_input').on('click', '.l_odd_number b', function () {
        $(this).closest('p').remove();
        // console.log($('.l_odd_number b').index());
        if ($('.l_odd_number b').index() == -1) {
            $('.l_search').attr('placeholder', '输入运单号进行查询，单次最多查询20条。请以空格、逗号或者回车键隔开');
            $('.l_search').width(568);
            $('.l_inp_hint').css({
                display: 'none'
            })
            $('.l_input').height(48);
            $('.l_input .l_del').css({
                height: $('.l_input').height() + 'px',
                lineHeight: $('.l_input').height() + 'px'
            })
            $('.l_input .l_btn').css({
                height: $('.l_input').height() + 'px',
                lineHeight: $('.l_input').height() + 'px'
            })
        }
        $('.l_search')[0].focus();
    })

    //点击删除图标清空
    $('.l_input').on('click', '.l_del', function () {
        $('.l_odd_number').remove();
        if ($('.l_odd_number b').index() == -1) {
            $('.l_search').attr('placeholder', '输入运单号进行查询，单次最多查询20条。请以空格、逗号或者回车键隔开');
            $('.l_search').width(568);
            $('.l_inp_hint').css({
                display: 'none'
            })
            $('.l_input').height(48);
            $('.l_input .l_del').css({
                height: $('.l_input').height() + 'px',
                lineHeight: $('.l_input').height() + 'px'
            })
            $('.l_input .l_btn').css({
                height: $('.l_input').height() + 'px',
                lineHeight: $('.l_input').height() + 'px'
            })
        }
    })

    //点击登录注册；
    $('.l_see_btn').click(onLogin);

    //预约点击框变长重复gif图

    $('.l_btn_inner').mouseenter(function () {
        var num = 0;
        var timer;
        $('.l_inner_box img').removeAttr('src');
        $('.l_inner_box img').attr('src', '../img/yd_home.gif');
        // console.log($(this)[0],this);
        clearInterval(timer);
        var self = this;
        timer = setInterval(function () {
            num++
            self.style.paddingLeft = num + 'px';
            self.style.paddingRight = num + 'px';
            // console.log(num);           
            if (num >= 15) {
                clearInterval(timer);
            }
        }, 20)
        //右箭头淡出
        $('.l_right_jt').fadeIn()
    })
    $('.l_btn_inner').mouseleave(function () {
        var num = parseInt($(this).css('padding-left'));
        // console.log($(this)[0],this);
        // console.log(num);     
        var self = this;
        var timer = setInterval(function () {
            num--
            self.style.paddingLeft = num + 'px';
            self.style.paddingRight = num + 'px';
            console.log(num);
            if (num <= 0) {
                clearInterval(timer);
            }
        }, 30)
        //右箭头淡出
        $('.l_right_jt').fadeOut()
    })


    // 点击预约寄件时跳到寄件的页面
    $('.l_inner_box').click(function(){
        window.open('wyjj.html','_self');
    })

})