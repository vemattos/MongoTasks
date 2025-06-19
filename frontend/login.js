function fazerLogin(event) {
  event.preventDefault();

  const payload = {
    name: document.getElementById("username").value,
    password: document.getElementById("password").value
  };

  fetch("http://localhost:8080/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(res => {
    if (!res.ok) throw new Error("Credenciais inválidas");
    return res.json();
  })
  .then(data => {
    localStorage.setItem("userId", data.id);
    localStorage.setItem("username", data.name);
    window.location.href = "index.html";
  })
  .catch(err => {
    alert(err.message);
  });
}
