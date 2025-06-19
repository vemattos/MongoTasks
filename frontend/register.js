function fazerCadastro(event) {
  event.preventDefault();

  const payload = {
    name: document.getElementById("name").value,
    password: document.getElementById("password").value,
  };

  fetch("http://localhost:8080/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then(res => {
      if (res.status === 409) throw new Error("Usuário já existe");
      if (!res.ok) throw new Error("Erro ao cadastrar");
      return res.json();
    })
    .then(data => {
      alert("Usuário cadastrado com sucesso! Agora faça login.");
      window.location.href = "login.html";
    })
    .catch(err => {
      alert(err.message);
    });
}
