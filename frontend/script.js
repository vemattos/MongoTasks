function verificarLogin() {
  if (!localStorage.getItem("userId")) {
    window.location.href = "login.html";
  }
}

function renderCustomFields() {
  const type = document.getElementById("typeSelect").value;
  const c = document.getElementById("customFields");
  c.innerHTML = "";

  switch (type) {
    case "bug":
      c.innerHTML = `
        <label>Prioridade:</label><input name="prioridade">
        <label>Sistema afetado:</label><input name="sistemaAfetado">
        <label>Reportado por:</label><input name="reportadoPor">
      `;
      break;
    case "evento":
      c.innerHTML = `
        <label>Data e Hora:</label><input name="dataHora" type="datetime-local">
        <label>Local:</label><input name="local">
      `;
      break;
    case "lembrete":
      c.innerHTML = `
        <label>Data limite:</label><input name="dataLimite" type="date">
      `;
      break;
    case "meta":
      c.innerHTML = `
        <label>Objetivo:</label><input name="objetivo">
        <label>Data-alvo:</label><input name="dataAlvo" type="date">
        <label>Progresso (%):</label><input name="progresso" type="number" min="0" max="100">
      `;
      break;
    case "estudo":
      c.innerHTML = `
        <label>Assunto:</label><input name="assunto">
        <label>Horas planejadas:</label><input name="horasPlanejadas" type="number">
        <label>Material de referência:</label><input name="material">
      `;
      break;
    case "checklist":
      c.innerHTML = `
        <label>Itens (separe por vírgula):</label><input name="itens">
      `;
      break;
  }
}

function enviarTarefa(event) {
  event.preventDefault();

  const data = {};
  document.querySelectorAll("#customFields input").forEach((input) => {
    data[input.name] = input.value;
  });

  const payload = {
    title: document.getElementById("title").value,
    description: document.getElementById("desc").value,
    status: document.getElementById("status").value,
    type: document.getElementById("typeSelect").value,
    userId: localStorage.getItem("userId"),
    data: data,
  };

  fetch("http://localhost:8080/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Tarefa criada com sucesso!");
      console.log(data);
    })
    .catch((err) => {
      alert("Erro ao criar tarefa.");
      console.error(err);
    });
}

function mostrarUsuario() {
  const username = localStorage.getItem("username");
  if (username) {
    document.getElementById("usernameDisplay").textContent = username;
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

window.onload = () => {
  verificarLogin();
  mostrarUsuario();
};
