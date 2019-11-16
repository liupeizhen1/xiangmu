import { header, onLogin } from './header.js';//引入头部js
import footer from './footer.js';//引入底部js

header('./common/header.html');//执行底部脚本
footer('./common/footer.html');//执行底部脚本


// 在线客服
(function () {
    var html = document.documentElement;
    var k_height = html.clientHeight;
    $('.w-kefu').css('bottom', k_height / 7);
    $(window).on('resize', e => {
        var k_height = html.clientHeight;
        $('.w-kefu').css('bottom', k_height / 7);
    });
})();

// banner图模块
(function () {
    //初始化
    $('.w-banner>img').attr('draggable', 'false');
    var b_width = $('.w-banner').width();
    $('.w-banner>img').each(function (index, img) {
        $(img).css('left', b_width * (index - 1));
    });
    //计时器，开启自动滚动
    var timer, time = 7000;
    timer = setInterval(function () {//使用变量time，使初次滚动和以后每次滚动间隔时间相同
        lunBo();
        clearInterval(timer);
        timer = setInterval(lunBo, time);
    }, time);

    $(window).on('resize', e => {//窗口大小变动，重新初始化
        $('.w-banner>img').stop(true, true);
        b_width = $('.w-banner').width();
        clearInterval(timer);
        timer = setInterval(lunBo, time);
    });

    //手动点击滚动功能
    $('.w-banner').on('click', 'span', function () {
        var index = $(this).index();
        var gap = $('.w-banner>img').eq(index + 1).position().left;
        var bln = (gap < 0);//点击向左滚动不重新排列

        // 刷新定时器
        clearInterval(timer);
        timer = setInterval(lunBo, time);
        if ($(this).hasClass('active')) { return };//点击已激活的节点，不停止当前动画
        $('.w-banner>img').stop();//停止当前动画
        lunBo(gap, bln, index);//跳转
    });

    function lunBo(gap, bln, clickIndex) {//轮播图效果
        // 初始值
        time = 9500;
        gap = gap || b_width;

        // 切换点击节点激活状态
        var index = $('.w-banner>div>span.active').index() + 1;
        clickIndex = (clickIndex == 0) ? (clickIndex + '') : clickIndex;//clickIndex为0时转字符串
        index = (clickIndex) || (index < $('.w-banner>div>span').length ? index : 0);//clickIndex存在时将其赋值给index
        $('.w-banner>div>span.active').removeClass('active');
        $('.w-banner>div>span').eq(index * 1).addClass('active');

        //重新排列轮播图
        if ((index == 0 && !bln)) {
            var num = 1;
            $.each($('.w-banner>img'), function (item, img) {
                var left = $(img).position().left;
                if (left < 100 - b_width) {
                    if (img.className.includes('last')) {
                        $(img).insertAfter($('.w-banner>.last').eq(1));
                        $(img).css('left', Math.abs($(img).position().left));
                    } else {
                        $(img).insertBefore($('.w-banner>.last').eq(1));
                        $(img).css('left', (num++ * b_width));
                    };
                };
            });
        };

        // 激活动画
        $('.w-banner>img').each(function (i, img) {
            $(img).animate({ left: $(img).position().left - gap }, 2500, 'easeOutQuad');
        });
    };

    // 温馨提示
    $('.w-banner .right li').hover(
        function () {
            $(this).stop().animate({ left: -172 }, 500);
        },
        function () {
            $(this).stop().animate({ left: 0 }, 500);
        }
    );
})();
// 页面中间服务导航 
(function () {
    // 点击功能
    function clickFn(e) {
        e.stopPropagation()
        $('.w-nav .caDan .click').fadeOut(50);
        $('.w-nav .caDan span').fadeIn(50);
        $('.w-nav .caDan .txt').animate({ height: 120, width: 306 }, 100);
        $('.w-nav .caDan .txt input').focus();
    }
    // 注册事件
    $('.w-nav .caDan').on('click', '.txt', function (e) { clickFn(e) });
    $('.w-nav .caDan').on('click', '.click', function (e) { clickFn(e) });

    $(document).unbind('click');
    addDocumentClick()
    function addDocumentClick() {
        $(document).bind('click', function (e) {
            $('.w-nav .caDan .click').fadeIn(50);
            $('.w-nav .caDan span').fadeOut(50);
            $('.w-nav .caDan .txt').animate({ height: 40, width: 264 }, 100);
            $('.w-nav .caDan').removeAttr('style');
            $('.w-nav .caDan').find('*').removeAttr('style');
        });
    };

    // 输入功能
    $('.w-nav .caDan .txt input').on('change', function (e) {
        var num = this.value.trim().replace(',', '');
        this.value = '';
        this.placeholder = '';
        var reg = /^\d{12}$/;
        var text = `<div class="number cuo"><b>${num}</b><a class="del">×</a></div>`;
        this.focus();
        // 注销事件
        $(document).unbind('click');
        $('.w-nav .caDan').unbind('click');
        // 订单号验证
        var arr = [];
        $('.w-nav .caDan .dui>b').each(function (i, dom) {
            arr.push(dom.innerText)
        });
        if (reg.test(num * 1) && !arr.includes(num) && !arr.includes(num * 1)) {
            text = `<div class="number dui"><b>${num}</b><a class="del">×</a></div>`;
        } else if (!$('.w-nav .caDan .hint').length) {
            var hint = '<div class="hint">*运单号错误或重复。</div>'
            $('.w-nav .caDan .top').after(hint);
        };
        if ($('.w-nav .caDan .txt .number').length >= 21) {
            alert('最多可查询20条');
            return false
        };

        // 插入节点
        $('.w-nav .caDan .txt input').before(text);
        // 判断是否符合条件可以提交
        if ($('.w-nav .caDan .cuo').length) {
            $('.w-nav .caDan .btn').addClass('jin');
            $('.w-nav .caDan .btn').removeClass('btn');
        }
        // input宽度自适应
        var width = this.offsetWidth - $('.w-nav .caDan .txt .number:last')[0].offsetWidth - 14;
        if (width < 40) {
            $(this).css('width', $(this).parent().width() + 'px');
        } else {
            $(this).css('width', width + 'px')
        };

        // .txt高度自适应
        var height = $(this).parent().height();
        if ($(this).position().top >= height - 16) {
            $('.w-nav .caDan .txt').stop().animate({ height: height + 48 }, 100);
            $('.w-nav .caDan .top').animate({ height: height + 48 }, 100);
        };
    });
    // 完成输入
    $('.w-nav .caDan .txt input').on('keyup', function (e) {
        var key = e.keyCode;
        if (key == 188 || key == 32) {
            $(this)[0].blur();
            $(this)[0].focus();
        };
    });
    // 删除功能
    $('.w-nav .caDan .txt').on('click', '.del', function (e) {
        e.stopPropagation();
        $('.w-nav .caDan .txt input').focus();
        this.parentNode.remove();
        if (!$('.w-nav .caDan .cuo').length) {
            $('.w-nav .caDan .jin').addClass('btn');
            $('.w-nav .caDan .jin').removeClass('jin');
            $('.w-nav .caDan .hint').remove();
        }
        if (!$('.w-nav .caDan .txt .number').length) {
            $('.w-nav .caDan .txt input')[0].placeholder = '您可以输运单号查询';
            addDocumentClick();
            // 注册事件
            $('.w-nav .caDan').on('click', '.txt', function (e) { clickFn(e) });
            $('.w-nav .caDan').on('click', '.click', function (e) { clickFn(e) });
        }

    });
    // 激活状态
    $('.w-nav .caDan .txt').on('click', '.number', function (e) {
        $('.w-nav .caDan .txt .number').removeClass('active');
        $(this).addClass('active');
        $('.w-nav .caDan .txt input').focus();
    });

    // 提交运单号
    $('.w-nav .caDan').on('click', '.btn', function () {
        if ($('.w-nav .caDan .number').length) {
            var arr = [];
            $('.w-nav .caDan .dui>b').each(function (i, dom) {
                arr.push(dom.innerText * 1)
            });
            var json = JSON.stringify(arr);
            localStorage.setItem('num', json);
            window.open('./subpage/ydzz.html')
        };
    });
})();

