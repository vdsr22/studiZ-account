document.addEventListener('DOMContentLoaded', () => {
    const userInfo = document.getElementById('userInfo');
    const settingsBtn = document.getElementById('settingsBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        window.location.href = 'login.html';
    }

    userInfo.innerHTML = `
        <p>Welcome, ${currentUser.username}!</p>
        <p>Email: ${currentUser.email}</p>
    `;

    settingsBtn.addEventListener('click', () => {
        alert('Settings functionality would be implemented here.');
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
});