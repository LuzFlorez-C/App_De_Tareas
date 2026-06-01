import express from "express";
import cors from "cors";
import { db } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Obtener todas las tareas
app.get("/tasks", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM tasks");
  res.json(rows);
});

// Crear nueva tarea
app.post("/tasks", async (req, res) => {
  const { title, description } = req.body;
  console.log("Datos recibidos:", req.body);
  await db.query(
    "INSERT INTO tasks (title, description, status) VALUES (?, ?, 'pendiente')",
    [title, description]
  );
  res.json({ message: "Tarea creada correctamente" });
});

// Actualizar estado de tarea
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log("Actualizando tarea:", id, "con estado:", status);
  await db.query("UPDATE tasks SET status = ? WHERE id = ?", [status, id]);
  res.json({ message: "Estado actualizado correctamente" });
});

// Eliminar tarea
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM tasks WHERE id = ?", [id]);
  res.json({ message: "Tarea eliminada correctamente" });
});

app.listen(3000, () => console.log("Servidor backend en http://localhost:3000"));
