import React, { useState, useEffect } from "react";
import { PGliteWorker } from "@electric-sql/pglite/worker";
import { PGliteProvider } from "@electric-sql/pglite-react";
import { live } from "@electric-sql/pglite/live";
import PatientRegistration from "./components/PatientRegistration";
import PatientList from "./components/PatientList";
import SqlQuery from "./components/SqlQuery";
import {
  UserGroupIcon,
  CommandLineIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "react-tooltip";
import PatientTable from "./components/PatientTable";
import Medblock_Logo from "/medblocks_logo.svg";

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
      <div className="min-h-screen flex items-center justify-center ">
        <div className="bg-red-50 text-red-700  p-4 rounded-lg">
          Error initializing database: {error}
        </div>
      </div>
    );
  }

  if (!pg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-800">
        <div className="animate-pulse text-gray-100 ">Loading database...</div>
      </div>
    );
  }

  return (
    <PGliteProvider db={pg}>
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 bg-slate-800">
        <div className=" mx-auto">
          <div className="flex p-4 items-center justify-center mb-8 bg-black max-w-screen-md mx-auto rounded-full shadow-sm">
            <img
              src={Medblock_Logo}
              alt="Medblocks Logo"
              className="h-12 w-12 mr-4"
            />
            <h1 className="text-3xl font-bold text-blue-600">
              Medblocks Patient Management
            </h1>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-black  rounded-full shadow-sm p-1">
              <div className="flex space-x-2">
                <button
                  data-tooltip-id="nav-tooltip"
                  data-tooltip-content="Patient Management"
                  className={`p-3 rounded-full transition-all duration-200 hover:cursor-pointer ${
                    activeTab === "registration"
                      ? "bg-white"
                      : "text-gray-600  hover:bg-white "
                  }`}
                  onClick={() => setActiveTab("registration")}
                >
                  <UserGroupIcon className="w-6 h-6 text-blue-700" />
                </button>
                <button
                  data-tooltip-id="nav-tooltip"
                  data-tooltip-content="Patient Table"
                  className={`p-3 rounded-full transition-all duration-200 hover:cursor-pointer ${
                    activeTab === "table"
                      ? "bg-white"
                      : "text-gray-600 hover:bg-white "
                  }`}
                  onClick={() => setActiveTab("table")}
                >
                  <TableCellsIcon className="w-6 h-6 text-blue-700" />
                </button>
                <button
                  data-tooltip-id="nav-tooltip"
                  data-tooltip-content="SQL Console"
                  className={`p-3 rounded-full transition-all duration-200 hover:cursor-pointer ${
                    activeTab === "sql"
                      ? "bg-white"
                      : "text-gray-600 hover:bg-white "
                  }`}
                  onClick={() => setActiveTab("sql")}
                >
                  <CommandLineIcon className="w-6 h-6 text-blue-700" />
                </button>
              </div>
            </div>
          </div>

          {activeTab === "registration" && (
            <div className="flex gap-8 items-start">
              <div className="card-register w-full">
                <PatientRegistration />
              </div>
              <div className="card-list w-full py-10">
                <PatientList />
              </div>
            </div>
          )}

          {activeTab === "table" && (
            <div className="card">
              <PatientTable />
            </div>
          )}

          {activeTab === "sql" && (
            <div className="card">
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
