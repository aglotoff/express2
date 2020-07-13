/**
 * @file Implementation of the header block.
 * @author Andrey Glotov
 */

// Utility Imports
import { forceReflow } from '../../../assets/js/util/dom-helpers';
import { debounce, throttle } from '../../../assets/js/util/helpers';

// Block Imports
import * as Navbar from '../navbar';

// -------------------------- BEGIN MODULE VARIABLES --------------------------

// Block name
const BLOCK_NAME = 'header';

// Element class names
const CLASSNAME = {
    BLOCK: BLOCK_NAME,
    HIDDEN: `${BLOCK_NAME}_hidden`,
    ANIMATED: `${BLOCK_NAME}_animated`,
    SCROLL: `${BLOCK_NAME}_scroll`,
};

// Element selectors
const SELECTOR = {
    BLOCK: `.${BLOCK_NAME}`,
    TOPBAR: `.${BLOCK_NAME}__top`,
    NAVBAR: `.${BLOCK_NAME}__navbar`,
    NAVBAR_TOGGLE: `.${BLOCK_NAME}__navbar-toggle`,
};

const RESIZE_INTERVAL = 200; // Resize event debounce interval, in ms
const SCROLL_INTERVAL = 200; // Scroll event throttling interval, in ms
const DESKTOP_MEDIA = '(min-width: 62em)'; // Desktop breakpoint

// DOM elements map
const elements = {};

// Possible header states
const SCROLL_STATES = {
    NORMAL: 0,
    STICKY: 1,
    VISIBLE: 2,
};

// Is desktop layout active?
let isDesktop = false;

// Current header scroll state
let scrollState = SCROLL_STATES.NORMAL;

// --------------------------- END MODULE VARIABLES ---------------------------

// -------------------------- BEGIN UTILITY FUNCTIONS -------------------------

// TODO: add code here

// --------------------------- END UTILITY FUNCTIONS --------------------------

// ----------------------------- BEGIN DOM METHODS ----------------------------

// TODO: add code here

// ------------------------------ END DOM METHODS -----------------------------

// --------------------------- BEGIN EVENT HANDLERS ---------------------------

/**
 * Handle a click event on the navbar toggle button.
 */
function handleNavbarToggleClick() {
    Navbar.show();
}

/**
 * Handle the window resize event.
 */
const handleWindowResize = debounce(() => {
    if (window.matchMedia(DESKTOP_MEDIA).matches !== isDesktop) {
        isDesktop = !isDesktop;

        handleWindowScroll();

        Navbar.setDesktopMode(isDesktop);
    }
}, RESIZE_INTERVAL);

/**
 * Add or remove header classes basd on the current scroll offset to create an
 * animated sticky header effect.
 */
const handleWindowScroll = throttle(() => {
    // Determine height and offset of the "sticky" part of the header.
    let barHeight;
    if (isDesktop) {
        barHeight = elements.navbar.offsetHeight;
    } else {
        barHeight = elements.topbar.offsetHeight;
    }
    const offset = barHeight - elements.header.getBoundingClientRect().bottom;

    // Determine the new scroll state.
    let newState;
    if (offset < (barHeight * 3)) {
        newState = SCROLL_STATES.NORMAL;
    } else if (offset < (barHeight * 6)) {
        newState = SCROLL_STATES.STICKY;
    } else {
        newState = SCROLL_STATES.VISIBLE;
    }

    // Apply the new scroll state.
    const { header } = elements;
    if (newState !== scrollState) {
        if (newState === SCROLL_STATES.NORMAL) {
            header.classList.remove(CLASSNAME.SCROLL);
            header.classList.remove(CLASSNAME.HIDDEN);
            header.classList.remove(CLASSNAME.ANIMATED);
            header.style.paddingBottom = '';
        } else if (newState === SCROLL_STATES.STICKY) {
            header.classList.add(CLASSNAME.SCROLL);
            header.classList.add(CLASSNAME.HIDDEN);
            header.style.paddingBottom = `${barHeight}px`;

            forceReflow(header);

            header.classList.add(CLASSNAME.ANIMATED);
        } else { // SCROLL_STATES.VISIBLE
            if (scrollState === SCROLL_STATES.NORMAL) {
                // Make sure the animation is played.
                header.classList.add(CLASSNAME.SCROLL);
                header.classList.add(CLASSNAME.HIDDEN);
                header.style.paddingBottom = `${barHeight}px`;

                forceReflow(header);

                header.classList.add(CLASSNAME.ANIMATED);
            }

            header.classList.remove(CLASSNAME.HIDDEN);
        }

        scrollState = newState;
    }
}, SCROLL_INTERVAL);

// ---------------------------- END EVENT HANDLERS ----------------------------

// --------------------------- BEGIN PUBLIC METHODS ---------------------------

/**
 * Initialize the header block.
 *
 * @return true if the block is present on the page, false otherwise.
 */
export function init() {
    const header = document.querySelector(SELECTOR.BLOCK);
    if (header == null) {
        return false;
    }

    const topbar = header.querySelector(SELECTOR.TOPBAR);
    const navbar = header.querySelector(SELECTOR.NAVBAR);
    const navbarToggle = header.querySelector(SELECTOR.NAVBAR_TOGGLE);

    elements.header = header;
    elements.topbar = topbar;
    elements.navbar = navbar;

    Navbar.init();

    navbarToggle.addEventListener('click', handleNavbarToggleClick);

    window.addEventListener('resize', handleWindowResize, false);
    window.addEventListener('scroll', handleWindowScroll, false);

    // Process initial screen size and position.
    handleWindowResize();
    handleWindowScroll();

    return true;
}

// ---------------------------- END PUBLIC METHODS ----------------------------
