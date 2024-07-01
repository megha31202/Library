import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Import CSS file for styles

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("Unread"); // Add status state
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author, year, genre, status }), // Include status in request body
      });
      if (!response.ok) {
        throw new Error("Failed to add book");
      }
      setIsSubmitted(true); // Update state after successful addition
    } catch (error) {
      console.error("Error adding book:", error);
      // Handle error as needed (e.g., show error message to user)
    }
  };

  // Redirect to book list after successful form submission
  if (isSubmitted) {
    return (
      <div className="book-form-container">
        <div className="background-image"></div>
        <div className="content">
          <h1>Book Added Successfully!</h1>
          <button
            className="btn btn-outline-light"
            onClick={() => (window.location.href = "/add-book")}
          >
            <b>Add Another Book</b>
          </button>
          <button
            className="btn btn-outline-light"
            onClick={() => (window.location.href = "/books")}
          >
            <b>View Book List</b>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage-container">
      <div className="background-image"></div>
      <div className="content">
        <div className="book-form">
          <h1>Add a New Book</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="Enter year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <select
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="Unread">Unread</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Read">Read</option>
              </select>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-light mr-2">
                <b>Add Book</b>
              </button>
              <Link to="/books" className="btn btn-outline-light">
                <b>View Books</b>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
