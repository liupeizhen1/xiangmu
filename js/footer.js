export default footer;
//将公共底部引入页面
function footer(path) {
    $('#footer').load(path, function (){// 引入底部后执行
        console.log(666);
        
    });
};