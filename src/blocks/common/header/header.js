/**
 * @file Implementation of the header block
 * @author Andrey Glotov
 */

import Navbar from '../navbar/navbar';

// -------------------------- BEGIN MODULE VARIABLES --------------------------
const DESKTOP_BREAKPOINT = 992;
let isDesktop = false;
// --------------------------- END MODULE VARIABLES ---------------------------

// -------------------------- BEGIN UTILITY FUNCTIONS -------------------------
// TODO: add code here
// --------------------------- END UTILITY FUNCTIONS --------------------------

// ----------------------------- BEGIN DOM METHODS ----------------------------
// TODO: add code here
// ------------------------------ END DOM METHODS -----------------------------

// --------------------------- BEGIN EVENT HANDLERS ---------------------------
/**
 * Handle a click event on the navbar toggle button
 */
function handleNavbarToggleClick() {
    Navbar.show();
}
// ---------------------------- END EVENT HANDLERS ----------------------------

// --------------------------- BEGIN PUBLIC METHODS ---------------------------
/**
 * Initialize the header block.
 * @return true if the block is present on the page, false otherwise
 */
function initBlock() {
    const header = document.querySelector('.header');
    const navbarToggle = header.querySelector('.header__navbar-toggle');

    Navbar.initBlock();

    navbarToggle.addEventListener('click', handleNavbarToggleClick);

    return true;
}

/**
 * Handle the window resize event
 */
function handleResize() {
    // Switch between drilldown submenus on mobile and dropdown submenus on
    // desktop
    if (isDesktop && (window.innerWidth < DESKTOP_BREAKPOINT)) {
        isDesktop = false;
    } else if (!isDesktop && (window.innerWidth >= DESKTOP_BREAKPOINT)) {
        isDesktop = true;

        Navbar.hide();
    }
}
// ---------------------------- END PUBLIC METHODS ----------------------------

export default {
    initBlock,
    handleResize,
};
