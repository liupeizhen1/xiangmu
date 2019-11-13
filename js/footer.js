export default footer;
// //将公共底部引入页面
function footer(path) {
    $('#footer').load(path, function () {// 引入底部后执行
        // 返回顶部
        var html = document.documentElement;
        var goHeader = $('#footer .goHeader')[0];
        var finner = $('#footer .footer_inner')[0];
        var maxY = (goHeader.offsetHeight + $('#footer')[0].clientTop) * -1; //尾部边界
        $(goHeader).css('position', 'absolute');
        $(goHeader).css({ 'right': 0 });//模块靠右边界
        //scrollTop为st、goHead的top为y1时，goHead在页面最底部，则scrollTop与y1减少相同量时，模块一直在最下方
        var y1 = html.offsetHeight - $(finner).offset().top - goHeader.offsetHeight;
        var st = html.offsetHeight - html.clientHeight;
        //初始化
        goHeaderFn();

        $(document).on('scroll',goHeaderFn);//滚动保持固定

<<<<<<< HEAD
        $(window).on('resize',function(){//可视窗口大小改变时，重新赋值
            y1 = html.offsetHeight - $(finner).offset().top - goHeader.offsetHeight;
            st = html.offsetHeight - html.clientHeight;
            goHeaderFn();
        });
=======


            // if ($(goHeader).offset().top < maxY) {

            //     $(goHeader).css('bottom', 0);
            // } else {
            //     $(goHeader).css('bottom', 'initail');

            //     console.log($(goHeader).css('position'));
            // }
>>>>>>> 1b21b7bdf0a8701da55e1fc29973f890746d7b1e

        function goHeaderFn() {//滚动保持固定
            var gap = st - html.scrollTop;
            var y = y1 - gap;
            //出现消失判断  不在头部出现
            (html.scrollTop > 100) ? $(goHeader).fadeIn(300) : $(goHeader).fadeOut(300);
            //y轴边界判断 靠近尾部后不移动
            if (y >= maxY) 
                y = maxY;
            $(goHeader).css({ 'top': y });
        };
    });
};

