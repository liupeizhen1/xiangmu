// $('.select').mouseenter(function(){
//     $('.select p').css({
//         // 'color':'#dc1e32',
//         'border-bottom':'1px solid #dc1e32'
//     })
    
// })
$('#header').load('../common/header.html');

import { header, onLogin } from '../../js/header.js';
header('../common/header.html');

$('#footer').load('../common/footer.html');
import footer from '../../js/footer.js'
footer('../common/footer.html')
// $('#login').click(function(){
//     console.log(6);
var timer = setTimeout(function(){
    if($('.shouye a').attr('href').indexOf('./') >= 0){
        $('.shouye a').attr('href','../index.html')
        $('.nav .guanyu').attr('href','../about_us/index.html')
        $('.chenggong').attr('href','../successfulCase/index.html')
    }
},1000)  
// })
// $('#login .con img').attr('src','../../img/index_img/img3.png');

