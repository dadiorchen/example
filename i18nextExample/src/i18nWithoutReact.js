import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const i18nextWithoutReact = i18next
	.use(LanguageDetector)
	.createInstance({
	lng: 'zh',
	fallbackLng	: 'en',
	debug: true,
	resources: {
		en: {
			translation: {
				"key": "hello world",
				'ERROR'	: 'Somthing wrong',
				'USER_LOGIN_EMAIL_REQUIRED'	: 'Please input your email,{{user}}',
				"title": "Welcome to react using react-i18next",
				"description": {
					"part1": "To get started, edit <1>src/App.js</1> and save to reload.",
					"part2": "Switch language between english and german using buttons above."
				}
			}
		},
		zh: {
			translation: {
				"title": "欢迎来到react，安装了react-i18next",
				"description": {
					"part1": "请编辑 <1>src/App.js</1>然后保存并重新加载来开始",
					"part2": "通过上面的按钮来在英文、德文、中文之间进行切换"
				}
			}
		}
	}
}, function(err, t) {
	// initialized and ready to go!
	//document.getElementById('output').innerHTML = i18next.t('key');
	console.log('the i18next key:',t('key'))
	console.log('the i18next key:',i18next.t('key'))
});

export {i18nextWithoutReact}
