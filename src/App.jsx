import React from "react";
import { PGliteWorker } from "@electric-sql/pglite/worker";
import { live } from "@electric-sql/pglite/live";
import PatientRegistration from "./components/PatientRegistration";

function App() {
  React.useEffect(() => {
    const initPg = async () => {
      try {
        const worker = new Worker(
          new URL("./utils/pglite-worker.js", import.meta.url),
          { type: "module" }
        );
        const pgInstance = await PGliteWorker.create(worker, {
          dataDir: "idb://patient-db",
          extensions: { live },
        });
        await pgInstance.waitReady;
        console.log("PGlite initialized successfully");
      } catch (err) {
        console.error("Failed to initialize PGliteWorker:", err);
      }
    };

    initPg();
  }, []);

  return (
    <>
      <PatientRegistration />
    </>
  );
}

export default App;
