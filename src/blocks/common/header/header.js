/**
 * @file Implementation of the header block
 * @author Andrey Glotov
 */

/* global focusTrap */

// -------------------------- BEGIN MODULE VARIABLES --------------------------
const elements = {};
const state = {};
// --------------------------- END MODULE VARIABLES ---------------------------

// -------------------------- BEGIN UTILITY FUNCTIONS -------------------------
// TODO: add code here
// --------------------------- END UTILITY FUNCTIONS --------------------------

// ----------------------------- BEGIN DOM METHODS ----------------------------
function showMobileNavbar() {
    elements.navbar.classList.add('header__navbar_visible');
    state.trap.activate();
}

function hideMobileNavbar() {
    elements.navbar.classList.remove('header__navbar_visible');
}
// ------------------------------ END DOM METHODS -----------------------------

// --------------------------- BEGIN EVENT HANDLERS ---------------------------
function handleNavbarToggleClick() {
    showMobileNavbar();
}

function handleNavbarCloseClick() {
    state.trap.deactivate();
}
// ---------------------------- END EVENT HANDLERS ----------------------------

// --------------------------- BEGIN PUBLIC METHODS ---------------------------
/**
 * Initialize the header block.
 * @return true if the block is present on the page, false otherwise
 */
function initBlock() {
    const header = document.querySelector('.header');
    if (header == null) {
        return false;
    }

    const navbar = header.querySelector('.header__navbar');
    const navbarToggle = header.querySelector('.header__navbar-toggle');
    const navbarClose = navbar.querySelector('.header__navbar-close');

    elements.navbar = navbar;

    state.trap = focusTrap(navbar, {
        clickOutsideDeactivates: true,
        escapeDeactivates: true,
        onDeactivate: hideMobileNavbar,
    });

    navbarToggle.addEventListener('click', handleNavbarToggleClick);
    navbarClose.addEventListener('click', handleNavbarCloseClick);

    return true;
}
// ---------------------------- END PUBLIC METHODS ----------------------------

export default {
    initBlock,
};
