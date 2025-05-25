import React, { useState, useEffect } from "react";
import { usePGlite } from "@electric-sql/pglite-react";
import { CircleStackIcon } from "@heroicons/react/24/outline";
function PatientList() {
  const db = usePGlite();
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const result = await db.query(
          "SELECT * FROM patients ORDER BY registration_date DESC"
        );
        const formattedRows = result.rows.map((row) => ({
          ...row,
          date_of_birth:
            row.date_of_birth instanceof Date
              ? row.date_of_birth.toISOString().split("T")[0]
              : row.date_of_birth || "N/A",
          registration_date:
            row.registration_date instanceof Date
              ? row.registration_date.toLocaleString()
              : row.registration_date || "N/A",
        }));
        setRows(formattedRows);
        setError(null);
      } catch (err) {
        setError(err);
        setRows(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
    const interval = setInterval(fetchPatients, 5000);
    return () => clearInterval(interval);
  }, [db]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        Error fetching patients: {error.message}
      </div>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900">No patients yet</h3>
        <p className="mt-2 text-sm text-gray-500">
          Register a new patient to see them listed here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center mb-7">
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl">
          <CircleStackIcon className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-blue-700">Patient List</h2>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl">
        <div className="max-h-[550px] overflow-y-auto">
          <table className="min-w-full relative">
            <thead className="bg-slate-900 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold hover:bg-white text-white uppercase tracking-wider hover:text-black hover:cursor-pointer">
                  MRN
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold hover:bg-white text-white uppercase tracking-wider hover:text-black hover:cursor-pointer">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold hover:bg-white text-white uppercase tracking-wider hover:text-black hover:cursor-pointer">
                  DOB
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold hover:bg-white text-white uppercase tracking-wider hover:text-black hover:cursor-pointer">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold hover:bg-white text-white uppercase tracking-wider hover:text-black hover:cursor-pointer">
                  Registration Date
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-gray-800 bg-slate-900 hover:cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {patient.medical_record_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-100">
                      {patient.first_name} {patient.last_name}
                    </div>
                    <div className="text-sm text-gray-300">
                      {patient.city}, {patient.state}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                    {patient.date_of_birth}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-200">{patient.phone}</div>
                    <div className="text-sm text-gray-300">{patient.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                    {patient.registration_date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PatientList;
