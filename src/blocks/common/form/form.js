/**
 * @file Implementation of the form block.
 * @author Andrey Glotov
 */

/* global Pristine */

// -------------------------- BEGIN MODULE VARIABLES --------------------------

// Block name
const BLOCK_NAME = 'form';

// Element class names
const CLASSNAME = {
    FIELD: `${BLOCK_NAME}__field`,
    ERROR: `${BLOCK_NAME}__error`,
    HAS_ERROR: 'has-error',
};

// Element selectors
const SELECTOR = {
    BLOCK: `.${BLOCK_NAME}`,
};

// Associate class instances with DOM elements using a weak map
const instanceMap = new WeakMap();

// --------------------------- END MODULE VARIABLES ---------------------------

/**
 * General-purpose form block with client-side validation.
 */
export class Form {
    /**
     * Initialize the form block.
     *
     * @param {HTMLElement} root The root element of the block.
     */
    constructor(root) {
        this.elements = { root };

        this.handleSubmit = this.handleSubmit.bind(this);

        this.elements.root.setAttribute('novalidate', 'novalidate');
        this.elements.root.addEventListener('submit', this.handleSubmit, false);

        instanceMap.set(root, this);
    }

    // ------------------------- BEGIN PRIVATE METHODS ------------------------

    // TODO: add code here

    // -------------------------- END PRIVATE METHODS -------------------------

    // -------------------------- BEGIN EVENT HANDLERS ------------------------

    /**
     * Validate the form and, if there are no errors, submit.
     *
     * @param {SubmitEvent} e The submit event object.
     */
    handleSubmit(e) {
        // Defer Pristine initialization to allow live validatin only after
        // the first submit.
        if (!this.pristine) {
            this.pristine = new Pristine(this.elements.root, {
                classTo: CLASSNAME.FIELD,
                errorClass: CLASSNAME.HAS_ERROR,
                // class of the parent element where error text element is appended
                errorTextParent: CLASSNAME.FIELD,
                // type of element to create for the error text
                errorTextTag: 'div',
                // class of the error text element
                errorTextClass: CLASSNAME.ERROR,
            });
        }

        if (!this.pristine.validate()) {
            e.preventDefault();
        }
    }

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
