import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function PersonalInfo({ formData, handleChange, errors }) {
  return (
    <div className="space-y-4">
      <div className="form-grid">
        <div>
          <label className="block text-sm font-medium text-white  mb-1">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className={`input-field ${
              errors?.first_name ? "border-red-500" : ""
            }`}
            required
          />
          {errors?.first_name && (
            <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-white  mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className={`input-field ${
              errors?.last_name ? "border-red-500" : ""
            }`}
            required
          />
          {errors?.last_name && (
            <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
          )}
        </div>
      </div>
      <div className="form-grid">
        <div>
          <label className="block text-sm font-medium text-white  mb-1">
            Date of Birth
          </label>

          <ReactDatePicker
            selected={
              formData.date_of_birth ? new Date(formData.date_of_birth) : null
            }
            onChange={(date) =>
              handleChange({
                target: {
                  name: "date_of_birth",
                  value: date ? date.toISOString().split("T")[0] : "",
                },
              })
            }
            dateFormat="dd-MM-yyyy"
            placeholderText="Select date of birth"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            className={`w-96 bg-black text-white px-4 py-2 border border-gray-50 rounded-lg  focus:border-transparent transition-all duration-200 pl-10 ${
              errors?.date_of_birth ? "border-red-500" : "border-gray-300"
            }`}
            calendarClassName="modern-calendar"
          />

          {errors?.date_of_birth && (
            <p className="mt-1 text-sm text-red-600">{errors.date_of_birth}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-white  mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`input-field ${errors?.gender ? "border-red-500" : ""}`}
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Other">Other</option>
          </select>
          {errors?.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
