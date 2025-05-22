import { PGlite } from "@electric-sql/pglite";
import { worker } from "@electric-sql/pglite/worker";
import { live } from "@electric-sql/pglite/live";

worker({
  async init(options) {
    const db = new PGlite({
      dataDir: options.dataDir,
      extensions: { live },
    });

    try {
      await db.waitReady;

      const createTableQuery = `
        DROP TABLE IF EXISTS patients;
        CREATE TABLE patients (
          id SERIAL PRIMARY KEY,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          date_of_birth DATE NOT NULL,
          gender TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT,
          street_address TEXT NOT NULL,
          city TEXT NOT NULL,
          state TEXT NOT NULL,
          postal_code TEXT NOT NULL,
          medical_record_number TEXT UNIQUE NOT NULL,
          allergies TEXT,
          pre_existing_conditions TEXT,
          emergency_contact_name TEXT NOT NULL,
          emergency_contact_phone TEXT NOT NULL,
          registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          registered_by TEXT NOT NULL
        );
      `;

      await db.exec(createTableQuery);
    } catch (error) {
      console.error("Database initialization failed:", error);
      throw error;
    }

    return db;
  },
});
