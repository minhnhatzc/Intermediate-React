import React, { useState } from "react";
export default function Quiz() {
  const [questions] = useState([
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "London", "Madrid"],
      answer: "Paris",
    },
    {
      question: "What is the highest mountain in the world?",
      options: [
        "Mount Everest",
        "Mount Kilimanjaro",
        "Mount Fuji",
        "Mount McKinley",
      ],
      answer: "Mount Everest",
    },
    {
      question: "What is the currency of Japan?",
      options: ["Euro", "Yen", "Dollar", "Pound"],
      answer: "Yen",
    },
  ]);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].answer) {
        newScore++;
      }
    }
    setScore(newScore);
    setShowScore(true);
  };
  const handleChange = (e, index) => {
    let newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };
  const displayAnswers = () => {
    return questions.map((question, index) => (
      <div key={index}>
        <h4>{question.question}</h4>
        <p>Your answer: {answers[index]}</p>
        <p>Correct answer: {question.answer}</p>
      </div>
    ));
  };
  const displayQuiz = () => {
    return questions.map((question, index) => (
      <div key={index}>
        <h4>{question.question}</h4>
        <div>
          {question.options.map((option, optionIndex) => (
            <label key={optionIndex}>
              <input
                type="radio"
                value={option}
                checked={answers[index] === option}
                onChange={(e) => handleChange(e, index)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    ));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {displayQuiz()}
        <button type="submit">Submit</button>
      </form>
      {showScore && (
        <div>
          <p>
            Your score: {score}/{questions.length}
          </p>
          {displayAnswers()}
        </div>
      )}
    </div>
  );
}
