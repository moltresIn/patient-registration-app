import React, { useState, useEffect } from "react";
import { PGliteWorker } from "@electric-sql/pglite/worker";
import { PGliteProvider } from "@electric-sql/pglite-react";
import { live } from "@electric-sql/pglite/live";
import PatientRegistration from "./components/PatientRegistration";
import PatientList from "./components/PatientList";
import SqlQuery from "./components/SqlQuery";
import { UserGroupIcon, CommandLineIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "react-tooltip";

function App() {
  const [pg, setPg] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("registration");

  useEffect(() => {
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
        setPg(pgInstance);
      } catch (err) {
        console.error("Failed to initialize PGliteWorker:", err);
        setError(err.message);
      }
    };
    initPg();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          Error initializing database: {error}
        </div>
      </div>
    );
  }

  if (!pg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading database...</div>
      </div>
    );
  }

  return (
    <PGliteProvider db={pg}>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Medblocks Patient Management
          </h1>

          {/* Tab navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white  rounded-full shadow-sm p-1">
              <div className="flex space-x-2">
                <button
                  data-tooltip-id="nav-tooltip"
                  data-tooltip-content="Patient Management"
                  className={`p-3 rounded-full transition-all duration-200 ${
                    activeTab === "registration"
                      ? "bg-blue-100  text-blue-600 dark:text-blue-400"
                      : "text-gray-600 bg-tranparent  hover:bg-gray-100 "
                  }`}
                  onClick={() => setActiveTab("registration")}
                >
                  <UserGroupIcon className="w-6 h-6" />
                </button>
                <button
                  data-tooltip-id="nav-tooltip"
                  data-tooltip-content="SQL Console"
                  className={`p-3 rounded-full transition-all duration-200 ${
                    activeTab === "sql"
                      ? "bg-blue-100  text-blue-600 dark:text-blue-400"
                      : "text-gray-600 bg-tranparent  hover:bg-gray-100 "
                  }`}
                  onClick={() => setActiveTab("sql")}
                >
                  <CommandLineIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Tab content */}
          {activeTab === "registration" && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <PatientRegistration />
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <PatientList />
                </div>
              </div>
            </div>
          )}

          {activeTab === "sql" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <SqlQuery />
            </div>
          )}
        </div>
      </div>
      <Tooltip id="nav-tooltip" />
    </PGliteProvider>
  );
}

export default App;
