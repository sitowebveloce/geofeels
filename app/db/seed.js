import { openDb } from "./_db.js";

async function setup() {
  const db = await openDb();

  // await db.exec(`
  //       CREATE TABLE IF NOT EXISTS markers (
  //           id INTEGER PRIMARY KEY AUTOINCREMENT,
  //           city TEXT,
  //           country TEXT,
  //           lat DOUBLE,
  //           long DOUBLE,
  //           message TEXT,
  //           emoji TEXT,
  //           happiness INTEGER,
  //           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  //       )
  //   `);

  // await db.run(`
  //       INSERT INTO markers (city, country, lat, long, message, emoji, happiness) VALUES
  //           ('London', 'United Kingdom', 51.5074, -0.1278, 'Enjoying the city', '😊', 1),
  //           ('London', 'United Kingdom', 51.5074, -0.1278, 'Very sad', '😠', 0)
  //   `);

  // Update created_at column minus 8 days to the current date
  await db.run(`UPDATE markers SET created_at = date(created_at, '-8 days')`);

  // Revalidate path
  // revalidatePath('/');

    // Close the database connection
    await db.close();
}

setup()
  .then(() => console.log("Database ready"))
  .catch((e) => console.log(e));
