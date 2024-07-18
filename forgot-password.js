document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');

    forgotPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;

        // Send the email to the server for password reset process (using fetch or XMLHttpRequest)
        // For demonstration, we will just show an alert
        alert('Password reset link sent to ' + email);
        
        // Redirect to login page after submission
        window.location.href = 'login.html';
    });
});
