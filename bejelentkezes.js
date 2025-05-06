document.getElementById('showRegister').addEventListener('click', () => {
    document.getElementById('bejelentkezes').classList.add('hidden');
    document.getElementById('regisztracio').classList.remove('hidden');
});

document.getElementById('showLogin').addEventListener('click', () => {
    document.getElementById('regisztracio').classList.add('hidden');
    document.getElementById('bejelentkezes').classList.remove('hidden');
});

document.getElementById('RegBtn').addEventListener('click', () => {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPass').value;
    const confirmPassword = document.getElementById('regPassConfirm').value;
    const messageElement = document.getElementById('regMessage');

    messageElement.innerText = '';

    if (!name || !email || !password || !confirmPassword) {
        messageElement.innerText = 'Minden mezőt ki kell tölteni!';
        return;
    }

    if (!email.includes('@')) {
        messageElement.innerText = 'Helyes e-mail címet adjon meg!';
        return;
    }

    const passwordRequirements = [];
    if (password.length < 8) {
        passwordRequirements.push('Legalább 8 karakter hosszú legyen.');
    }
    if (!/[A-Z]/.test(password)) {
        passwordRequirements.push('Tartalmaznia kell legalább egy nagybetűt.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        passwordRequirements.push('Tartalmaznia kell legalább egy speciális karaktert.');
    }

    if (passwordRequirements.length > 0) {
        messageElement.innerText = `A jelszónak meg kell felelnie az alábbi követelményeknek:\n- ${passwordRequirements.join('\n- ')}`;
        return;
    }

    if (password !== confirmPassword) {
        messageElement.innerText = 'A jelszavak nem egyeznek!';
        return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name === name && user.email === email) {
        messageElement.innerText = 'Már létezik ilyen fiók!';
        return;
    }

    messageElement.style.color = 'green';
    messageElement.innerText = 'Sikeres regisztráció!';
    localStorage.setItem('user', JSON.stringify({ name, email, password }));
    document.getElementById('bejelentkezes').classList.add('hidden');
    document.getElementById('regisztracio').classList.remove('hidden');
});

document.getElementById('BeBtn').addEventListener('click', () => {
    const beMenu = document.getElementById('beMenu');
    const email = document.getElementById('beEmail').value.trim();
    const password = document.getElementById('bePass').value;

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || user.email !== email || user.password !== password) {
        alert('Hibás e-mail vagy jelszó!');
        return;
    }
    beMenu.innerText = user.name;
    alert(`Üdvözlünk, ${user.name}!`);
});
console.log(localStorage);