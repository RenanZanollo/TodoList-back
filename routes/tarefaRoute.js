import { Router } from "express";
import { db } from "../database/db.js";
import { tarefa } from "../database/schema.js";

export const router = Router();

router.post("/", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content veio vazio." });
    }

    const [novaTarefa] = await db
      .insert(tarefa)
      .values({ content })
      .returning();

    res.status(201).json({ message: "Tarefa criada!", tarefa: novaTarefa });
  } catch {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor." });
  }
});

router.get("/", async (req, res) => {
  try {
    const getTarefa = await db.select().from(tarefa);

    res.status(200).json(getTarefa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servido" });
  }
});
