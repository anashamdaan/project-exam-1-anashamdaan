const hamburger = document.getElementById('hamburger');
const header = document.querySelector('header');

hamburger.addEventListener('click', () => {
    header.classList.toggle('nav-open');
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const adminEmail = 'admin@admin.com';
    const adminPassword = '1234';

    if (email === adminEmail && password === adminPassword) {
        window.location.href = '../post/edit.html';
    } else {
        alert('Invalid email or password');
    }
});
