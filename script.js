document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const guestLoginBtn = document.getElementById('guestLogin');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const resetPasswordModal = document.getElementById('resetPasswordModal');
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const otpForm = document.getElementById('otpForm');

    // Initialize EmailJS
    (function() {
        emailjs.init("azxlenxRR4vHf5C8Z"); // Replace with your EmailJS user ID
    })();

    function readUserData() {
        return localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : [];
    }

    function writeUserData(users) {
        localStorage.setItem('userData', JSON.stringify(users));
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const identifier = document.getElementById('identifier').value;
        const password = document.getElementById('password').value;
        const users = readUserData();
        const user = users.find(u => (u.email === identifier || u.username === identifier) && u.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'account.html';
        } else {
            alert('Invalid username/email or password');
        }
    });

    guestLoginBtn.addEventListener('click', () => {
        document.cookie = "guestSession=true; max-age=360000"; // Expires in 1 hour
        window.location.href = 'guest.html';
    });

    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        resetPasswordModal.style.display = 'block';
    });

    resetPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('resetEmail').value;
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
        
        // Send OTP via email
        emailjs.send("service_og1mzc4", "template_u03roix", {
            to_email: email,
            otp: otp
        }).then(() => {
            alert('OTP sent to your email');
            localStorage.setItem('resetOTP', otp);
            resetPasswordForm.style.display = 'none';
            otpForm.style.display = 'block';
        }, (error) => {
            console.log('Failed to send OTP', error);
            alert('Failed to send OTP. Please try again.');
        });
    });

    otpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const enteredOTP = document.getElementById('otp').value;
        const newPassword = document.getElementById('newPassword').value;
        const storedOTP = localStorage.getItem('resetOTP');

        if (enteredOTP === storedOTP) {
            const users = readUserData();
            const userIndex = users.findIndex(u => u.email === document.getElementById('resetEmail').value);
            if (userIndex !== -1) {
                users[userIndex].password = newPassword;
                writeUserData(users);
                alert('Password reset successfully');
                resetPasswordModal.style.display = 'none';
                localStorage.removeItem('resetOTP');
            } else {
                alert('User not found');
            }
        } else {
            alert('Invalid OTP');
        }
    });

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target === resetPasswordModal) {
            resetPasswordModal.style.display = "none";
        }
    }
});