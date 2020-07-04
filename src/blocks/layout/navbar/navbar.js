/**
 * @file Implementation of the navbar block.
 * @author Andrey Glotov
 */

/* global bodyScrollLock, focusTrap */

import { NavbarDropdown } from '../navbar-dropdown';

// -------------------------- BEGIN MODULE VARIABLES --------------------------

// Block name
const BLOCK_NAME = 'navbar';

// Element class names
const CLASSNAME = {
    BLOCK: BLOCK_NAME,
    VISIBLE: `${BLOCK_NAME}_visible`,
};

// Element selectors
const SELECTOR = {
    BLOCK: `.${BLOCK_NAME}`,
    CONTAINER: `.${BLOCK_NAME}__container`,
    CLOSE_BTN: `.${BLOCK_NAME}__close-btn`,
    DROPDOWN: '.navbar-dropdown',
};

const elements = {};    // Cache for DOM elements.
let dropdowns = [];     // Dropdown instances
let trap = null;        // Focus Trap instance.

// --------------------------- END MODULE VARIABLES ---------------------------

// ----------------------------- BEGIN DOM METHODS ----------------------------

/**
 * Apply mobile visible styles to the navbar.
 */
function showMobileNavbar() {
    elements.navbar.classList.add(CLASSNAME.VISIBLE);
    
    bodyScrollLock.disableBodyScroll(elements.container, {
        reserveScrollBarGap: true,
    });
}

/**
 * Apply mobile hidden styles to the navbar.
 */
function hideMobileNavbar() {
    elements.navbar.classList.remove(CLASSNAME.VISIBLE);

    bodyScrollLock.enableBodyScroll(elements.container);
}

// ------------------------------ END DOM METHODS -----------------------------

// --------------------------- BEGIN EVENT HANDLERS ---------------------------

/**
 * Handle a click event on the close button
 */
function handleCloseClick() {
    hide();
}

// ---------------------------- END EVENT HANDLERS ----------------------------

// --------------------------- BEGIN PUBLIC METHODS ---------------------------

/**
 * Initialize the navbar block.
 * @return true if the block is present on the page, false otherwise.
 */
export function init() {
    elements.navbar = document.querySelector(SELECTOR.BLOCK);
    elements.container = document.querySelector(SELECTOR.CONTAINER);
    elements.closeBtn = elements.container.querySelector(SELECTOR.CLOSE_BTN);

    trap = focusTrap(elements.container, {
        clickOutsideDeactivates: true,
        escapeDeactivates: true,
        initialFocus: elements.container,
        onDeactivate: hideMobileNavbar,
    });

    elements.closeBtn.addEventListener('click', handleCloseClick);

    dropdowns = [].map.call(
        document.querySelectorAll(SELECTOR.DROPDOWN),
        (elem) => new NavbarDropdown(elem)
    );

    return true;
}

/**
 * Hide the navbar on mobile screens.
 */
export function hide() {
    dropdowns.forEach((dropdown) => {
        dropdown.collapse();
    });

    trap.deactivate();
}

/**
 * Show the navbar on mobile screens.
 */
export function show() {
    showMobileNavbar();
    trap.activate();
}

/**
 * Switch between mobile and desktop display modes.
 * 
 * @param {boolean} desktopMode true to activate the desktop mode; false to
 *  activate the mobile mode.
 */
export function setDesktopMode(desktopMode) {
    // Automatically hide the mobile menu.
    if (desktopMode === true) {
        this.hide();
    }

    // Change the display mode of all dropdown menus.
    dropdowns.forEach((dropdown) => {
        dropdown.setDesktopMode(desktopMode);
    });
}

// ---------------------------- END PUBLIC METHODS ----------------------------
