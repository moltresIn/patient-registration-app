import React from "react";
import { PGliteWorker } from "@electric-sql/pglite/worker";
import { live } from "@electric-sql/pglite/live";
import PatientRegistration from "./components/PatientRegistration";
import PatientList from "./components/PatientList";
import SqlQuery from "./components/SqlQuery";

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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="lg:w-1/2 bg-white p-6 shadow-md rounded-lg">
          <PatientRegistration />
        </div>

        {/* Right Column */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <PatientList />
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <SqlQuery />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
