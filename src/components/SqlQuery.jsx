import React, { useState } from "react";

function SqlQuery() {
  const [sql, setSql] = useState("");

  const handleExecute = async () => {};

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Database Query Console
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SQL Query
          </label>
          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2 font-mono text-sm focus:ring focus:ring-blue-200"
            placeholder="SELECT * FROM patients WHERE gender = 'Female';"
          />
        </div>
        <button
          onClick={handleExecute}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Execute Query
        </button>
      </div>
    </div>
  );
}

export default SqlQuery;
