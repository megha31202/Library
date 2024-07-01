import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./HomePage.css"; // Create this file for custom styles if needed

const HomePage = () => {
  // Define an array of random facts
  const randomFacts = [
    "Books were once banned in the United States for promoting witchcraft.",
    "The longest novel ever written is 'In Search of Lost Time' by Marcel Proust, containing around 1.2 million words.",
    "J.K. Rowling chose the name 'Hermione' so young girls wouldn’t be teased for being nerdy.",
    "The first novel ever written on a typewriter is 'Tom Sawyer' by Mark Twain.",
    "The term 'bookworm' originates from insects that would bore through books' bindings.",
    "The first detective novel is often credited to Edgar Allan Poe's 'The Murders in the Rue Morgue,' published in 1841.",
    "The first book printed in English was 'Recuyell of the Historyes of Troye,' translated by William Caxton and printed in 1473.",
    "The longest sentence in literature is 13,955 words long, found in the novel 'Jonathan Strange & Mr Norrell' by Susanna Clarke.",
    "Agatha Christie, the famous mystery writer, holds the Guinness World Record for the most published books by a single author, with over 66 detective novels.",
    "The Guinness World Record for the largest book ever published is 'This is Mohammed,' measuring 5 meters by 8.06 meters and weighing 1,000 kilograms.",
    "The first book bought on Amazon was 'Fluid Concepts and Creative Analogies' by Douglas Hofstadter, purchased by John Wainwright in 1995.",
    "The longest sentence to appear in a published work of fiction is 823 words long and is found in the novel 'Absalom, Absalom!' by William Faulkner.",
    "The world's oldest known library is believed to have been in Nineveh (modern-day Iraq) and dates back to 7th century BCE.",
    "The phrase 'Once upon a time' is said to be the most common opening line in literature across cultures and languages.",
    "The longest audiobook ever recorded is 'The History of Middle-earth' series by J.R.R. Tolkien, which spans over 143 hours.",
    // Add more facts as needed
  ];

  // Function to pick a random fact
  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * randomFacts.length);
    return randomFacts[randomIndex];
  };

  // Initial state with a random fact
  const [randomFact, setRandomFact] = useState(getRandomFact());

  // Function to change the random fact on button click
  const changeRandomFact = () => {
    const newFact = getRandomFact();
    setRandomFact(newFact);
  };

  return (
    <div className="homepage-container">
      <div className="background-image"></div>
      <div className="content">
        <h1>Welcome to Bookshelf</h1>
        <p>Create your own online library.</p>
        <div className="buttons">
          <Link to="/books" className="btn btn-outline-light">
            <b>View Books</b>
          </Link>
          <Link to="/add-book" className="btn btn-outline-light">
            <b>Add Book</b>
          </Link>
        </div>
        <hr />
        <h2>Random Fact</h2>
        <div className="random-fact">
          <p>{randomFact}</p>
          <button className="btn btn-outline-light" onClick={changeRandomFact}>
            Get Another Fact
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
