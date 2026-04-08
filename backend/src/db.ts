import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/tictactoe",
});

const migrations = [
  {
    name: "001_create_game_results",
    sql: `
      CREATE TABLE game_results (
        id           UUID        PRIMARY KEY,
        result       VARCHAR(10) NOT NULL CHECK (result IN ('X', 'O', 'catscan')),
        completed_at TIMESTAMPTZ NOT NULL,
        board_size   INTEGER     NOT NULL CHECK (board_size BETWEEN 3 AND 15)
      )
    `,
  },
];

export const runMigrations = async (): Promise<void> => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      name   TEXT        PRIMARY KEY,
      run_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  for (const migration of migrations) {
    const { rows } = await pool.query(
      "SELECT name FROM migrations WHERE name = $1",
      [migration.name],
    );

    if (rows.length === 0) {
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        await client.query(migration.sql);
        await client.query("INSERT INTO migrations (name) VALUES ($1)", [migration.name]);
        await client.query("COMMIT");
        console.log(`Ran migration: ${migration.name}`);
      } catch (err) {
        await client.query("ROLLBACK");
        throw err;
      } finally {
        client.release();
      }
    }
  }
};

export default pool;
