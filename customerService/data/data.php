<?php
	$age = $_GET['age'];
	switch ($age) {
		case '1':
			echo '{"span":"您可以直接输入手机号，小满将立即为您查询快件的最新信息","span2":"PS: 目前仅支持中国大陆地区的手机号进行查询"}';
			break;
		case '哈哈':
			echo '{"span":"这就是人类的感情吗？小满也要开心一下呢~"}';
            break;
        case '嘻嘻':
			echo '{"span":"这是好事要来的节奏吗？"}';
            break;
        case '你是猪':
			echo '{"span":"猪也有厉害的.猪八戒丶晴天小猪，小满业希望能帮你解决问题的~，"}';
			break;
		default:
            echo '{"span":"亲！小满没有理解您的意思，要不你换个方式问问吧，如：我要下单丶查运费丶查时效..."}';
			break;
	}
?>