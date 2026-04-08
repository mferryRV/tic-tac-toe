import app from "./app";
import { runMigrations } from "./db";

const PORT = process.env.PORT ?? 3001;

runMigrations().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
