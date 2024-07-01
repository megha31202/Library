import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import closeIcon from "./close.svg"; // Import close.svg from your assets folder
import "./HomePage.css"; // Ensure your CSS file is correctly imported

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState("default"); // Default sorting option
  const [editMode, setEditMode] = useState(false);
  const [editedBook, setEditedBook] = useState(null);
  const [bookOfTheDay, setBookOfTheDay] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    // Select a random book as the Book of the Day when books change
    if (books.length > 0) {
      const randomIndex = Math.floor(Math.random() * books.length);
      setBookOfTheDay(books[randomIndex]);
    }
  }, [books]);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:8000/books");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
      setSearchResults(data); // Initialize search results with all books
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete book");
      }
      fetchBooks(); // Refresh the book list after deletion
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter books based on search term
    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.year.toString().includes(searchTerm) ||
        book.genre.toLowerCase().includes(searchTerm) ||
        book.status.toLowerCase().includes(searchTerm)
    );
    setSearchResults(filteredBooks);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    sortBooks(e.target.value);
  };

  const sortBooks = (sortBy) => {
    let sortedBooks = [...searchResults];
    switch (sortBy) {
      case "title":
        sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "author":
        sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case "year":
        sortedBooks.sort((a, b) => a.year - b.year);
        break;
      case "genre":
        sortedBooks.sort((a, b) => a.genre.localeCompare(b.genre));
        break;
      case "status":
        sortedBooks.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }
    setSearchResults(sortedBooks);
  };

  const toggleEditMode = (book) => {
    setEditedBook({ ...book });
    setEditMode(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/books/${editedBook._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedBook),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update book");
      }
      fetchBooks(); // Refresh book list after successful update
      setEditMode(false); // Exit edit mode
      setEditedBook(null); // Clear editedBook state
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditedBook(null);
  };

  const closeBookOfTheDay = () => {
    setBookOfTheDay(null); // Clear the bookOfTheDay state
  };

  return (
    <div className="homepage-container">
      <div className="background-image"></div>
      <div className="content">
        <h1>Books in Your Library: {books.length}</h1>

        <div className="d-flex align-items-center mb-3">
          <div className="form-group mb-0 mr-2">
            <select
              id="sortBy"
              className="form-control"
              value={sortBy}
              onChange={handleSortByChange}
            >
              <option value="default">Sort By</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="year">Year</option>
              <option value="genre">Genre</option>
              <option value="status">Status</option>
            </select>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by title, author, year, genre or status"
              value={searchTerm}
              onChange={handleSearch}
              className="form-control"
            />
          </div>
        </div>
        {/* Buttons aligned to bottom left of grey box  */}
        <div className="option-btn">
          <Link to="/" className="btn btn-outline-light">
            <b>Back to Home</b>
          </Link>
        </div>
        <div className="option-btn2">
          <Link to="/add-book" className="btn btn-outline-light">
            <b>Add Books</b>
          </Link>
        </div>
        {/* Book of the Day Card */}
        {bookOfTheDay && (
          <div className="card mt-4">
            <div className="card-body">
              <div className="close-button" onClick={closeBookOfTheDay}>
                <img src={closeIcon} alt="Close" className="close-icon" />
              </div>
              <h5 className="card-title">
                <b>Book of the Day</b>
              </h5>
              <p className="card-text">Title: {bookOfTheDay.title}</p>
              <p className="card-text">Author: {bookOfTheDay.author}</p>
              <p className="card-text">Year: {bookOfTheDay.year}</p>
              <p className="card-text">Genre: {bookOfTheDay.genre}</p>
              <p className="card-text">Status: {bookOfTheDay.status}</p>
            </div>
          </div>
        )}

        {/* Book List */}
        <div className="book-list mt-4 d-flex justify-content-start flex-wrap">
          {searchResults.length > 0 ? (
            searchResults.map((book) => (
              <div key={book._id} className="card mb-3 mr-4">
                <div className="card-body text-black">
                  {!editMode || editedBook._id !== book._id ? (
                    <>
                      <h3 className="card-title">{book.title}</h3>
                      <h5 className="card-text">Author: {book.author}</h5>
                      <h5 className="card-text">Year: {book.year}</h5>
                      <h5 className="card-text">Genre: {book.genre}</h5>
                      <h5 className="card-text">Status: {book.status}</h5>
                      <button
                        className="btn btn-outline-danger mr-2"
                        onClick={() => handleDeleteBook(book._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-outline-dark"
                        onClick={() => toggleEditMode(book)}
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        className="form-control mb-2"
                        name="title"
                        value={editedBook.title}
                        onChange={handleEditInputChange}
                      />
                      <input
                        type="text"
                        className="form-control mb-2"
                        name="author"
                        value={editedBook.author}
                        onChange={handleEditInputChange}
                      />
                      <input
                        type="number"
                        className="form-control mb-2"
                        name="year"
                        value={editedBook.year}
                        onChange={handleEditInputChange}
                      />
                      <input
                        type="text"
                        className="form-control mb-2"
                        name="genre"
                        value={editedBook.genre}
                        onChange={handleEditInputChange}
                      />
                      <select
                        className="form-control mb-2"
                        name="status"
                        value={editedBook.status}
                        onChange={handleEditInputChange}
                      >
                        <option value="Unread">Unread</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Read">Read</option>
                      </select>
                      <button
                        className="btn btn-primary mr-2"
                        onClick={handleSaveEdit}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No books found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookList;
