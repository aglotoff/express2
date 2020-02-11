// Polyfill imports
import 'promise-polyfill/src/polyfill';

// Third-party imports
import focusTrap from 'focus-trap';
import svg4everybody from 'svg4everybody';

// Utility imports
import * as FocusUtility from './util/focus';
import * as LazyLoader from './util/lazy-loader';

// Block imports
import * as Header from '../blocks/common/header';
import * as TopBanner from '../blocks/common/top-banner';

svg4everybody();

window.focusTrap = focusTrap;

FocusUtility.init();
LazyLoader.init();

Header.initBlock();
TopBanner.initBlock();
