function ContactInfo({ formData, handleChange, errors }) {
  return (
    <div className="space-y-4">
      <div className="form-grid">
        <div>
          <label className="block text-sm font-medium text-white  mb-1">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`input-field pl-10 ${
                errors?.phone ? "border-red-500" : ""
              }`}
              required
            />
          </div>
          {errors?.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-white  mb-1">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field pl-10 ${
                errors?.email ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors?.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
