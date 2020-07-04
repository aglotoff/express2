/**
 * @file Implementation of the navigation bar dropdown block.
 * @author Andrey Glotov
 */

import {
    detectTransitionEnd,
    forceReflow,
} from '../../../js/util/dom-helpers';

// -------------------------- BEGIN MODULE VARIABLES --------------------------

// Block name
const BLOCK_NAME = 'navbar-dropdown';

// Element class names
const CLASSNAME = {
    BLOCK: BLOCK_NAME,
    DESKTOP_ONLY: `${BLOCK_NAME}_desktop-only`,
    EXPANDED: `${BLOCK_NAME}_expanded`,
};

// Element selectors
const SELECTOR = {
    BLOCK: `.${BLOCK_NAME}`,
    TOGGLE: `.${BLOCK_NAME}__toggle`,
    POPUP: `.${BLOCK_NAME}__popup`,
};

// --------------------------- END MODULE VARIABLES ---------------------------

/**
 * Navigation bar dropdown.
 */
export class NavbarDropdown {
    /**
     * Initialize the navbar dropdown block.
     * 
     * @param {HTMLElement} root The root element of the block.
     */
    constructor(root) {
        const toggle = root.querySelector(SELECTOR.TOGGLE);
        const popup = root.querySelector(SELECTOR.POPUP);

        this._elements = {
            root,
            toggle,
            popup,
        };

        this._expanded = false;
        this._desktop = false;

        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

        toggle.addEventListener('click', this.handleToggleClick, false);
    }

    // ------------------------- BEGIN PRIVATE METHODS ------------------------

    // TODO: add code here

    // -------------------------- END PRIVATE METHODS -------------------------

    // -------------------------- BEGIN EVENT HANDLERS ------------------------

    /**
     * Collapse the dropdown when the user presses Escape.
     * 
     * @param {KeyboardEvent} event The event object.
     */
    handleKeyDown(event) {
        if ((event.key === 'Escape') || (event.keyCode === 27)) {
            this.collapse();
            this._elements.toggle.focus();
        }
    }

    /**
     * Collapse the dropdown when the user clicks or moves focus outside the
     * block.
     */
    handleDocumentClick() {
        const target = event.target;

        if ((target != document) && !this._elements.root.contains(target)) {
            this.collapse();
        }
    }

    /**
     * Expand or collapse the dropdown when the user clicks on the button.
     * 
     * @param {MouseEvent} event The event object.
     */
    handleToggleClick(event) {
        if (this._expanded) {
            this.collapse();
        } else {
            this.expand();
        }

        event.preventDefault();
    }

    /**
     * Expand the dropdown when the mouse enters the block.
     */
    handleMouseEnter() {
        this.expand();
    }

    /**
     * Collapse the dropdown when the mouse leves the block.
     */
    handleMouseLeave() {
        this.collapse();
    }

    // --------------------------- END EVENT HANDLERS -------------------------

    // -------------------------- BEGIN PUBLIC METHODS ------------------------

    /**
     * Switch between mobile and desktop display modes.
     * 
     * @param {boolean} desktopMode true to activate the desktop mode; false to
     *  activate the mobile mode.
     */
    setDesktopMode(desktopMode) {
        const { root } = this._elements;

        if (this._desktop === desktopMode) {
            return;
        }

        if (desktopMode) {
            root.addEventListener(
                'mouseenter',
                this.handleMouseEnter,
                false
            );
            root.addEventListener(
                'mouseleave',
                this.handleMouseLeave,
                false
            );
        } else {
            root.removeEventListener(
                'mouseenter',
                this.handleMouseEnter,
                false
            );
            root.removeEventListener(
                'mouseleave',
                this.handleMouseLeave,
                false
            );
        }

        this._desktop = desktopMode;

        this.collapse();
    }

    /**
     * Expand the dropdown.
     */
    expand() {
        if (this._expanded) {
            return;
        }

        const { toggle, popup, root } = this._elements;

        root.classList.add(CLASSNAME.EXPANDED);

        if (!this._desktop) {
            const popupHeight = popup.clientHeight;
            
            popup.style.maxHeight = '0';
            forceReflow(popup);

            popup.style.maxHeight = popupHeight + 'px';
            detectTransitionEnd(popup).then(() => {
                if (this._expanded) {
                    popup.style.maxHeight = '';
                }
            });
        }

        root.addEventListener('keydown', this.handleKeyDown, false);

        document.addEventListener('click', this.handleDocumentClick, false);
        document.addEventListener('focusin', this.handleDocumentClick, false);

        toggle.setAttribute('aria-expanded', 'true');

        this._expanded = true;
    }

    /**
     * Collapse the dropdown.
     */
    collapse() {
        if (!this._expanded) {
            return;
        }

        const { toggle, popup, root } = this._elements;

        if (!this._desktop) {
            const popupHeight = popup.clientHeight;
            
            popup.style.maxHeight = popupHeight + 'px';
            forceReflow(popup);

            popup.style.maxHeight = '0';
            detectTransitionEnd(popup).then(() => {
                if (!this._expanded) {
                    popup.style.maxHeight = '';
                    root.classList.remove(CLASSNAME.EXPANDED);
                }
            });
        } else {
            root.classList.remove(CLASSNAME.EXPANDED);
        }

        root.removeEventListener('keydown', this.handleKeyDown, false);

        document.removeEventListener('click', this.handleDocumentClick, false);
        document.removeEventListener('focus', this.handleDocumentClick, false);

        toggle.setAttribute('aria-expanded', 'false');

        this._expanded = false;
    }

    // --------------------------- END PUBLIC METHODS -------------------------
}
