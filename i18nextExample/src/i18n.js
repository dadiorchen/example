import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(reactI18nextModule)
	.init({
		fallbackLng: 'en',

		// have a common namespace used around the full app
		ns: ['translations'],
		defaultNS: 'translations',

		debug: true,

		interpolation: {
			escapeValue: false, // not needed for react!!
		},

		react: {
			wait: true
		}
	},(e,t) => {
		if(e){
			console.error('Wrong when load i18next',e)
		}
		console.warn('Load finished:',t('title'))
	})


export default i18n;
