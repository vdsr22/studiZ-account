document.addEventListener('DOMContentLoaded', () => {
    const backToLoginBtn = document.getElementById('backToLoginBtn');

    backToLoginBtn.addEventListener('click', () => {
        document.cookie = "guestSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = 'login.html';
    });
});