import React, { Component } from 'react';
import { I18n, Trans ,translate} from 'react-i18next';
import {i18nextWithoutReact as i} from './i18nWithoutReact.js'
import logo from './logo.svg';
import './App.css';

export class App extends Component {
  render() {
    return (
      <I18n ns="translations">
        {
          (t, { i18n }) => (
            <div className="App">
              <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>{t('title')}</h2>
                <button onClick={() => i18n.changeLanguage('de')}>de</button>
                <button onClick={() => i18n.changeLanguage('en')}>en</button>
                <button onClick={() => i18n.changeLanguage('zh')}>zh</button>
              </div>
              <div className="App-intro">
                <Trans i18nKey="description.part1">
                  To get started, edit <code>src/App.js</code> and save to reload.
                </Trans>
              </div>
              <div>{t('description.part2')}</div>
            </div>
          )
        }
      </I18n>
    );
  }
}

/* the way to use i18n directly , but it DO NOT WORK TODO[*/
export class AppDirectly extends Component {
  render() {
	  //translate.setI18n(i18n)
	  //console.error('the translate:',translate)
    return (
		<div className="App">
			<div className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h2>{i.t('title')}</h2>
				<button onClick={() => i.changeLanguage('de')}>de</button>
				<button onClick={() => {
					i.changeLanguage('en')
					this.forceUpdate()
				}}>en</button>
				<button onClick={() => i.changeLanguage('zh')}>zh</button>
			</div>
			<div className="App-intro">
			</div>
			<div>{i.t('description.part2')}</div>
			<div>{i.t([require('./indexWithoutReact.js').ERROR.USER_LOGIN_EMAIL_REQUIRED + '2','ERROR'])}</div>
                <Trans i18nKey="description.part1" i18n={i} >
                  To get started, edit <strong>src/App.js</strong> and save to reload.
                </Trans>

		</div>     
    );
  }
}



