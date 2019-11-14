import {header,onLogin} from './header.js';//引入头部js
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

$(function () {
    

    // 切换nav
    $('.l_wyjj_nav a').click(function () {
        $('.l_wyjj_nav a').each(function (index, item) {
            // console.log(item);         
            $(item).removeAttr('class');
        })
        $(this).addClass('l_a_active');
        // console.log($(this).index());
        if ($(this).index() == 0) {
            $('.l_wyjj_content').css({
                display: 'block'
            })
            $('.second').css({
                display: 'none'
            })
            $('.l_ewmjj').css({
                display: 'none'
            })
        }
        if ($(this).index() == 1) {
            $('.l_wyjj_content').css({
                display: 'none'
            })
            $('.second').css({
                display: 'block'
            })
            $('.l_ewmjj').css({
                display: 'none'
            })
        }
        if ($(this).index() == 2) {
            $('.l_wyjj_content').css({
                display: 'none'
            })
            $('.second').css({
                display: 'none'
            })
            $('.l_ewmjj').css({
                display: 'block'
            })
        }
    });

    //验证寄快递模块的表单
    function click_next(label, name, phone, city, adress, send, take, li_num) {

        $(label).click(function () {
            // 验证手机号的正则 
            var tel = $('.l_wyjj_inp[name = ' + phone + ']').val();
            var reg = /^[1][0-9]{10}$/;
            var rit = reg.test(tel);
            notarize('' + name + '', 'ipt1');//先判断有没有输入名字
            //判断输入了名字后，手机输入是否符合正则
            if ($('.l_wyjj_inp[name = ' + name + ']').val()) {
                notarize('' + phone + '', 'ipt2');
                if ($('.l_wyjj_inp[name = ' + phone + ']').val()) {
                    if (!rit) {
                        $('.l_popup[code = ipt2]').text('您输入的手机号码格式不正确，请重新输入');
                        $('.l_popup[code = ipt2]').css({
                            display: 'block'
                        })
                        setTimeout(function () {
                            $('.l_popup[code = ipt2]').css({
                                display: 'none'
                            })
                        }, 2000)
                    }
                }
            }
            //判断输入手机号
            if ($('.l_wyjj_inp[name = ' + phone + ']').val() && rit) {
                notarize('' + city + '', 'ipt3');
            }
            //判断输入地区
            if ($('.l_wyjj_inp[name = ' + city + ']').val()) {
                notarize('' + adress + '', 'ipt4');
            }
            //判断输入详细地址后代表所有都输入了
            if ($('.l_wyjj_inp[name = ' + adress + ']').val()) {
                //切换下一步
                $('' + send + '').css({
                    display: 'none'
                });
                $('' + take + '').css({
                    display: 'block'
                });
                $('.l_wyjj_step ul li').each(function (index, item) {
                    // console.log(item);         
                    $(item).removeAttr('class');
                })
                $('.l_wyjj_step ul li[code = ' + li_num + ']').addClass('l_li_active');
                // $('.l_wyjj_inp').val('');
            }
        })
    }
    //模块一寄快递
    //验证寄方的表单
    click_next('.l_send .l_next_btn span', 'name', 'phone', 'city', 'adress', '.l_send', '.l_take', 'li2');
    //模块一寄快递
    //验证收方的表单
    click_next('.l_take .l_next_btn span', 'name1', 'phone1', 'city1', 'adress1', '.l_take', '.l_reserve', 'li3');

    //添加收件人；
    $('body').click(function (e) {
        var target = e.target;
        // console.log(target);
        // console.log($('.l_addorsave .l_add .l_add_top')[0]); 
        //点击时更改样式 ， 用target的原因是当点击别的地方需要隐藏。
        if (target == $('.l_addorsave .l_add .l_add_top')[0]) {
            $(target).css({
                background: '#f1f1f1'
            });
            $('.l_add .l_add_list').css({
                display: 'block'
            })
        } else {
            $('.l_addorsave .l_add .l_add_top').css({
                background: '#fff'
            });
            $('.l_add .l_add_list').css({
                display: 'none'
            })
        }
    });

    //点击添加收件人
    $('.l_take').on('click', '.l_add_list .add', function () {
        addpeople();
        //添加时显示num
        $('.r-index').css({
            display: 'block'
        })
        // console.log($('.l_take_msg1').index())
    });

    //添加收件人的函数
    function addpeople() {
        var div = document.createElement('div');
        $('.l_take .l_addorsave').before(div);
        $(div).addClass('l_take_msg1');
        div.innerHTML = `<div class="l_mesg">
        <div class="l_m_left">
            <b class="delete iconfont iconshanchu"></b>
            <span>收方信息</span>
            <span class="r-index">- <strong class="l_take_num">${$('.l_take_msg1').index() + 1}</strong></span>
            <i>标*为必填项</i>
        </div>
        <div class="l_m_right">
            <span><i class="iconfont icondizhibu1"></i> 使用地址簿</span>
            <span><i class="iconfont icontianxie"></i> 智能地址填写</span>
        </div>
    </div>
    <div class="l_inp_msg">
        <div class="l_inp_left">
            <div class="l_inp_t"><b>*</b>
                姓名</div>
            <input type="text" name="name1" class="l_wyjj_inp" placeholder="请填写联系人姓名">
            <div class="l_popup" code="ipt1">
                <i></i>
                这是必填字段
            </div>
        </div>
        <div class="l_inp_right">
            <div class="l_inp_t">公司名称</div>
            <input type="text" class="l_wyjj_inp" placeholder="请填写公司名称">
        </div>
    </div>
    <div class="l_inp_msg">
        <div class="l_inp_left">
            <div class="l_inp_t">手机号码</div>
            <input type="text" name="phone1" class="l_wyjj_inp" placeholder="请填写手机号码">
            <div class="l_popup" style="bottom: -62px;" code="ipt2">
                <i></i>
                手机号码、固话号码请至少填一项
            </div>
        </div>
        <div class="l_inp_right">
            <div class="l_inp_t">固话</div>
            <input type="text" class="l_wyjj_inp" placeholder="请填写固话号码">
        </div>
    </div>
    <div class="l_inp_msg">
        <div class="l_inp_only">
            <div class="l_inp_t"><b>*</b> 省市区</div>
            <input type="text" name="city1" class="l_wyjj_inp l_wyjj_inp_len" placeholder="请选择所在地区，例如：广东省-深圳市-福田区">
            <a href="##" class="iconfont icondidian"></a>
            <div class="l_popup" code="ipt3">
                <i></i>
                这是必填字段
            </div>
        </div>
    </div>
    <div class="l_inp_msg">
        <div class="l_inp_only">
            <div class="l_inp_t"><b>*</b> 详细地址</div>
            <input type="text" name="adress1" class="l_wyjj_inp l_wyjj_inp_len" placeholder="请填写所在街道以及详细地址">
            <div class="l_popup" code="ipt4">
                <i></i>
                这是必填字段
            </div>
        </div>
    </div>`;
    }

    //从Excel添加
    $('.l_take').on('click', '.l_add_list .excel', function () {
        $('.l_tolead').css({
            display: 'block'
        })
        $('.tolead_box').css({
            display: 'block'
        })
    });

    //隐藏Excel添加
    $('.tolead_box h2 span').click(function () {
        $('.l_tolead').css({
            display: 'none'
        })
        $('.tolead_box').css({
            display: 'none'
        })
    });

    //添加Excel的路径去input框
    $('.to_input .mid_file').change(function () {
        var file = this.files[0];
        if (window.FileReader) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            //监听文件读取结束后事件    
            reader.onloadend = function (e) {
                $(".to_input .mid_input").val(e.target.result);    //e.target.result就是最后的路径地址
                console.log(e.target.result);

            };
        }
    });

    //删除添加的收件人
    $('.l_take').on('click', '.delete', function () {
        $(this).closest('div[class=l_take_msg1]').remove();
        //删除后给num重新赋值
        $('.l_take_msg1').each(function (index, item) {
            $(item).find('strong[class=l_take_num]').html('' + (index + 1) + '');
        })
        //判断num=1时不显示
        if (($('.l_take_msg1').index() + 1) == 1) {
            $('.r-index').css({
                display: 'none'
            })
        }
    });


    //返回上一步take
    $('.l_take .l_next_btn .l_last_step').click(function () {
        $('.l_send').css({
            display: 'block'
        });
        $('.l_take').css({
            display: 'none'
        });
        //切换nav样式
        $('.l_wyjj_step ul li').each(function (index, item) {
            // console.log(item);         
            $(item).removeAttr('class');
        })
        $('.l_wyjj_step ul li[code = li1]').addClass('l_li_active')
    });

    //返回上一步reserve
    $('.l_reserve .l_next_btn .l_last_step').click(function () {
        $('.l_take').css({
            display: 'block'
        });
        $('.l_reserve').css({
            display: 'none'
        });
        //切换nav样式
        $('.l_wyjj_step ul li').each(function (index, item) {
            // console.log(item);         
            $(item).removeAttr('class');
        })
        $('.l_wyjj_step ul li[code = li2]').addClass('l_li_active')
    });
    // 模块一
    //判断是否有输入东西
    function notarize(n_attr, i_attr) {
        if (!$('.l_wyjj_inp[name = ' + n_attr + ']').val()) {
            $('.l_popup[code = ' + i_attr + ']').css({
                display: 'block'
            })
            setTimeout(function () {
                $('.l_popup[code = ' + i_attr + ']').css({
                    display: 'none'
                })
            }, 2000)
        }
    }


    // 模块2
    //判断是否有输入东西
    function notarize1(n_attr, i_attr) {
        if (!$('.second .l_inp_msg input[name = ' + n_attr + ']').val()) {
            $('.l_popup[code = ' + i_attr + ']').css({
                display: 'block'
            })
            setTimeout(function () {
                $('.l_popup[code = ' + i_attr + ']').css({
                    display: 'none'
                })
            }, 2000)
        }
    }
    // 模块2寄大件快递
    $('.second .l_take input[name = take_city]').blur(function () {
        if ($('.second .l_send input[name = city]').val() && $('.second .l_take input[name = take_city]').val()) {

            $('.l_place_order button').removeClass('l_disable');
            $('.l_place_order button').addClass('l_nodisable');
        }
    });

    //点击下单。
    $('.second').on('click', '.l_place_order .l_nodisable', function () {
        var tel = $('.second .l_send input[name=phone]').val();
        var reg = /^[1][0-9]{10}$/;
        var rit = reg.test(tel);
        panduan('.second .l_send input[name=name]', '.second .l_send .l_popup[code = ipt1]');
        if ($('.second .l_send input[name=name]').val()) {
            panduan('.second .l_send input[name=phone]', '.second .l_send .l_popup[code = ipt2]');
            if ($('.second .l_send input[name=phone]').val()) {
                if (!rit) {
                    $('.second .l_send .l_popup[code = ipt2]').text('您输入的手机号码格式不正确，请重新输入');
                    $('.second .l_send .l_popup[code = ipt2]').css({
                        display: 'block'
                    })
                    setTimeout(function () {
                        $('.second .l_send .l_popup[code = ipt2]').css({
                            display: 'none'
                        })
                    }, 2000)
                }
                $('.second').css({
                    display: 'none'
                });
                $('.l_wyjj_content').css({
                    display: 'block'
                });
                $('.l_wyjj_content .l_send').css({
                    display: 'none'
                });
                $('.l_reserve').css({
                    display: 'block'
                });
                $('.l_wyjj_step ul li').each(function (index, item) {
                    // console.log(item);         
                    $(item).removeAttr('class');
                })
                $('.l_wyjj_step ul li[code = li3]').addClass('l_li_active');
                document.documentElement.scrollTop = 0;
            }
        }
        // //判断输入手机号
        // if ($('.l_big_content .l_send input[name=phone]').val() && rit) {
        //     notarize('.l_big_content .l_send input[name=adress1]', '.l_big_content .l_send .l_popup[code = ipt4]');
        // }
        panduan('.second .l_take input[name=take_name]', '.second .l_take .l_popup[code = take_ipt1]');
        if ($('.second .l_take input[name=name]').val()) {
            panduan('.second .l_take input[name=take_phone]', '.second .l_take .l_popup[code = take_ipt2]');
            if ($('.second .l_take input[name=take_phone]').val()) {
                if (!rit) {
                    $('.second .l_take .l_popup[code = take_ipt2]').text('您输入的手机号码格式不正确，请重新输入');
                    $('.second .l_take .l_popup[code = take_ipt2]').css({
                        display: 'block'
                    })
                    setTimeout(function () {
                        $('.l_second .l_take .l_popup[code = take_ipt2]').css({
                            display: 'none'
                        })
                    }, 2000)
                }
            }
        }

    })

    //判断函数
    function panduan(mark, ipt) {
        if (!$(mark).val()) {
            $(ipt).css({
                display: 'block'
            })
            setTimeout(function () {
                $(ipt).css({
                    display: 'none'
                })
            }, 2000)
        }
    }

    //预约信息的JS

    //点击原点切换样式
    $('.l_reserve .reserve_top p a').click(function () {
        $('.l_reserve .reserve_top p a i b').each(function (index, item) {
            // console.log(item);         
            $(item).removeAttr('class');
        });
        // console.log($(this).index())
        $(this).find('i b').addClass('l_circle');
        if (!$(this).index()) {
            $('.l_on_door label').fadeIn();
            $('.l_on_door .on_door_time').fadeIn();
            $('.l_send_msg').fadeIn(out());
            function out() {
                $('.l_on_door .l_title').fadeOut();
            }
        }
        if ($(this).index()) {
            $('.l_on_door .l_title').fadeIn(goin());
            function goin() {
                $('.l_on_door label').fadeOut();
                $('.l_on_door .on_door_time').fadeOut();
                $('.l_send_msg').fadeOut();
            }
        }
    });

    //设置时间啊！

    var date = new Date();
    var to_year = date.getFullYear();
    var to_month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var to_day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $('.time_top li p[day = today]').html(to_year + '-' + to_month + '-' + to_day);
    $('.time_top li p[day = tomorrow]').html(to_year + '-' + to_month + '-' + (to_day + 1));
    $('.time_top li p[day = after_tomorrow]').html(to_year + '-' + to_month + '-' + (to_day + 2));
    var to_hours = date.getHours();
    if (to_hours == date.getHours()) {
        var time_li = document.createElement('li');
        var time_b = document.createElement('b');
        $('.time_bot').append(time_li);
        time_li.appendChild(time_b);
        time_b.innerHTML = '一小时内';
        $(time_b).addClass('b_active');
        addTime(to_hours);
    }
    // 点击显示
    $('body').click(function (e) {
        var target = e.target;
        // console.log(target);
        if (target == $('.one_hour')[0]) {
            $('.time_list').css({
                display: 'block'
            })
        } else if (target == $('.on_door_time .time_list .time_top')[0]) {
            $('.time_list').css({
                display: 'block'
            })
        } else if (target == $('.on_door_time .time_list .time_bot')[0]) {
            $('.time_list').css({
                display: 'block'
            })
        } else if (target == $('.on_door_time .time_list')[0]) {
            $('.time_list').css({
                display: 'block'
            })
        } else if (target == $('.time_top li p[time = today]')[0]) {
            $('.time_list').css({
                display: 'block'
            })
        } else if (target == $('.time_top li p[time = tomorrow]')[0]) {
            $('.time_list').css({
                display: 'block'
            })
        } else if (target == $('.time_top li p[time = after_tomorrow]')[0]) {
            $('.time_list').css({
                display: 'block'
            })
        } else if (target == $('.time_top li p[day = today]')[0]) {
            $('.time_list').css({
                display: 'block'
            })
        } else if (target == $('.time_top li p[day = tomorrow]')[0]) {
            $('.time_list').css({
                display: 'block'
            })
        } else if (target == $('.time_top li p[day = after_tomorrow]')[0]) {
            $('.time_list').css({
                display: 'block'
            })
        } else {
            $('.time_list').css({
                display: 'none'
            })
        }

    });
    //添加时间的函数
    function addTime(hour) {
        for (var i = hour; i < 21; i++) {
            var time_li = document.createElement('li');
            var time_b = document.createElement('b');
            $('.time_bot').append(time_li);
            time_li.appendChild(time_b);
            if (i < 9) {
                time_b.innerHTML = '0' + i + ':00~0' + (i + 1) + ':00';
            } else if (i < 10) {
                time_b.innerHTML = '0' + i + ':00~' + (i + 1) + ':00';
            }
            if (i >= 10) {
                time_b.innerHTML = i + ':00~' + (i + 1) + ':00';
            }
        }
    }

    //切换今天、明天、后天的样式
    $('.time_top li').click(function () {
        $('.time_bot li').remove();
        $('.time_top li').each(function (index, item) {
            // console.log(item);         
            $(item).removeAttr('class');
        });
        // console.log($(this).index())
        $(this).addClass('li_active');
        var str = $(this).find('p[code = day]').html();
        if (str == '今天') {
            var to_hours = date.getHours();
            if (to_hours == date.getHours()) {
                var time_li = document.createElement('li');
                var time_b = document.createElement('b');
                $('.time_bot').append(time_li);
                time_li.appendChild(time_b);
                time_b.innerHTML = '一小时内';
                $(time_b).addClass('b_active');
                addTime(to_hours);
            }
        }
        if (str == '明天') {
            addTime(8);
        }
        if (str == '后天') {
            addTime(8);
        }
    });

    //点击时间
    $('.on_door_time').on('click', '.time_bot li b', function () {
        $('.time_bot li b').each(function (index, item) {
            // console.log(item);         
            $(item).removeAttr('class');
        });
        // console.log($(this).index())
        $(this).addClass('b_active');
        var text = $(this).html();
        var day = $(this).closest('div[class = time_list]');
        var next = day.find('li[class=li_active]');
        var time = next.find('p[sign=sign]').html();
        if (next.find('p[code=day]').html() == '今天') {
            $('.one_hour').html('' + text);
            $('.time_list').css({
                display: 'none'
            })
        } else {
            $('.one_hour').html(time + ' ' + text);
            $('.time_list').css({
                display: 'none'
            })
        }

    });

    //捎话给快递员
    //显示、隐藏备注信息框
    $('.on_msg').click(function () {
        $('.l_tolead').css({
            display: 'block'
        })
        $('.remarks').css({
            display: 'block'
        })
    });
    $('.remarks h2 span').click(function () {
        $('.l_tolead').css({
            display: 'none'
        })
        $('.remarks').css({
            display: 'none'
        })
    });

    //选择备注选项
    //反向
    $('.inner ul li a').toggle(function () {
        $(this).addClass('active');
        $(this).closest('li').attr('sign', 'sign');
        // var num1 = $('.inner ul li[sign=sign]');
        // // if (num1 < 2) {
        // //     $(this).addClass('active');
        // //     $(this).closest('li').attr('sign', 'sign');
        // // }
        // console.log(num1 + '点击增加');
        // if (num1 > 2) {
        //     $(this).removeAttr('class');
        //     $(this).closest('li').removeAttr('sign');
        //     $('.hint').css({
        //         display: 'block'
        //     });
        //     setTimeout(function () {
        //         $('.hint').css({
        //             display: 'none'
        //         });
        //     }, 2000);
        //     // num1 = num;
        // }
    }, function () {
        $(this).removeAttr('class');
        $(this).closest('li').removeAttr('sign');
    });

    //点击保存时将内容添加至备注信息
    $('.inner').on('click', '.save', function () {
        var str = '';
        $('.inner ul li[sign=sign] a').each(function (index, item) {
            str += $(item).html() + ' ';
        });
        str += $('.remarks_msg').val() + ' ';
        $('.on_msg').html(str);
        $('.remarks').css({
            display: 'none'
        });
        $('.l_tolead').css({
            display: 'none'
        });
    })

    // 预约信息中的点击下一步
    $('body').on('click','.l_reserve .l_next_btn span',onLogin);
    
    //点击添加至地址簿时显示登录
    $('body').on('click','.l_save_adress span',onLogin);
    $('body').on('click','.l_mesg .l_m_right span',onLogin);

    // 模块3
    $('.l_ewmjj .l_odd_btn').click(function () {
        var tel = $('.l_ewmjj .l_odd_inp').val();
        if (!tel) {
            $('.ewm_title').css({
                display: 'block'
            })
        }
        var reg = /^[1][0-9]{11}$/;
        var reg1 = /^[1][0-9]{14}$/;
        var rit = reg.test(tel);
        var rit1 = reg1.test(tel);
        if (tel) {
            if (rit || rit1) {
                $('.ewm_title').css({
                    display: 'none'
                })
                $('.l_ewmjj .first').css({
                    display: 'none'
                })
                $('.l_ewmjj .l_big_content').css({
                    display: 'block'
                })

                $('.l_ewmjj .l_big_content .order_number').css({
                    display: 'block'
                })
                $('.l_big_content .number1').html('' + tel + '')
            } else {
                $('.ewm_title').css({
                    display: 'block'
                })
            }
        }
    })
    //激活按钮
    $('.l_ewmjj .l_take input[name = take_city]').blur(function () {
        if ($('.l_ewmjj .l_send input[name = city]').val() && $('.l_ewmjj .l_take input[name = take_city]').val()) {

            $('.l_place_order button').removeClass('l_disable');
            $('.l_place_order button').addClass('l_nodisable');
        }
    });

    // 下单
    $('.l_ewmjj').on('click', '.l_place_order .l_nodisable', function () {
        var tel = $('.l_ewmjj .l_send input[name=phone]').val();
        var reg = /^[1][0-9]{10}$/;
        var rit = reg.test(tel);
        panduan('.l_ewmjj .l_send input[name=name]', '.l_ewmjj .l_send .l_popup[code = ipt1]');
        if ($('.l_ewmjj .l_send input[name=name]').val()) {
            panduan('.l_ewmjj .l_send input[name=phone]', '.l_ewmjj .l_send .l_popup[code = ipt2]');
            if ($('.l_ewmjj .l_send input[name=phone]').val()) {
                if (!rit) {
                    $('.l_ewmjj .l_send .l_popup[code = ipt2]').text('您输入的手机号码格式不正确，请重新输入');
                    $('.l_ewmjj .l_send .l_popup[code = ipt2]').css({
                        display: 'block'
                    })
                    setTimeout(function () {
                        $('.l_ewmjj .l_send .l_popup[code = ipt2]').css({
                            display: 'none'
                        })
                    }, 2000)
                }
                $('.l_ewmjj').css({
                    display: 'none'
                });
                $('.l_wyjj_content').css({
                    display: 'block'
                });
                $('.l_wyjj_content .l_send').css({
                    display: 'none'
                });
                $('.l_reserve').css({
                    display: 'block'
                });
                $('.l_wyjj_step ul li').each(function (index, item) {
                    // console.log(item);         
                    $(item).removeAttr('class');
                })
                $('.l_wyjj_step ul li[code = li3]').addClass('l_li_active');
                document.documentElement.scrollTop = 0;
            }
        }
        // //判断输入手机号
        // if ($('.l_big_content .l_send input[name=phone]').val() && rit) {
        //     notarize('.l_big_content .l_send input[name=adress1]', '.l_big_content .l_send .l_popup[code = ipt4]');
        // }
        panduan('.second .l_take input[name=take_name]', '.second .l_take .l_popup[code = take_ipt1]');
        if ($('.second .l_take input[name=name]').val()) {
            panduan('.second .l_take input[name=take_phone]', '.second .l_take .l_popup[code = take_ipt2]');
            if ($('.second .l_take input[name=take_phone]').val()) {
                if (!rit) {
                    $('.second .l_take .l_popup[code = take_ipt2]').text('您输入的手机号码格式不正确，请重新输入');
                    $('.second .l_take .l_popup[code = take_ipt2]').css({
                        display: 'block'
                    })
                    setTimeout(function () {
                        $('.l_second .l_take .l_popup[code = take_ipt2]').css({
                            display: 'none'
                        })
                    }, 2000)
                }
            }
        }

    })

})