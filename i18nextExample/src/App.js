import React, { Component } from 'react';
import { I18n, Trans ,translate} from 'react-i18next';
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
	  const i18n = require('./i18n').default
	  console.log('i18n:',i18n.t('title'))
	  translate.setI18n(i18n)
	  console.error('the translate:',translate)
    return (
		<div className="App">
			<div className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h2>{i18n.t('title')}</h2>
				<button onClick={() => i18n.changeLanguage('de')}>de</button>
				<button onClick={() => i18n.changeLanguage('en')}>en</button>
				<button onClick={() => i18n.changeLanguage('zh')}>zh</button>
			</div>
			<div className="App-intro">
			</div>
			<div>{('description.part2')}</div>
		</div>     
    );
  }
}



