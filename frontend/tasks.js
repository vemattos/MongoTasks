function toggleUserMenu() {
  const menu = document.getElementById("userMenu");
  menu.classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  if (!userId) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("usernameDisplay").textContent = username;

  fetch(`http://localhost:8080/api/tasks/user/${userId}`)
    .then(res => res.json())
    .then(tasks => renderTasks(tasks))
    .catch(err => console.error("Erro ao buscar tarefas:", err));
});

function renderTasks(tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = "<p>Nenhuma tarefa encontrada.</p>";
    return;
  }

  tasks.forEach(task => {
    const card = document.createElement("div");
    card.className = "task-card";

    card.innerHTML = `
      <h3>${task.title}</h3>
      <p><strong>Status:</strong> ${task.status}</p>
      <p class="task-type"><strong>Tipo:</strong> ${task.type}</p>
      <p><strong>Descrição:</strong> ${task.description || "—"}</p>
    `;

    // Adiciona campos dinâmicos
    if (task.data) {
      Object.entries(task.data).forEach(([key, value]) => {
        card.innerHTML += `<p><strong>${formatKey(key)}:</strong> ${value}</p>`;
      });
    }

    document.getElementById("taskList").appendChild(card);
  });
}

function formatKey(key) {
  // Converte snake_case ou camelCase para algo mais legível
  return key.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ').replace(/^./, s => s.toUpperCase());
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
