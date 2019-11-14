export { header, onLogin };
function header(path) {
    //将公共头部引入页面
    $('#header').load(path, function () {// 引入头部后执行
        whetherLogin()//判定是否已登录
        //控制二级导航栏的显隐
        $('#header .nav>ul>li,#header .right>li').hover(
            function (e) {
                $(this).find('.hide').css("display", "initial");
                heightAuto($(this).find('.hide ul'));// 统一hide中ul元素的高度
                widthAuto($(this).find('.hide'));//hide元素宽度自适应
            },
            function () { $(this).find('.hide').css("display", "none") }
        );

        //打开登录框
        $('#header .login').on('click', onLogin);
        //关闭登录框 
        $('#login').on('click', '.del', () => {
            clearInterval(timer);//清除计时器
            delLogin();//清除登录模块
        });

        $('#login').on('click', '.option', function () {// 选择登录方式
            var index = $('#login .option').index(this);
            $(this).addClass('active');
            $(this).siblings('.option').removeClass('active');
            $('#login .con').eq(index).css('display', 'block');
            $('#login .con').eq(index).siblings('.con').css('display', 'none');
        });

        // 选择手机号前置号码
        $('#login').on('click', '.selecter', function (e) {
            e.stopPropagation();
            $('#login .selecter .list').toggle();
            document.onclick = () =>
                $('#login .selecter .list').css('display', 'none');
        });
        $('#login').on('click', '.selecter .list li', function (each) {
            $('#login .selecter .number').text($(this).find('b').text())
        });

        //手机号验证
        var timeOut = null;
        $('#login').on({
            "input": function () {
                var hint = $(this).siblings('.hint');
                var reg = /^1\d{10}$/;
                $('#login .hint2').css('display', 'none')
                $(this).val($(this).val().trim());//清除首位空格
                clearTimeout(timeOut);//防抖
                timeOut = setTimeout(() => {
                    if (reg.test($('#login .txt').val())) {//验证手机号是否合格
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
        }, 'input[type=text]');
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

        var bln = false, timer = null, iphoneNumber;//短信验证成功后bln为true
        $('#login').on('click', '.bt3', e => {//打开验证框
            var str1 = $('#login .code').text().toLowerCase();
            var str2 = $('#login .t3').val().toLowerCase();
            if (str1 === str2) {//验证成功
                $('#login .son').fadeOut(500, () => {//关闭验证框
                    $('#header .mengBan2').css('display', 'none');
                    $('#login .t3').val('');
                    //存储手机号
                    iphoneNumber = $('#login .txt').val();
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
                });
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

        //判定手机验证码
        $('#login').on('click', '.bt2', e => {
            if (bln && ($('#login .txt').val() == iphoneNumber)) {//判定成功
                if (localStorage.getItem('user' + iphoneNumber)) {//为老用户
                    // 存储登录状态
                    var json = JSON.stringify({ "iphoneNumber": iphoneNumber });
                    localStorage.setItem('userState', json);
                    clearInterval(timer);//清除计时器
                    whetherLogin();//添加我的顺丰模块
                } else {//为新用户
                    $('#login .clause').fadeIn(100, () => {//出现条款
                        $('#header .mengBan2').css('display', 'initial');
                    });
                };
            } else {//判定失败
                $('#login .hint2').css('display', 'initial');
            };
        });
        //注册成功
        $('#login').on('click', '.bt4', e => {
            clearInterval(timer);//清除计时器
            // 将新用户账号存入本地
            var json = JSON.stringify({ "iphoneNumber": iphoneNumber });
            localStorage.setItem('user' + iphoneNumber, json);
            localStorage.setItem('userState', json);
            whetherLogin();//添加我的顺丰模块
        });
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
// 用户是否登录
function whetherLogin() {
    var userState = JSON.parse(localStorage.getItem('userState'));
    if (userState && userState.iphoneNumber) {//用户已登录
        var str = userState['iphoneNumber'].substring(0, 3) + '****' + userState['iphoneNumber'].substring(7, 12);
        $('#header .right li').eq(0).html(`
            <span>欢迎您：</span>
            <span>${str}</span>
            <a class = "my" href="https://www.sf-express.com/cn/sc/user_center/">我的顺丰&gt;</a>
        `);
        delLogin();//清除登录模块
    };
};
function loginInit() {//初始化登录框状态
    $('#login .option').eq(0).addClass('active');
    $('#login .con').eq(0).css('display', 'block');
    $('#login .con input[type=checkbox]').prop('checked', true);
    $('#login .selecter .number').text($('#login .selecter b').eq(0).text())
};
function delLogin() {//清除登录模块
    $('#login').stop(true, true).fadeOut(400, () => {
        $('#header .mengBan').css("display", "none");
        $('#login').empty();//清除登录模块
    });
}
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
//显示登录的
function onLogin() {
    $('#login').html(loginDom);//加载登录模块
    loginInit();//初始化登录框状态
    $('#login').stop(true, true).fadeIn(400, () => { $('#header .mengBan').css("display", "block") });
}

// login html结构
var loginDom = `<a class="del" href="###">×</a>
<div class="title">
    <a class="option" href="###">扫码登录</a>
    <a class="option" href="###">账号登录</a>
</div>
<div class="con">
    <p>
        <a target="_blank" href="https://v.sf-express.com">我是月结企业用户</a>
    </p>
    <h4>登录后即可免验证快速下单与查件</h4>
    <img src="./img/index_img/img3.png" alt="">
    <h5>请使用微信扫描二维码</h5>
    <h4>
        <input type="checkbox" id="zidong">
        <label for="zidong">自动登录</label>
    </h4>
</div>
<div class="con">
    <p class="p3">登录后即可免验证快速下单与查件</p>
    <div class="form">
        <div class="form_group">
            <div class="selecter">
                <span class="number"></span>
                <i class="arrows "></i>
                <ul class="list">
                    <li><span>中国内地</span><b>+86</b></li>
                    <li><span>中国香港</span><b>+852</b></li>
                    <li><span>中国澳门</span><b>+853</b></li>
                    <li><span>中国台湾</span><b>+886</b></li>
                </ul>
            </div>
            <input type="text" class="txt" placeholder="请输入手机号">
            <i class="hint">!</i>
        </div>
        <div class="form_group">
            <input type="text" class="txt t2" placeholder="请输入验证码">
            <input type="button" class="btn bt1" value="获取验证码">
            <span class="hint2">输入有误</span>
        </div>
        <p class="p4">未注册用户登录默认注册顺丰会员</p>
        <h4>
            <input type="checkbox" id="zidong2">
            <label for="zidong2">自动登录</label>
        </h4>
        <input type="button" class="btn bt2" value="快速登录">
        <a class="big" target="_blank" href="https://v.sf-express.com">我是月结企业用户</a>
    </div>
</div>
<p class="p2">
    <span>
        登录即代表您已经同意<a href="https://www.sf-express.com/cn/sc/Privacy_Policy/">《顺丰速运隐私政策》</a>
    </span>
</p>
<div class="son w-position">
    <a class="del2" href="###">×</a>
    <strong>图形验证码</strong>
    <div class="code" style="user-select: none;"></div>
    <input type="text" class="txt t3" placeholder="请输入图片中验证码">
    <input type="button" class="btn bt3 active2" value="确定">
    <p class="p5">温馨提示：同一手机号码，每天限收15条验证短信</p>
    <div class="hide w-position">请输入正确的验证码</div>
</div>
<div class="clause w-position">
    <a class="del2" href="###">×</a>
    <strong>服务条款及隐私条款</strong>
    <div class="conText">
        <p>
            在您注册成为顺丰速运会员的过程中，您需要通过点击同意的形式在线签署 《顺丰速运服务条款》、
            《顺丰速运隐私政策》，请您务必仔细阅读、充分理解条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）。
        </p>
        <p>
            请您注意：如果您不同意上述服务条款、隐私政策或其中任何约定，请您停止注册。如您阅读并点击同意即表示您已充分阅读、理解并接受其全部内容，并表明您也同意顺丰速运可以依据以上隐私政策来处理您的个人信息。如您对以上服务条款、隐私政策有任何疑问，您可联系顺丰速运客服。
        </p>
        <p>
            点击同意即表示您已阅读并同意<a target="_blank" href="https://www.sf-express.com/cn/sc/other/terms_service/index.html">《顺丰速运服务条款》</a>、 <a target="_blank" href="https://www.sf-express.com/cn/sc/Privacy_Policy/index.html">《顺丰速运隐私政策》</a>
        </p>
    </div>
    <input type="button" class="btn bt4 active2" value="同意条款并注册会员">
</div>
<div class="mengBan2"></div>
`
