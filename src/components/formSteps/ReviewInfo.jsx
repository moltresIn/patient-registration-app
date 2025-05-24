import { PencilIcon } from "@heroicons/react/24/outline";

function ReviewInfo({ formData, onEdit }) {
  const sections = [
    {
      title: "Personal Information",
      fields: [
        { label: "First Name", value: formData.first_name },
        { label: "Last Name", value: formData.last_name },
        { label: "Date of Birth", value: formData.date_of_birth },
        { label: "Gender", value: formData.gender },
      ],
      step: 1,
    },
    {
      title: "Contact Information",
      fields: [
        { label: "Phone", value: formData.phone },
        { label: "Email", value: formData.email },
      ],
      step: 2,
    },
    {
      title: "Address Information",
      fields: [
        { label: "Street Address", value: formData.street_address },
        { label: "City", value: formData.city },
        { label: "State", value: formData.state },
        { label: "Postal Code", value: formData.postal_code },
      ],
      step: 3,
    },
    {
      title: "Medical Information",
      fields: [
        {
          label: "Medical Record Number",
          value: formData.medical_record_number,
        },
        { label: "Allergies", value: formData.allergies || "None" },
        {
          label: "Pre-existing Conditions",
          value: formData.pre_existing_conditions || "None",
        },
      ],
      step: 4,
    },
    {
      title: "Emergency Contact",
      fields: [
        { label: "Name", value: formData.emergency_contact_name },
        { label: "Phone", value: formData.emergency_contact_phone },
      ],
      step: 5,
    },
  ];

  const handleEditClick = (e, stepNumber) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(stepNumber);
  };

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.title} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {section.title}
            </h3>
            <button
              type="button"
              onClick={(e) => handleEditClick(e, section.step)}
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
            >
              <PencilIcon className="w-4 h-4" />
              Edit
            </button>
          </div>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.fields.map((field) => (
              <div key={field.label}>
                <dt className="text-sm font-medium text-gray-500">
                  {field.label}
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {field.value || "N/A"}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

export default ReviewInfo;
