// Polyfill imports
import 'core-js/features/promise';

// Third-party imports
import * as bodyScrollLock from 'body-scroll-lock';
import focusTrap from 'focus-trap';
import Pristine from 'pristinejs';
import svg4everybody from 'svg4everybody';

// Utility imports
import * as FocusUtility from './util/focus';
import * as LazyLoader from './util/lazy-loader';

// Block imports
import { Form } from '../../blocks/common/form';
import * as Header from '../../blocks/layout/header';
import * as TopBanner from '../../blocks/layout/top-banner';

svg4everybody();

window.bodyScrollLock = bodyScrollLock;
window.focusTrap = focusTrap;
window.Pristine = Pristine;

FocusUtility.init();
LazyLoader.init();

Form.initAll();
Header.init();
TopBanner.init();
