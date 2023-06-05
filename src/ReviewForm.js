import React, { useState } from "react";
const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    review: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    createReview(formData);
  };
  const validateForm = ({ name, email, rating, review }) => {
    const errors = {};
    if (!name) {
      errors.name = "Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email address";
    }
    if (!rating) {
      errors.rating = "Rating is required";
    } else if (!isValidRating(rating)) {
      errors.rating = "Rating must be between 1 and 5";
    }
    if (!review) {
      errors.review = "Review is required";
    } else if (review.length < 10) {
      errors.review = "Review must be at least 10 characters long";
    }
    return errors;
  };
  const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const isValidRating = (rating) => {
    return rating >= 1 && rating <= 5;
  };
  const createReview = (formData) => {
    // send request to server to create new review
    console.log(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="5"
          value={formData.rating}
          onChange={handleChange}
        />
        {errors.rating && <span>{errors.rating}</span>}
      </div>
      <div>
        <label htmlFor="review">Review:</label>
        <textarea
          id="review"
          name="review"
          value={formData.review}
          onChange={handleChange}
        />
        {errors.review && <span>{errors.review}</span>}
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};
export default ReviewForm;
