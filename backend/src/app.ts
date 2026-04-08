import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import gameRouter from "./routes/game";

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(gameRouter.routes());
app.use(gameRouter.allowedMethods());

export default app;
