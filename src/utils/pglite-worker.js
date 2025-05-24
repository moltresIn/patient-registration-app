import { PGlite } from "@electric-sql/pglite";
import { worker } from "@electric-sql/pglite/worker";
import { live } from "@electric-sql/pglite/live";

worker({
  async init(options) {
    console.log("Worker initializing with options:", options);

    const db = new PGlite({
      dataDir: options.dataDir,
      extensions: {
        live,
      },
    });

    console.log("PGlite instance created, live extension:", !!db.live);

    try {
      await db.waitReady;

      // Check if the patients table exists and validate its schema
      const tableExistsQuery = `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'patients';
      `;

      const result = await db.query(tableExistsQuery);
      const requiredColumns = [
        "id",
        "first_name",
        "last_name",
        "date_of_birth",
        "gender",
        "phone",
        "email",
        "street_address",
        "city",
        "state",
        "postal_code",
        "medical_record_number",
        "allergies",
        "pre_existing_conditions",
        "emergency_contact_name",
        "emergency_contact_phone",
        "registration_date",
        "registered_by",
      ];

      const existingColumns = result.rows.map((row) => row.column_name);
      const hasAllColumns = requiredColumns.every((column) =>
        existingColumns.includes(column)
      );

      if (!hasAllColumns) {
        console.log(
          "Table 'patients' missing or schema invalid. Recreating table..."
        );
        await db.exec(`
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
            registered_by TEXT
          );
        `);
        console.log("Patients table created successfully");
      } else {
        console.log("Table 'patients' already exists with the correct schema.");
      }

      await db.live
        .query("SELECT 1")
        .then((result) => {
          console.log("Live query test result:", result);
        })
        .catch((err) => {
          console.error("Live query test failed:", err);
        });
    } catch (err) {
      console.error("Error initializing database:", err);
      throw err;
    }

    return db;
  },
});
