// This event listener ensures the entire HTML document is loaded before the script runs.
document.addEventListener('DOMContentLoaded', () => {

    /*
    ============================================================
     Part 2: JavaScript Functions — Scope, Parameters & Return Values
    ============================================================
    */

    // --- Global Scope Demonstration ---
    // This variable is accessible anywhere in this script.
    const APP_VERSION = "1.0";
    console.log(`App Version (from global scope): ${APP_VERSION}`);

    // --- Element Selection ---
    const nameInput = document.getElementById('name-input');
    const greetBtn = document.getElementById('greet-btn');
    const greetingOutput = document.getElementById('greeting-output');

    /**
     * Creates a customized greeting message.
     * @param {string} name - The name of the person to greet.
     * @returns {string} - The formatted greeting message.
     */
    function generateGreeting(name) {
        // --- Local Scope Demonstration ---
        // 'greeting' and 'trimmedName' only exist inside this function.
        const trimmedName = name.trim();

        // Basic validation
        if (trimmedName === "") {
            return "Please enter a name first!";
        }

        const greeting = `Hello, ${trimmedName}! Welcome to the showcase.`;
        return greeting;
    }

    // --- Event Listener to use the function ---
    greetBtn.addEventListener('click', () => {
        // The value from the input is passed as a PARAMETER to the function.
        const userName = nameInput.value;
        
        // The function's RETURN VALUE is stored in a variable.
        const message = generateGreeting(userName);

        // Update the DOM with the result.
        greetingOutput.textContent = message;
    });


    /*
    ============================================================
    Part 3: Combining CSS Animations with JavaScript
    ============================================================
    */

    // --- 3.1: Triggering Card Animations ---
    const animateCardsBtn = document.getElementById('animate-cards-btn');
    const cards = document.querySelectorAll('.card');

    animateCardsBtn.addEventListener('click', () => {
        // First, reset the animation by removing the class
        cards.forEach(card => card.classList.remove('animate'));

        // Use a slight delay to allow the browser to remove the class before re-adding it
        setTimeout(() => {
            // Loop through each card and add the 'animate' class to trigger the CSS animation
            // We can even add a staggered delay for a cooler effect!
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 150); // 150ms delay between each card's animation
            });
        }, 10); // 10ms delay before starting
    });

    // --- 3.2: Reusable Functions for Modal Control ---
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');

    /**
     * Opens the modal by adding the 'is-open' class.
     * The CSS handles the transition.
     */
    function openModal() {
        modalOverlay.classList.add('is-open');
    }

    /**
     * Closes the modal by triggering a closing animation,
     * then hiding the element after the animation finishes.
     */
    function closeModal() {
        // 1. Add the class that triggers the closing animation
        modalContent.classList.add('is-closing');

        // 2. Listen for the animation to end
        modalContent.addEventListener('animationend', () => {
            // 3. Clean up classes to fully hide the modal and reset its state
            modalContent.classList.remove('is-closing');
            modalOverlay.classList.remove('is-open');
        }, { once: true }); // { once: true } auto-removes the listener after it fires
    }

    // --- Event Listeners for the Modal ---
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);

    // Also close the modal if the user clicks on the overlay (background)
    modalOverlay.addEventListener('click', (event) => {
        // We only close if the click is on the overlay itself, not the content inside it
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

});
