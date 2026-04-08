import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import gameRouter from "./routes/game";

const app = new Koa();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(bodyParser());
app.use(gameRouter.routes());
app.use(gameRouter.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
