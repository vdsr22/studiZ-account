document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');

    function readUserData() {
        return localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : [];
    }

    function writeUserData(users) {
        localStorage.setItem('userData', JSON.stringify(users));
    }

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const users = readUserData();
        if (users.some(user => user.email === email)) {
            alert('An account with this email already exists');
            return;
        }

        users.push({ username, email, password });
        writeUserData(users);
        alert('Account created successfully');
        window.location.href = 'login.html';
    });
});