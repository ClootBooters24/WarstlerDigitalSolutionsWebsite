document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('Form');
    const applicationTypeInput = document.getElementById('application_type');
    const subjectInput = document.getElementById('form_subject');
    const typeRadios = document.querySelectorAll('input[name="applicationType"]');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('form-message');

    if (!form || !applicationTypeInput || !subjectInput || typeRadios.length === 0) {
        return;
    }

    const baseSubject = subjectInput.value || 'Contact Form';

    const syncApplicationType = (value) => {
        applicationTypeInput.value = value || '';
        subjectInput.value = value ? `${baseSubject} - ${value}` : baseSubject;
    };

    const showMessage = (message, type) => {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    const hideMessage = () => {
        formMessage.style.display = 'none';
    };

    const setLoading = (isLoading) => {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        if (isLoading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
        } else {
            submitBtn.disabled = false;
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
        }
    };

    typeRadios.forEach((radio) => {
        radio.addEventListener('change', (event) => {
            const selectedValue = event.target.value;
            syncApplicationType(selectedValue);
        });
    });

    form.addEventListener('reset', () => {
        window.setTimeout(() => {
            syncApplicationType('');
            hideMessage();
        }, 0);
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        hideMessage();
        setLoading(true);

        try {
            const formData = new FormData(form);
            
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const result = await response.json();

            if (response.ok && result.success) {
                showMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
                form.reset();
                syncApplicationType('');
            } else {
                showMessage(result.message || 'There was a problem sending your message. Please try again.', 'error');
            }
        } catch (error) {
            showMessage('There was a problem sending your message. Please check your connection and try again.', 'error');
        } finally {
            setLoading(false);
        }
    });
});
