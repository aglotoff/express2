/**
 * @file Implementation of the top banner block
 * @author Andrey Glotov
 */

// -------------------------- BEGIN MODULE VARIABLES --------------------------

const SCROLL_DURATION = 500;

// --------------------------- END MODULE VARIABLES ---------------------------

// -------------------------- BEGIN UTILITY FUNCTIONS -------------------------

function scrollTo(target, duration) {
    const startOffset = window.pageYOffset;

    const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );
    const windowHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

    const targetOffset = ((documentHeight - target.offsetTop) < windowHeight)
        ? documentHeight - windowHeight
        : target.offsetTop;

    let start = null;

    function step(timestamp) {
        if (!start) {
            start = timestamp;
        }

        const deltaTime = timestamp - start;
        if (deltaTime < duration) {
            const t = deltaTime / duration;
            const offset = startOffset + t * (targetOffset - startOffset);
            window.scrollTo({ top: Math.floor(offset) });
            
            requestAnimationFrame(step);
        } else {
            window.scrollTo({ top: targetOffset });
        }
    }

    requestAnimationFrame(step);
}

// --------------------------- END UTILITY FUNCTIONS --------------------------

// ----------------------------- BEGIN DOM METHODS ----------------------------
// TODO: add code here
// ------------------------------ END DOM METHODS -----------------------------

// --------------------------- BEGIN EVENT HANDLERS ---------------------------

function handleScrollClick(e) {
    e.preventDefault();

    const targetHref = e.currentTarget.getAttribute('href');
    const targetId = targetHref.substr(1);
    const targetElem = document.getElementById(targetId);

    scrollTo(targetElem, SCROLL_DURATION);
}

// ---------------------------- END EVENT HANDLERS ----------------------------

// --------------------------- BEGIN PUBLIC METHODS ---------------------------

/**
 * Initialize the top banner block.
 * @return true if the block is present on the page, false otherwise
 */
function initBlock() {
    const banner = document.querySelector('.top-banner');
    if (banner == null) {
        return null;
    }

    const scrollBtn = banner.querySelector('.top-banner__scroll');
    scrollBtn.addEventListener('click', handleScrollClick);

    return true;
}

// ---------------------------- END PUBLIC METHODS ----------------------------

export default {
    initBlock,
};
