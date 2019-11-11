export default header;
 function header(path) {
    //将公共头部引入页面
    $('#header').load(path, function () {// 引入头部后执行
        //控制二级导航栏的显隐
        $('#header .nav>ul>li,#header .right>li').hover(
            function (e) {
                $(this).find('.hide').css("display", "initial");
                heightAuto($(this).find('.hide ul'));// 统一hide中ul元素的高度
                widthAuto($(this).find('.hide'));//hide元素宽度自适应
            },
            function () { $(this).find('.hide').css("display", "none") }
        );

        $('#header .login').on('click', () => {//打开登录框
            loginInit();//初始化登录框
            $('#login').stop(true, true).fadeIn(400, () => { $('#header .mengBan').css("display", "block") });
        });

        $('#login .del').on('click', () => {//点击×关闭登录框
            $('#login').find('[style]').removeAttr('style');
            $('#login .option').removeClass('active');//清除行内样式
            clearInterval(timer);
            $('#login').stop(true, true).fadeOut(400, () => { $('#header .mengBan').css("display", "none") });
        });

        $('#login .option').on('click', function () {// 选择登录方式
            var index = $('#login .option').index(this);
            $(this).addClass('active');
            $(this).siblings('.option').removeClass('active');
            $('#login .con').eq(index).css('display', 'block');
            $('#login .con').eq(index).siblings('.con').css('display', 'none');
        });

        $('#login .selecter').on('click', function (e) {// 选择手机号前置号码
            e.stopPropagation();
            $('#login .selecter .list').toggle();
            document.onclick = () =>
                $('#login .selecter .list').css('display', 'none');
        });

        $('#login .selecter .list').on('click', 'li', function (each) {
            $('#login .selecter .number').text($(this).find('b').text())
        });

        var timeOut = null, iphoneNunber;
        $('#login input[type=text]').on({//手机号码验证
            "keydown": function () {
                var hint = $(this).siblings('.hint');
                var reg = /^1\d{10}$/;
                $(this).val($(this).val().trim());//清除首位空格
                clearTimeout(timeOut);//防抖
                timeOut = setTimeout(() => {
                    iphoneNunber = $('#login .tx1').val();
                    if (reg.test(iphoneNunber)) {//验证手机号是否合格
                        $(hint).text('✔');
                        $(hint).css("borderWidth", "0");
                        if ($('#login .bt1').val() == '获取验证码') {//防止多次激活
                            $('#login .bt1').addClass('active1');
                        };
                    } else {
                        hintInit(hint);//初始化验证栏状态
                        $('#login .bt1').removeClass('active1');
                    };
                    if ($(this).val()) {//输入框值不为空，hint出现
                        $(hint).css('display', "initial");
                    } else {
                        $(hint).css('display', "none");
                        $('#login .bt2').removeClass('active2');
                    };
                    if ($('#login .txt')[0].value && $('#login .txt')[1].value)
                        $('#login .bt2').addClass('active2');
                }, 550);
            }
        });
        // 验证码
        $('#login').on('click', '.active1', e => {
            // 初始化验证框
            $('#login .son').fadeIn(100, () => {
                $('#header .mengBan2').css('display', 'initial');
            });
            // 生成验证码
            var str = randomWord(5);
            $('#login .son .code').text(str);
        });
        var bln = false, timer = null;//短信验证成功后为true
        $('#login').on('click', '.bt3', e => {//打开验证框
            var str1 = $('#login .code').text().toLowerCase();
            var str2 = $('#login .t3').val().toLowerCase();
            if (str1 === str2) {//验证成功
                $('#login .son').fadeOut(100, () => {//关闭验证框
                    $('#header .mengBan2').css('display', 'none');
                    $('#login .t3').val('');
                });
                // 发送短信
                var code = randomWord(6, 10);//6位数字验证码
                alert(code);//发送
                $('#login .bt1').removeClass('active1');
                var num = 60;
                $('#login .bt1').val(`重新发送${num}`);
                timer = setInterval(() => {//开始计时
                    $('#login .bt1').val(`重新发送${--num}`);
                    if (num <= 0) {//初始获取按钮
                        $('#login .bt1').val('获取验证码');
                        $('#login .bt1').addClass('active1');
                        clearInterval(timer);
                    };
                    bln = ($('#login .t2').val() == code);//验证成功后为true
                }, 1000);
            } else {//验证错误
                $('#login .son .hide').fadeIn(100, () => {//打开提示栏
                    setTimeout(() => { $('#login .son .hide').fadeOut(100); }, 3000)
                });
            };
        });
        $('#login').on('click', '.del2', function () {//关闭验证框,关闭条款
            $(this).closest('.w-position').fadeOut(100, () => {
                $('#header .mengBan2').css('display', 'none');
            });
        });
        $('#login').on('click', '.bt2', e => {
            if (bln) {
                $('#login .clause').fadeIn(100, () => {//出现条款
                    $('#header .mengBan2').css('display', 'initial');
                });
            } else {
                $('#login .hint2').css('display', 'initial');
            };
        });
        $('#login').on('click', '.bt4', e => {//注册成功
            if ($(this).val() === iphoneNunber) {
                return false
            }
            clearInterval(timer);
            $('#login').find('[style]').removeAttr('style');
            $('#login .option').removeClass('active');//清除行内样式
            $('#login').stop(true, true).fadeOut(400, () => { $('#header .mengBan').css("display", "none") });
            console.log($('#login').find('[style]'));
        })
    });
};
// 全局功能函数
function heightAuto(dom) {// 统一元素高度
    var maxHeight = 0;
    $(dom).each(function (index, dom) {
        maxHeight = (maxHeight < $(dom).height()) ? $(dom).height() : maxHeight;
    });
    $(dom).each(function (index, dom) {
        $(dom).height(maxHeight);
    });
};
function widthAuto(dom) {//脱标的父元素宽度度自适应
    var width = 0;
    $(dom).children().each(function (index, son) {
        width += son.offsetWidth;
    });
    $(dom).width(width);
};
function loginInit() {//初始化登录框
    $('#login .option').eq(0).addClass('active');
    $('#login .con').eq(0).css('display', 'block');
    $('#login .con input[type=checkbox]').prop('checked', true);
    $('#login input[type=text]').val('');
    $('#login .selecter .number').text($('#login .selecter li b').eq(0).text());
    hintInit($('#login hint'));
    $('#login .bt1').removeClass('active1');
    $('#login .bt2').removeClass('active2');
    $('#login .bt1').val('获取验证码');
};

function hintInit(hint) {//初始化验证栏状态
    $(hint).text('！');
    $(hint).css("borderWidth", "2");
};
function randomWord(num, len) {// 随机产生num位验证码,len为取值范围
    var str = "",
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    len = len || arr.length;
    for (var i = 0; i < num; i++) {
        var pos = Math.round(Math.random() * (len - 1));
        str += arr[pos];
    };
    return str;
};


