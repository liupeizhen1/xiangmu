export default footer;
// //将公共底部引入页面
function footer(path) {
    $('#footer').load(path, function () {// 引入底部后执行
        // 返回顶部
        var html = document.documentElement;
        var goHeader = $('#footer .goHeader');
        var gapX = ($('#footer').width() - $('#footer .footer_inner').width()) / 2;
        document.onscroll = function () {
            var maxY = $('#footer').offset().top - $(goHeader).height() - 10;
            var y = html.clientHeight + html.scrollTop;
            var gapY = html.scrollHeight - html.scrollTop - html.clientHeight;
            // var gapHeight = html.scrollHeight - $('')
            $(goHeader).css('position', 'fixed');
            (html.scrollTop >= 20) ? $(goHeader).fadeIn(300) : $(goHeader).fadeOut(300);

            $(goHeader).css({'bottom': 0,'right': gapX})

            console.log(666);


            // if ($(goHeader).offset().top < maxY) {

            //     $(goHeader).css('bottom', 0);
            // } else {
            //     $(goHeader).css('bottom', 'initail');

            //     console.log($(goHeader).css('position'));
            // }

        };
    });
};
