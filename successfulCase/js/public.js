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
    if($('.nav>ul>li>a').attr('href').indexOf('./') >= 0){
        $('.nav>ul>li>a').attr('href','../index.html')
    }
},1000)   
// })
// $('#login .con img').attr('src','../../img/index_img/img3.png');

