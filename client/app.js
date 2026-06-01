const form = document.getElementById("taskForm");
const list = document.getElementById("taskList");

// Cargar tareas
const loadTasks = async () => {
  const res = await axios.get("http://localhost:3000/tasks");
  const tasks = res.data;

  list.innerHTML = tasks.map(t => `
    <li>
      <strong>${t.title}</strong> - ${t.description}
      <span>[${t.status}]</span>
      <div>
        <button onclick="updateStatus(${t.id}, 'pendiente')">Pendiente</button>
        <button onclick="updateStatus(${t.id}, 'en progreso')">En progreso</button>
        <button onclick="updateStatus(${t.id}, 'completada')">Completada</button>
        <button onclick="deleteTask(${t.id})">🗑️ Eliminar</button>
      </div>
    </li>
  `).join("");
};

// Agregar tarea
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  await axios.post("http://localhost:3000/tasks", { title, description });
  form.reset();
  loadTasks();
});

// Actualizar estado
const updateStatus = async (id, newStatus) => {
  try {
    await axios.put(`http://localhost:3000/tasks/${id}`, 
      { status: newStatus }, 
      { headers: { "Content-Type": "application/json" } } // 👈 importante
    );
    loadTasks();
  } catch (error) {
    console.error("Error al actualizar estado:", error);
  }
};



// Eliminar tarea
const deleteTask = async (id) => {
  await axios.delete(`http://localhost:3000/tasks/${id}`);
  loadTasks();
};

// Inicializar
loadTasks();

