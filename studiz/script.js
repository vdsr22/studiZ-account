document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const createAccountBtn = document.getElementById('createAccount');
    const guestLoginBtn = document.getElementById('guestLogin');

    function readUserData() {
        return localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : [];
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const users = readUserData();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'account.html';
        } else {
            alert('Invalid email or password');
        }
    });

    createAccountBtn.addEventListener('click', () => {
        window.location.href = 'signup.html';
    });

    guestLoginBtn.addEventListener('click', () => {
        document.cookie = "guestSession=true; max-age=3600"; // Expires in 1 hour
        window.location.href = 'guest.html';
    });
});