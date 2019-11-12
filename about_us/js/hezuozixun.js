$('#policyload').click(function () {
    $('#policyload').css('color', '#333')
});

// 验证码
$('.zheng-img').click(function () {
    var av = $('.zheng-img').attr('src');
    if (av == 'img/1004.jpg') {
        $('.zheng-img').attr('src', 'img/10010.jpg');
    } else if (av == 'img/10010.jpg') {
        $('.zheng-img').attr('src', 'img/1011.jpg');
    } else if (av == 'img/1011.jpg') {
        $('.zheng-img').attr('src', 'img/1013.jpg');
    } else if (av == 'img/1013.jpg') {
        $('.zheng-img').attr('src', 'img/1010.jpg');
    } else {
        $('.zheng-img').attr('src', 'img/1011.jpg');
    }
});
// 验证输入框是否有内容
$('.subcladd .text').focus(function () {
    $(this).parent().css({ 'background': '#f1f1f1' });
    $(this).parent().next().css('display', 'none');
    $(this).blur(function () {
        var sum = $(this);
        if ($(this).val()) {

        } else {
            if ($(this).parent().prev().children().text().indexOf('*') == -1) {
            }else{
                $(this).parent().next().css('display', 'inline-block');
                $(this).parent().css({ 'background': 'pink', 'opacity': '0.5' })
            }      
        }
    })
});
$('.yanclass .text').focus(function () {
    $(this).parent().next().css('display', 'inline-block');
    $('.yanzheng').css('display', 'none')
    $(this).blur(function () {
        if ($(this).val()) {

        } else {
            $('.yanzheng').css('display', 'inline-block')
        }
    })
})
