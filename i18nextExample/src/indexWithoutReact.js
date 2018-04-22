/* This file run a node js , and without react support, just using i18next directly */
import {i18nextWithoutReact} from './i18nWithoutReact.js';

console.log('This is i18next :',i18nextWithoutReact.t('key'))

/* Try to demo the error handle of i18n */

export const ERROR = {
	ERROR	: 'Something wrong!',
	USER_LOGIN_EMAIL_REQUIRED	: 'USER_LOGIN_EMAIL_REQUIRED',
}

const login = () => {
	throw ERROR.USER_LOGIN_EMAIL_REQUIRED 
}


try{
	login()
}catch(e){
	console.log('The error:',i18nextWithoutReact.t(e,{user:'Deanchen'}))
}
