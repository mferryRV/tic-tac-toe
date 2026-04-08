import app from "./app";
import { initDb } from "./store";

const PORT = process.env.PORT ?? 3001;

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
