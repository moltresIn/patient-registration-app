import React, { useState, useEffect } from "react";
import { usePGlite } from "@electric-sql/pglite-react";
import { TableCellsIcon } from "@heroicons/react/24/outline";

function PatientTable() {
  const db = usePGlite();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    gender: "",
    city: "",
    state: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "registration_date",
    direction: "desc",
  });
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const result = await db.query(
          "SELECT * FROM patients ORDER BY registration_date DESC"
        );
        const formattedPatients = result.rows.map((patient) => ({
          ...patient,
          date_of_birth:
            patient.date_of_birth instanceof Date
              ? patient.date_of_birth.toISOString().split("T")[0]
              : patient.date_of_birth,
          registration_date:
            patient.registration_date instanceof Date
              ? patient.registration_date.toLocaleString()
              : patient.registration_date,
        }));
        setPatients(formattedPatients);

        // Get unique cities and states for filters
        const uniqueCities = [
          ...new Set(formattedPatients.map((p) => p.city)),
        ].sort();
        const uniqueStates = [
          ...new Set(formattedPatients.map((p) => p.state)),
        ].sort();
        setCities(uniqueCities);
        setStates(uniqueStates);

        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
    const interval = setInterval(fetchPatients, 5000);
    return () => clearInterval(interval);
  }, [db]);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const filteredAndSortedPatients = React.useMemo(() => {
    return patients
      .filter((patient) => {
        const matchesSearch =
          searchTerm === "" ||
          Object.values(patient).some(
            (value) =>
              value &&
              value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          );

        const matchesFilters =
          (filters.gender === "" || patient.gender === filters.gender) &&
          (filters.city === "" || patient.city === filters.city) &&
          (filters.state === "" || patient.state === filters.state);

        return matchesSearch && matchesFilters;
      })
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
  }, [patients, searchTerm, filters, sortConfig]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50  text-red-700  p-4 rounded-lg">
        Error loading patients: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-7">
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl">
          <TableCellsIcon className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-blue-800">Patient Table</h2>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
            className="select-field"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            className="select-field"
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <select
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
            className="select-field"
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="text-sm text-gray-500 ">
        Showing {filteredAndSortedPatients.length} of {patients.length} patients
      </div>

      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full hover:cursor-pointer ">
          <thead className="bg-slate-900">
            <tr>
              {[
                { key: "registration_date", label: "Registration Date" },
                { key: "medical_record_number", label: "MRN" },
                { key: "first_name", label: "Name" },
                { key: "date_of_birth", label: "DOB" },
                { key: "gender", label: "Gender" },
                { key: "city", label: "City" },
                { key: "state", label: "State" },
                { key: "phone", label: "Contact" },
              ].map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider cursor-pointer hover:bg-white hover:text-black"
                >
                  <div className="flex items-center gap-1">
                    {column.label}
                    {sortConfig.key === column.key && (
                      <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-slate-900 divide-blue-100 ">
            {filteredAndSortedPatients.map((patient) => (
              <tr
                key={patient.id}
                className="hover:bg-white  transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500 ">
                  {patient.registration_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500 ">
                  {patient.medical_record_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-md font-medium text-gray-500 ">
                    {patient.first_name} {patient.last_name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500 ">
                  {patient.date_of_birth}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500 ">
                  {patient.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500 ">
                  {patient.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500 ">
                  {patient.state}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-md text-gray-500 ">{patient.phone}</div>
                  <div className="text-md text-gray-500 ">{patient.email}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientTable;
