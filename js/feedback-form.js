export function initFeedbackForm() {
    const feedbackForm = document.getElementById('feedback-form');
    if (!feedbackForm) return;

    feedbackForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = event.target;

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
            });

            alert(response.ok ? 'Thank you for your feedback!' : 'Something went wrong. Please try again.');
            if (response.ok) form.reset();
        } catch {
            alert('Something went wrong. Please try again.');
        }
    });
}

