function PatientList() {
  const rows = [
    {
      id: 1,
      medical_record_number: "MRN001",
      first_name: "John",
      last_name: "Doe",
      date_of_birth: "1990-01-15",
      gender: "Male",
      phone: "123-456-7890",
      email: "john.doe@example.com",
      street_address: "123 Elm Street",
      city: "New York",
      state: "NY",
      postal_code: "10001",
      registration_date: "2025-05-01",
    },
    {
      id: 2,
      medical_record_number: "MRN002",
      first_name: "Jane",
      last_name: "Smith",
      date_of_birth: "1985-06-22",
      gender: "Female",
      phone: "987-654-3210",
      email: "jane.smith@example.com",
      street_address: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      postal_code: "90001",
      registration_date: "2025-05-10",
    },
    {
      id: 3,
      medical_record_number: "MRN003",
      first_name: "Alice",
      last_name: "Johnson",
      date_of_birth: "1975-09-30",
      gender: "Female",
      phone: "555-555-5555",
      email: "alice.johnson@example.com",
      street_address: "789 Pine Road",
      city: "Chicago",
      state: "IL",
      postal_code: "60601",
      registration_date: "2025-05-15",
    },
    {
      id: 4,
      medical_record_number: "MRN004",
      first_name: "Bob",
      last_name: "Brown",
      date_of_birth: "2000-03-18",
      gender: "Male",
      phone: "444-444-4444",
      email: "bob.brown@example.com",
      street_address: "321 Cedar Lane",
      city: "Houston",
      state: "TX",
      postal_code: "77001",
      registration_date: "2025-05-20",
    },
  ];
  if (!rows || rows.length === 0) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">No patients yet</h3>
        <p className="mt-2 text-sm text-gray-500">
          Register a new patient to see them listed here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Patient Records
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                MRN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DOB
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registration Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.medical_record_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {patient.first_name} {patient.last_name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {patient.city}, {patient.state}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.date_of_birth}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{patient.phone}</div>
                  <div className="text-sm text-gray-500">{patient.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.registration_date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default PatientList;
