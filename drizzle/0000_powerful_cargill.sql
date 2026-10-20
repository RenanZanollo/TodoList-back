CREATE TABLE "tarefa" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"isComplete" boolean DEFAULT false NOT NULL
);
