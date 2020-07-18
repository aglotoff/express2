/**
 * @file Implementation of the form block.
 */

// -------------------------- BEGIN MODULE VARIABLES --------------------------

// Block name
const BLOCK_NAME = 'form';

// Element class names
const CLASSNAME = {
    BLOCK: BLOCK_NAME,
};

// Element selectors
const SELECTOR = {
    BLOCK: `.${BLOCK_NAME}`,
};

// Associate class instances with DOM elements using a weak map
const instanceMap = new WeakMap();

// TODO: add code here

// --------------------------- END MODULE VARIABLES ---------------------------

/**
 * form.
 */
export class Form {

    /**
     * Initialize the form block.
     * 
     * @param {HTMLElement} root The root element of the block.
     */
    constructor(root) {
        // TODO: add code here

        instanceMap.set(root, this);
    }

    // ------------------------- BEGIN PRIVATE METHODS ------------------------

    // TODO: add code here

    // -------------------------- END PRIVATE METHODS -------------------------

    // -------------------------- BEGIN EVENT HANDLERS ------------------------

    // TODO: add code here

    // --------------------------- END EVENT HANDLERS -------------------------

    // -------------------------- BEGIN PUBLIC METHODS ------------------------

    /**
     * Get a block instance associated with the given DOM element.
     *
     * @param {HTMLElement} element The element.
     * @returns {Object | null} The associated instance or null if no such
     *  instance exists.
     */
    static getInstance(element) {
        return instanceMap.get(element);
    }

    /**
     * Initialize all form blocks on the page.
     */
    static initAll() {
        [].forEach.call(document.querySelectorAll(SELECTOR.BLOCK), (root) => {
            new Form(root);
        });
    }

    // --------------------------- END PUBLIC METHODS -------------------------
}
