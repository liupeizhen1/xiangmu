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
        console.log(666);
        $('.w-kefu').css('bottom', k_height / 7);
    });
})();

// banner图模块
(function () {
    //初始化
    var b_width = $('.w-banner').width();
    $('.w-banner>img').each(function (index, img) {
        $(img).css('left', b_width * index);
    });
    //计时器
    var timer, time = 7000, item = 1;
    timer = setInterval(function () {//每次时间相同
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
    $('.w-banner').on('click', 'span', function () {//点击跳转
        // 停止动画
        $('.w-banner>img').stop();
        clearInterval(timer);
        var span1 = $(this).siblings('.active');
        var index = $(this).attr('tab-index');
        var gap = $('.w-banner>img[tab-index="' + index + '"]').eq(0).position().left;

        // 替换类名
        $('.w-banner span').removeClass('active')
        item = index - 1;

        //跳转
        lunBo(gap, true);
        timer = setInterval(lunBo, time);
    });

    function lunBo(gap, bln) {//轮播图效果
        // 初始值
        item %= 3;
        time = 9500;
        gap = gap || b_width;
        //重新排序
        if (item == 1 && !bln) {
            $('.w-banner>img').each(function (index, img) {
                $(img).css('left', b_width * index);
            });
        };
        // 替换类名
        $('.w-banner>div>span').eq(item - 1).removeClass('active');
        $('.w-banner>div>span').eq(item).addClass('active');

        // 动画
        $('.w-banner>img').each(function (i, img) {
            $(img).animate({ left: $(img).position().left - gap }, 2500, 'easeOutQuad');
        });
        item++;
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
    $('.w-nav .caDan .txt input').on({
        'click': function (e) {
            e.stopPropagation()
            var height = $('.w-nav .caDan .txt').height();
            if (height <= 40) {
                $('.w-nav .caDan .click').fadeOut(50);
                $('.w-nav .caDan span').fadeIn(50);
                $('.w-nav .caDan .txt').animate({ height: 120, width: 306 }, 300)
            };
        },
        'blur': function () {
            // alert(666)
        }
    });
    $(document).bind('click', function (e) {
        $('.w-nav .caDan .click').fadeIn(50);
        $('.w-nav .caDan span').fadeOut(50);
        $('.w-nav .caDan .txt').animate({ height: 40, width: 264 }, 300)
    })
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
        var len = arr.length / 2;
        for (var i = 0; i < len; i++) {
            var wrap = document.createElement('div');
            $(wrap).addClass('wrap');
            for (var j = 0; j < 2; j++) {
                $(wrap).append(imgbox(resource[name][arr[j + i]]))
            }
            $('.w-business  .c-bottom').append(wrap);
        }
        sort($('.w-business .wrap'));
    };
    function sort(dom) {// 定位子节点排序
        $(dom).each(function (index, wrap) {
            $(wrap).css('left', $(wrap.offsetParent).width() * index);
        });
    }
    function addtimer() {//判定是否需要计时器
        if ($('.w-business .wrap').length > 1) {
            $('.w-business .c-bottom .click').fadeIn(500);
            timer = setInterval(lunBo, 4000);//启动定时器
        } else {
            $('.w-business .c-bottom .click').fadeOut(500);

        };
    }
    var timer = null, time = 7000;
    var width = $('.w-business').width();
    //轮播图效果
    function lunBo(gap, bln) {
        time = 8500;//循环间隔
        // 初始值
        gap = gap || width;
        // 替换位置
        $('.w-business .click span').eq(0).appendTo($('.w-business .click'));
        // 动画
        $('.w-business .wrap').each(function (i, wrap) {
            if ($(wrap).position().left <= -width && !bln) {//重新排列
                $(wrap).appendTo($('.w-business .c-bottom'));
                $(wrap).css('left', width * ($(wrap).index() - 1));
            }
            $(wrap).animate({ left: $(wrap).position().left - gap }, 1500, 'easeOutQuad');
        });
    };

    //点击跳转功能
    $('.w-business .click').on('click', 'span', function () {
        var index = $(this).index();
        var gap = $('.w-business .wrap').eq(index).position().left;

        // 停止
        $('.w-business .wrap').stop();
        clearInterval(timer);
        timer = setInterval(lunBo, 4000);//启动定时器
        if ($(this).hasClass('active')) {
            return
        };
        lunBo(gap, true);//跳转
    });
    var wrapList = {}
    //点击切换wrap模块
    $('.w-business .c-top').on('click', 'li', function () {
        var name = this.className;
        var wrapName = $('.w-business .c-top .active').parent('li')[0].className;
        wrapList[wrapName] = $('.w-business .wrap').detach(); // 保存模块
        //更换激活节点 
        $('.w-business .c-top .active').removeClass('active');
        $(this).children().addClass('active');
        $('.w-business .click .active').prependTo($('.w-business .click'));

        // 清除动画和计时器
        $('.w-business .wrap').stop();
        clearInterval(timer);


        if (wrapList[name]) {//已存在的模块直接插入，不重新生成
            wrapList[name].appendTo($('.w-business .c-bottom'));
        } else {
            addWrap(name)//重新生成内容
        };

        // 自动跳转功能
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


    dragFn($('.w-anli .list'));
    function dragFn(dom) {//函数拖拽功能
        $(dom).off('mousedown');
        $(dom).mousedown(function (e) {
            e.stopPropagation();
            $(dom).stop();
            var toLeft = e.pageX - $(dom).position().left;
            var maxX = document.documentElement.clientWidth - dom[0].offsetWidth;
            $(document).bind('mousemove', function (e) {
                var x = e.clientX - toLeft;
                dom.css({ 'left': x });
            })
            $(document).mouseup(function () {
                $(dom).animate({ left: 0 }, 1500)
                $(this).unbind('mousemove');
                $(document).off('mouseup')
            });
        });
    };
})();

