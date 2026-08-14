import { useState } from "react";
import { useStudents } from "../contexts/StudentContext";
import SuccessMessage from "./SuccessMessage";

interface FormData {
  name: string;
  id: string;
  major: string;
  gpa: string;
  courses: string;
}

interface FormErrors {
  name?: string;
  id?: string;
  major?: string;
  gpa?: string;
  courses?: string;
}

function AddStudentForm() {
    const { addStudent } = useStudents();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    id: "",
    major: "",
    gpa: "",
    courses: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
  event: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement
  >
) => {
  const { name, value } = event.target;

  setFormData((currentData) => ({
    ...currentData,
    [name]: value,
  }));

  setSuccessMessage("");
};

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.id.trim()) {
      newErrors.id = "Student ID is required.";
    }

    if (!formData.major.trim()) {
      newErrors.major = "Major is required.";
    }

    if (!formData.gpa.trim()) {
      newErrors.gpa = "GPA is required.";
    } else {
      const gpa = Number(formData.gpa);

      if (Number.isNaN(gpa)) {
        newErrors.gpa = "GPA must be a valid number.";
      } else if (gpa < 0 || gpa > 4) {
        newErrors.gpa = "GPA must be between 0 and 4.";
      }
    }

    if (!formData.courses.trim()) {
      newErrors.courses =
        "At least one course is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  const isValid = validateForm();

  if (!isValid) {
    return;
  }

  const newStudent = {
    name: formData.name.trim(),
    id: formData.id.trim(),
    avatar: "https://i.pravatar.cc/150?img=68",
    gpa: Number(formData.gpa),
    major: formData.major.trim(),
    courses: formData.courses
      .split(",")
      .map((course) => course.trim())
      .filter((course) => course.length > 0),
  };

  addStudent(newStudent);

  setFormData({
    name: "",
    id: "",
    major: "",
    gpa: "",
    courses: "",
  });

  setErrors({});

  setSuccessMessage(
    "Student added successfully!"
  );
};

  return (
    <section className="add-student-section">
      <h2>Add Student</h2>
      {successMessage && (
  <SuccessMessage
    message={successMessage}
  />
)}

      <form
        className="add-student-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="name">
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />

          {errors.name && (
            <p className="form-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="id">
            Student ID
          </label>

          <input
            id="id"
            name="id"
            type="text"
            value={formData.id}
            onChange={handleChange}
          />

          {errors.id && (
            <p className="form-error">
              {errors.id}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="major">
            Major
          </label>

          <input
            id="major"
            name="major"
            type="text"
            value={formData.major}
            onChange={handleChange}
          />

          {errors.major && (
            <p className="form-error">
              {errors.major}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="gpa">
            GPA
          </label>

          <input
            id="gpa"
            name="gpa"
            type="number"
            min="0"
            max="4"
            step="0.01"
            value={formData.gpa}
            onChange={handleChange}
          />

          {errors.gpa && (
            <p className="form-error">
              {errors.gpa}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="courses">
            Courses
          </label>

          <textarea
            id="courses"
            name="courses"
            value={formData.courses}
            onChange={handleChange}
            placeholder="Example: Data Structures, Database Systems"
          />

          {errors.courses && (
            <p className="form-error">
              {errors.courses}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="submit-button"
        >
          Add Student
        </button>
      </form>
    </section>
  );
}

export default AddStudentForm;