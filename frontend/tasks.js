document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.getElementById('taskList');
  const addTaskBtn = document.getElementById('addTaskBtn');
  
  const userId = localStorage.getItem('userId'); // pega o id do usuário logado
  let tasks = [];

  async function fetchTasks() {
    try {
      const res = await fetch(`http://localhost:8080/api/tasks/user/${userId}`);
      if (!res.ok) throw new Error('Erro ao carregar tarefas');
      tasks = await res.json();
      renderTasks();
    } catch (err) {
      alert(err.message);
    }
  }

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const taskDiv = document.createElement('div');
      taskDiv.className = 'task-item';
      taskDiv.innerHTML = `
        <div>
          <strong>${task.name}</strong><br>
          <span>${task.desc}</span>
        </div>
        <div>
          <button class="edit-button" onclick="editTask(${index})">Editar</button>
          <button class="delete-button" onclick="deleteTask(${index})">Apagar</button>
        </div>
      `;
      taskList.appendChild(taskDiv);
    });
  }

  window.addTask = async function () {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDesc').value;

    if (!title.trim()) {
      alert('O título é obrigatório!');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: title, desc: description, userId })
      });

      if (!res.ok) throw new Error('Erro ao criar tarefa');

      const newTask = await res.json();
      tasks.push(newTask);
      renderTasks();

      document.getElementById('taskTitle').value = '';
      document.getElementById('taskDesc').value = '';
    } catch (err) {
      alert(err.message);
    }
  };

  window.deleteTask = async function (index) {
    const taskToDelete = tasks[index];
    try {
      const res = await fetch(`http://localhost:8080/api/tasks/${taskToDelete.id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Erro ao apagar tarefa');
      tasks.splice(index, 1);
      renderTasks();
    } catch (err) {
      alert(err.message);
    }
  };

  window.editTask = async function (index) {
    const task = tasks[index];
    const newTitle = prompt('Novo título:', task.name);
    const newDesc = prompt('Nova descrição:', task.desc);

    if (newTitle !== null && newTitle.trim() !== '') {
      try {
        const res = await fetch(`http://localhost:8080/api/tasks/${task.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newTitle, desc: newDesc, userId: task.userId })
        });

        if (!res.ok) throw new Error('Erro ao atualizar tarefa');

        const updatedTask = await res.json();
        tasks[index] = updatedTask;
        renderTasks();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  addTaskBtn.addEventListener('click', addTask);

  fetchTasks();
});
