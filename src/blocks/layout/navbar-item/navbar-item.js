/**
 * @file Implementation of the navbar item block.
 * @author Andrey Glotov
 */

// -------------------------- BEGIN MODULE VARIABLES --------------------------

const BLOCK_NAME = 'navbar-item';

const CLASSNAME = {
    BLOCK: BLOCK_NAME,
};

const SELECTOR = {
    BLOCK: `.${BLOCK_NAME}`,
};

// TODO: add code here

// --------------------------- END MODULE VARIABLES ---------------------------

/**
 * navbar item.
 */
export class NavbarItem {
    /**
     * Initialize the navbar item block.
     * 
     * @param {HTMLElement} rootElement The root element of the block.
     */
    constructor(rootElement) {
        // TODO: add code here
    }

    // ------------------------- BEGIN PRIVATE METHODS ------------------------

    // TODO: add code here

    // -------------------------- END PRIVATE METHODS -------------------------

    // -------------------------- BEGIN EVENT HANDLERS ------------------------

    // TODO: add code here

    // --------------------------- END EVENT HANDLERS -------------------------

    // -------------------------- BEGIN PUBLIC METHODS ------------------------

    /**
     * Initialize all navbar item blocks on the page.
     */
    static initAll() {
        const blocks = [].slice.call(document.querySelectorAll(SELECTOR.BLOCK));
        for (const block of blocks) {
            new NavbarItem(block);
        }
    }

    // --------------------------- END PUBLIC METHODS -------------------------
}
