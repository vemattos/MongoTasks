const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
      });

      if (!response.ok) throw new Error('Falha no login');

      const user = await response.json();
      localStorage.setItem('userId', user.id);
      window.location.href = 'tarefas.html';
    } catch (err) {
      alert('Usuário ou senha incorretos!');
    }
  });
}
