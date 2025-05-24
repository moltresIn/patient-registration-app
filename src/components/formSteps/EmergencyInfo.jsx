function EmergencyInfo({ formData, handleChange, errors }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white  mb-1">
          Emergency Contact Name
        </label>
        <input
          type="text"
          name="emergency_contact_name"
          value={formData.emergency_contact_name}
          onChange={handleChange}
          className={`input-field ${
            errors?.emergency_contact_name ? "border-red-500" : ""
          }`}
          required
        />
        {errors?.emergency_contact_name && (
          <p className="mt-1 text-sm text-red-600">
            {errors.emergency_contact_name}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-white  mb-1">
          Emergency Contact Phone
        </label>
        <div className="relative">
          <input
            type="tel"
            name="emergency_contact_phone"
            value={formData.emergency_contact_phone}
            onChange={handleChange}
            className={`input-field pl-10 ${
              errors?.emergency_contact_phone ? "border-red-500" : ""
            }`}
            required
          />
        </div>
        {errors?.emergency_contact_phone && (
          <p className="mt-1 text-sm text-red-600">
            {errors.emergency_contact_phone}
          </p>
        )}
      </div>
    </div>
  );
}

export default EmergencyInfo;
