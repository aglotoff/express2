// Polyfill imports
import 'promise-polyfill/src/polyfill';

// Third-party imports
import * as bodyScrollLock from 'body-scroll-lock';
import focusTrap from 'focus-trap';
import svg4everybody from 'svg4everybody';

// Utility imports
import * as FocusUtility from './util/focus';
import * as LazyLoader from './util/lazy-loader';

// Block imports
import * as Header from '../blocks/layout/header';
import * as TopBanner from '../blocks/layout/top-banner';

svg4everybody();

window.bodyScrollLock = bodyScrollLock;
window.focusTrap = focusTrap;

FocusUtility.init();
LazyLoader.init();

Header.init();
TopBanner.init();
