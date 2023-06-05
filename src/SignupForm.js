import React, { useState } from "react";
import axios from "axios";

export default function SignupForm() {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "https://api.example.com/signup",
          formValues
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    setSubmitting(false);
  };
  const validateForm = () => {
    const errors = {};
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = formValues;
    if (!firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formValues.firstName}
          onChange={handleChange}
        />
        {formErrors.firstName && (
          <div className="error">{formErrors.firstName}</div>
        )}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formValues.lastName}
          onChange={handleChange}
        />
        {formErrors.lastName && (
          <div className="error">{formErrors.lastName}</div>
        )}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
        {formErrors.email && <div className="error">{formErrors.email}</div>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
        />
        {formErrors.password && (
          <div className="error">{formErrors.password}</div>
        )}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formValues.confirmPassword}
          onChange={handleChange}
        />
        {formErrors.confirmPassword && (
          <div className="error">{formErrors.confirmPassword}</div>
        )}
      </div>
      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