// 顺丰全业务介绍 模块
(function () {
    // 资源
    var resource = null;
    $.ajax({
        type: 'get',
        url: './data/index.json',
        async: true,
        data: '请求顺丰全业务介绍模块数据',
        cache: true,
        dataType: 'json',
        success: function (json) {
            resource = json['business'];
            // 初始化加载内容
            addWrap(Object.keys(resource)[0]);//加载默认资源模块
            // 自动跳转功能
            addtimer();
        },
        error: function (err) {
            console.log(err, '请求失败');
        }
    });
    //图片盒子模板
    function imgbox(obj) {
        return `
        <div class="imgbox ${obj['name']}">
            <img src="${obj['img']}" alt="">
            <div>
                <h4>${obj['h4']}</h4>
                <p>${obj['p']}</p>
            </div>
            <a class="fugai" href="${obj['a']}"></a>
        </div>`;
    };
    //模块加载
    function addWrap(name) {
        var arr = Object.keys(resource[name]);
        var len = arr.length - 1;
        for (var i = 0; i < len; i++) {
            var wrap = document.createElement('div');
            $(wrap).addClass('wrap');
            for (var j = 0; j < 2; j++) {
                $(wrap).append(imgbox(resource[name][arr[j + i]]))
            }
            $('.w-business  .c-bottom').append(wrap);
        }
        $('.w-business .wrap:last').addClass('last');
        var dom = $('.w-business .wrap:last').clone();//为实现循环播放，复制尾图放在头部
        $(dom).prependTo($('.w-business .c-bottom'));
        sort($('.w-business .wrap'));// 子节点自动排序

        // 根据需求重新生成点击切换图片的节点
        $('.w-business .c-bottom .click').empty();
        for (let num = 0; num < $('.w-business .wrap').length - 1; num++) {
            $('.w-business .c-bottom .click').append('<span></span>');
        };
        $('.w-business .c-bottom .click span').eq(0).addClass('active');


    };
    function sort(dom) {// 轮播图排序
        $(dom).each(function (index, wrap) {
            $(wrap).css('left', $(wrap.offsetParent).width() * (index - 1));
        });
    };
    function addtimer() {//判定是否需要计时器
        if ($('.w-business .wrap').length > 1) {
            $('.w-business .c-bottom .click').fadeIn(500);
            timer = setInterval(lunBo, time);//启动定时器
        } else {
            $('.w-business .c-bottom .click').fadeOut(500);
        };
    };
    var timer = null, time = 5500;
    var width = $('.w-business').width();

    //手动点击滚动功能
    $('.w-business .click').on('click', 'span', function () {
        var index = $(this).index();
        var gap = $('.w-business .wrap').eq(index + 1).position().left;
        var bln = (gap < 0);//点击向左滚动不重新排列

        // 停止
        clearInterval(timer);
        timer = setInterval(lunBo, time);//启动定时器
        if ($(this).hasClass('active')) {//点击已激活的节点，不停止当前动画
            return
        };
        $('.w-business .wrap').stop();
        lunBo(gap, bln, index);//跳转
    });

    //轮播图自动滚动效果
    function lunBo(gap, bln, clickIndex) {
        time = 7000;//循环间隔
        // 初始值
        gap = gap || width;
        // 切换点击节点激活状态
        var index = $('.w-business .click span.active').index() + 1;
        clickIndex = (clickIndex == 0) ? (clickIndex + '') : clickIndex;
        index = (clickIndex) || (index < $('.w-business .click span').length ? index : 0);
        $('.w-business .click span.active').removeClass('active');
        $('.w-business .click span').eq(index * 1).addClass('active');

        if ((index == 0 && !bln)) {//重新排列轮播图
            var num = 1;
            $.each($('.w-business .wrap'), function (item, wrap) {
                var left = $(wrap).position().left;
                if (left < 100 - width) {
                    if (wrap.className.includes('last')) {
                        $(wrap).insertAfter($('.w-business .last').eq(1));
                        $(wrap).css('left', Math.abs($(wrap).position().left));
                    } else {
                        $(wrap).insertBefore($('.w-business .last').eq(1));
                        $(wrap).css('left', (num++ * width));
                    };
                };
            });
        };
        $('.w-business .wrap').each(function (i, wrap) {// 添加动画效果
            $(wrap).animate({ left: $(wrap).position().left - gap }, 1500, 'easeOutQuad');
        });
    };
    
    var wrapList = {}
    //点击切换物业模块
    $('.w-business .c-top').on('click', 'li', function () {
        var name = this.className;
        var wrapName = $('.w-business .c-top .active').parent('li')[0].className;
        wrapList[wrapName] = $('.w-business .wrap').detach(); // 保存模块
        //更换激活节点 
        $('.w-business .c-top .active').removeClass('active');
        $(this).children().addClass('active');

        // 清除动画和计时器
        $('.w-business .wrap').stop();
        clearInterval(timer);

        if (wrapList[name]) {//已存在的模块直接插入，不重新生成(单例)
            wrapList[name].appendTo($('.w-business .c-bottom'));
        } else {
            addWrap(name)//重新生成内容
        };
        // 根据需求重新生成点击切换图片的节点
        $('.w-business .c-bottom .click').empty();
        for (let num = 0; num < $('.w-business .wrap').length - 1; num++) {
            $('.w-business .c-bottom .click').append('<span></span>');
        };
        $('.w-business .c-bottom .click span').eq(0).addClass('active');
        // 启动轮播图
        addtimer();
    });
})();

