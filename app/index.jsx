// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './app';
// import { Provider } from 'react-redux';
// import store from './store';
// // import config from './constants/config/config'

// const root = ReactDOM.createRoot(document.getElementById('root'));
// console.log("***************",root)
// // config(store);
// root.render(
//   <React.StrictMode>
//  <h1>this is me....</h1>
//   </React.StrictMode>
// );
import React from 'react'
import ReactDOM from 'react-dom'
// import {Provider} from 'react-redux' 
// import store from './store'
import App from './app'
// import config from './constants/config/config'
// import { createRoot } from 'react-dom/client';
//import ReactGA from 'react-ga'
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

if(process.env.NODE_ENV == 'production') {
    
Sentry.init({
    dsn: "https://b479f0f019cc48f583321de7a24e228a@o1362805.ingest.sentry.io/6661751",
    debug: false,
    sampleRate: 0.6,
    maxBreadcrumbs: 60,
    normalizeDepth: 7,
    integrations: [
        new BrowserTracing(),
        new Sentry.Replay()],
    tracesSampleRate: 0.01,
   // replaysSessionSampleRate: 0.00001,
    replaysOnErrorSampleRate: 0.1,
    release: "investwell@1.0.0",
    ignoreErrors: ['Non-Error promise rejection captured','ResizeObserver loop', "Failed to read the 'localStorage'" , "postMessage",'window.opener','Cannot redefine property: googletag',"Failed to construct 'URL': Invalid URL","secret is not defined","'null' cannot be parsed as a URL","NetworkError when attempting to fetch resource",
        "missing ) after argument list"],
    beforeSend(event, hint) {
        const isNonErrorException = event.exception && event.exception.values[0].value.startsWith('Non-Error exception captured') || event.exception.values[0].value.match('firefoxSample') || hint.originalException && hint.originalException['message'] && hint.originalException['message'].startsWith('Non-Error exception captured');
    
        if (isNonErrorException) {
            return null;
        }
        return event;
    }
    });
}

// config(store);
const app = document.getElementById('root')
// const root = createRoot(app);
//ReactGA.initialize('UA-176072224-1')
app.render( <App />)