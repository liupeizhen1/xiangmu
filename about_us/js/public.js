
$('#header').load('../common/header.html');

import { header, onLogin } from '../../js/header.js';
header('../common/header.html');

$('#footer').load('../common/footer.html');
import footer from '../../js/footer.js';
footer('../common/footer.html')
// $('#login').click(function(){
//     console.log(6);
var timer = setTimeout(function(){
    if($('.shouye').attr('href').indexOf('./') >= 0){
        $('.shouye').attr('href','../index.html')
        $('.nav .guanyu').attr('href','./index.html')
        $('.guanyu1').attr('href','./index.html')
        $('.chenggong').attr('href','../successfulCase/index.html')
    }
},1000)


