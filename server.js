import express from "express";
import "dotenv/config"
import {router} from "./routes/tarefaRoute.js"
import cors from "cors"

const app = express();
const port = process.env.PORT

app.use(cors({origin: "http://localhost:5173"}))

app.use(express.json())

app.use('/api/tarefa', router)

app.listen(port, () =>
console.log("rodando na porta:", port));

