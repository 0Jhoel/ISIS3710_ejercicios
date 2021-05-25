import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ListSeries from './components/ListSeries';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {IntlProvider} from "react-intl";
import LocaleEsMessages from "./locales/es.json";
import LocaleEnMessages from "./locales/en.json";

const language = window.navigator.language || navigator.browserLanguage;

ReactDOM.render(
  <IntlProvider locale={language} messages={language.startsWith("es") ? LocaleEsMessages : LocaleEnMessages}>
    <ListSeries />
  </IntlProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
