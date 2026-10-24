import { Router } from "express";
import { db } from "../database/db.js";
import { tarefa } from "../database/schema.js";
import { eq } from "drizzle-orm";

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

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID invalido" });
    }

    const [editado] = await db
      .update(tarefa)
      .set({ isComplete: true })
      .where(eq(tarefa.id, id))
      .returning();

    if (!editado) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }

    res.status(200).json({ message: "Tarefa atualizada.", tarefa: editado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servido" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

        const [deletado] = await db
      .delete(tarefa)
      .where(eq(tarefa.id, id))
      .returning();

    if (!deletado) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }

      res.status(200).json({message: "Tarefa deletada."})

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro no servidor" });
  }
});
