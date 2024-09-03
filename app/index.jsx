
import React from 'react'
import App from './app'
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { createRoot } from 'react-dom/client';

console.log('*********** hiiiii', app)

if (process.env.NODE_ENV == 'production') {

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
        replaysOnErrorSampleRate: 0.1,
        release: "investwell@1.0.0",
        ignoreErrors: ['Non-Error promise rejection captured', 'ResizeObserver loop', "Failed to read the 'localStorage'", "postMessage", 'window.opener', 'Cannot redefine property: googletag', "Failed to construct 'URL': Invalid URL", "secret is not defined", "'null' cannot be parsed as a URL", "NetworkError when attempting to fetch resource",
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
const app = document.getElementById('root')
const root = createRoot(app);
console.log("******************",root)
root.render( <App />)