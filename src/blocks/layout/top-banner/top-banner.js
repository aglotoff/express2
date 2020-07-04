/**
 * @file Implementation of the top banner block.
 * @author Andrey Glotov
 */

import { scrollTo } from '../../../js/util/dom-helpers';
import { throttle } from '../../../js/util/helpers';

// -------------------------- BEGIN MODULE VARIABLES --------------------------

// Block name
const BLOCK_NAME = 'top-banner';

// Element class names
const CLASSNAME = {
    BLOCK: BLOCK_NAME,
    SCROLL_ANIMATED: `${BLOCK_NAME}__scroll_animated`,
};

// Element selectors
const SELECTOR = {
    BLOCK: `.${BLOCK_NAME}`,
    SCROLL: `.${BLOCK_NAME}__scroll`,
};

const SCROLL_DURATION = 300;    // Scroll-down animation duration, ms.
const SCROLL_INTERVAL = 200;    // Window scroll event throttling interval, ms.

// Cache HTML elements
const elements = {};    

// --------------------------- END MODULE VARIABLES ---------------------------

// -------------------------- BEGIN UTILITY FUNCTIONS -------------------------

// TODO: add code here

// --------------------------- END UTILITY FUNCTIONS --------------------------

// ----------------------------- BEGIN DOM METHODS ----------------------------

// TODO: add code here

// ------------------------------ END DOM METHODS -----------------------------

// --------------------------- BEGIN EVENT HANDLERS ---------------------------

/**
 * Handle click on the scroll-down button.
 * 
 * @param {MouseEvent} e The event object.
 */
function handleScrollClick(e) {
    e.preventDefault();

    const targetHref = e.currentTarget.getAttribute('href');
    if ((targetHref === '') || (targetHref.charAt(0) !== '#')) {
        return;
    }

    const targetId = targetHref.substr(1);
    const targetElem = document.getElementById(targetId);
    if (targetElem == null) {
        return;
    }

    scrollTo(targetElem, SCROLL_DURATION).then(() => targetElem.focus());
}

/**
 * Disable scroll button animation when the banner gets out of the viewport.
 */
const handleWindowScroll = throttle(function () {
    const { bottom } = elements.banner.getBoundingClientRect();
    if (bottom <= 0) {
        elements.scrollBtn.classList.remove(CLASSNAME.SCROLL_ANIMATED);
        window.removeEventListener('scroll', handleWindowScroll, false);
    }
}, SCROLL_INTERVAL);

// ---------------------------- END EVENT HANDLERS ----------------------------

// --------------------------- BEGIN PUBLIC METHODS ---------------------------

/**
 * Initialize the top banner block.
 *
 * @return true if the block is present on the page, false otherwise.
 */
export function init() {
    const banner = document.querySelector(SELECTOR.BLOCK);
    if (banner == null) {
        return false;
    }
    
    const scrollBtn = banner.querySelector(SELECTOR.SCROLL);
    scrollBtn.addEventListener('click', handleScrollClick, false);

    elements.banner = banner;
    elements.scrollBtn = scrollBtn;

    handleWindowScroll();
    window.addEventListener('scroll', handleWindowScroll, false);

    return true;
}

// ---------------------------- END PUBLIC METHODS ----------------------------
