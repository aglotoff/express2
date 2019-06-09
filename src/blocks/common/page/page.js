/**
 * @file Implementation of the page block
 */

import Header from '../header/header';
import MainMenu from '../main-menu/main-menu';
import TopBanner from '../top-banner/top-banner';

// -------------------------- BEGIN MODULE VARIABLES --------------------------
const RESIZE_INTERVAL = 200;    // Resize event debouncing interval
const SCROLL_INTERVAL = 200;    // Scroll event throttling interval

let resizeTimer = null;

let scrollTimer = null;
let wasScrolled = false;
// --------------------------- END MODULE VARIABLES ---------------------------

// --------------------------- BEGIN EVENT HANDLERS ---------------------------
/**
 * Handle the window scroll event
 */
function handleWindowScroll() {
    // TODO: add code
}

/**
 * Handle the window resize event
 */
function handleWindowResize() {
    Header.handleResize();
}

/**
 * Debounce the window resize event
 */
function debounceWindowResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleWindowResize, RESIZE_INTERVAL);
}

/**
 * Throttle the window scroll event
 */
function throttleWindowScroll() {
    if (scrollTimer) {
        // Ensure that we catch and execute that last invocation.
        wasScrolled = true;
        return;
    }

    handleWindowScroll();

    scrollTimer = this.setTimeout(function() {
        scrollTimer = null;
        if (wasScrolled) {
            handleWindowScroll();
            wasScrolled = false;
        }
    }, SCROLL_INTERVAL);
}
// ---------------------------- END EVENT HANDLERS ----------------------------

// --------------------------- BEGIN PUBLIC METHODS ---------------------------
/**
 * Initialize the page block.
 * @return true
 */
function initBlock() {
    window.addEventListener('resize', debounceWindowResize);
    window.addEventListener('scroll', throttleWindowScroll);

    Header.initBlock();
    MainMenu.initBlock();
    TopBanner.initBlock();

    // Process the initial window size and scroll position
    handleWindowResize();
    handleWindowScroll();

    return true;
}
// ---------------------------- END PUBLIC METHODS ----------------------------

export default {
    initBlock,
};