// 成功案例
(function () {
    $('.w-anli .list a').hover(//移入更换背景图
        function () {
            var name = this.className;
            switch (name) {
                case 'icon1': $(this).find('img')[0].src = './img/index_img/anli_icon2.png';
                    break
                case 'icon2': $(this).find('img')[0].src = './img/index_img/anli_icon4.png';
                    break
                case 'icon3': $(this).find('img')[0].src = './img/index_img/anli_icon6.png';
                    break
                case 'icon4': $(this).find('img')[0].src = './img/index_img/anli_icon8.png';
            };
        },
        function () {
            var name = this.className;
            switch (name) {
                case 'icon1': $(this).find('img')[0].src = './img/index_img/anli_icon1.png';
                    break
                case 'icon2': $(this).find('img')[0].src = './img/index_img/anli_icon3.png';
                    break
                case 'icon3': $(this).find('img')[0].src = './img/index_img/anli_icon5.png';
                    break
                case 'icon4': $(this).find('img')[0].src = './img/index_img/anli_icon7.png';
            };
        },
    );
    // 拖拽功能

    var bln = false;
    dragFn($('.w-anli .list'));
    function dragFn(dom) {//函数拖拽功能
        $(dom).unbind('mousedown');
        $(dom).bind('mousedown', function (e) {
            bln = true;
            $(dom).stop();
            $('.w-anli .list a').attr('onclick', 'return' + bln)
            $('.w-anli .list a').attr('draggable', 'false');
            $('.w-anli .list img').attr('draggable', 'false');
            var toLeft = e.pageX - $('.w-anli .list').position().left;
            var maxX = document.documentElement.clientWidth - dom[0].offsetWidth;

            $(document).unbind('mousemove');
            $(document).bind('mousemove', function (e) {
                var x = e.clientX - toLeft;
                $(dom).css({ 'left': x });
                $('.w-anli .list a').attr('onclick', 'return false')
            })
        });
        $(document).unbind('mouseup');
        $(document).mouseup(function (e) {
            $(document).unbind('mousemove');
            $('.w-anli .list').animate({ left: 0 }, 1500)
        });
    };
})();

