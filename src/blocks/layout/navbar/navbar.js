/**
 * @file Implementation of the navbar block.
 * @author Andrey Glotov
 */

/* global focusTrap */

// -------------------------- BEGIN MODULE VARIABLES --------------------------

const elements = {};    // Cache for DOM elements.
let trap = null;        // Focus Trap instance.

// --------------------------- END MODULE VARIABLES ---------------------------

// ----------------------------- BEGIN DOM METHODS ----------------------------

/**
 * Apply mobile visible styles to the navbar.
 */
function showMobileNavbar() {
    elements.navbar.classList.add('navbar_visible');
}

/**
 * Apply mobile hidden styles to the navbar.
 */
function hideMobileNavbar() {
    elements.navbar.classList.remove('navbar_visible');
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
    elements.navbar = document.querySelector('.navbar');
    elements.container = document.querySelector('.navbar__container');
    elements.closeBtn = elements.container.querySelector('.navbar__close-btn');

    trap = focusTrap(elements.container, {
        clickOutsideDeactivates: true,
        escapeDeactivates: true,
        onDeactivate: hideMobileNavbar,
    });

    elements.closeBtn.addEventListener('click', handleCloseClick);

    return true;
}

/**
 * Hide the navbar on mobile screens.
 */
export function hide() {
    trap.deactivate();
}

/**
 * Show the navbar on mobile screens.
 */
export function show() {
    showMobileNavbar();
    trap.activate();
}

// ---------------------------- END PUBLIC METHODS ----------------------------
