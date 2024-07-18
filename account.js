document.addEventListener('DOMContentLoaded', () => {
    const userInfo = document.getElementById('userInfo');
    const logoutBtn = document.getElementById('logoutBtn');
    const createSessionBtn = document.getElementById('createSessionBtn');
    const createSessionModal = document.getElementById('createSessionModal');
    const createSessionForm = document.getElementById('createSessionForm');
    const sessionList = document.getElementById('sessionList');

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isGuest = document.cookie.split(';').some((item) => item.trim().startsWith('guestSession='));

    if (!currentUser && !isGuest) {
        window.location.href = 'login.html';
    }

    function displayUserInfo() {
        if (isGuest) {
            userInfo.innerHTML = '<p>Welcome, Guest User!</p>';
        } else {
            userInfo.innerHTML = `
                <p>Welcome, ${currentUser.username}!</p>
                <p>Email: ${currentUser.email}</p>
            `;
        }
    }

    function getStudySessions() {
        const userId = isGuest ? 'guest' : currentUser.email;
        return JSON.parse(localStorage.getItem(`studySessions_${userId}`)) || [];
    }

    function saveStudySessions(sessions) {
        const userId = isGuest ? 'guest' : currentUser.email;
        localStorage.setItem(`studySessions_${userId}`, JSON.stringify(sessions));
    }

    function displayStudySessions() {
        const sessions = getStudySessions();
        sessionList.innerHTML = '';
        sessions.forEach((session, index) => {
            const sessionElement = document.createElement('div');
            sessionElement.classList.add('session-item');
            sessionElement.innerHTML = `
                <h4>${session.name}</h4>
                <p>Subject: ${session.subject}</p>
                <button onclick="editSession(${index})">Edit</button>
                <button onclick="deleteSession(${index})">Delete</button>
            `;
            sessionList.appendChild(sessionElement);
        });
    }

    createSessionBtn.addEventListener('click', () => {
        createSessionModal.style.display = 'block';
    });

    createSessionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const sessionName = document.getElementById('sessionName').value;
        const subject = document.getElementById('subject').value;
        
        const newSession = { name: sessionName, subject: subject };
        const sessions = getStudySessions();
        sessions.push(newSession);
        saveStudySessions(sessions);
        
        createSessionModal.style.display = 'none';
        createSessionForm.reset();
        displayStudySessions();
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        document.cookie = "guestSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = 'login.html';
    });

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target === createSessionModal) {
            createSessionModal.style.display = "none";
        }
    }

    // Edit and Delete functions (to be implemented)
    window.editSession = function(index) {
        alert(`Edit session at index ${index}`);
        // Implement edit functionality
    }

    window.deleteSession = function(index) {
        const sessions = getStudySessions();
        sessions.splice(index, 1);
        saveStudySessions(sessions);
        displayStudySessions();
    }

    displayUserInfo();
    displayStudySessions();
});