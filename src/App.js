import React, { useState } from "react";
import axios from "axios";
import "./App.css";

// Icon components (you can replace these with your preferred icon library)
const Calendar = () => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const Clock = () => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Mail = () => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const User = () => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const Video = () => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const ArrowRight = () => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);

const Heart = () => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const CheckCircle = () => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const AlertCircle = () => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Sparkles = () => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  // Replace your handleSubmit function with this:
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    // Add some console logs for debugging
    console.log("Submitting form with:", { name, email, dateTime });

    try {
      // const res = await axios.post('http://localhost:5001/schedule', {
      const res = await axios.post(
        "https://automeetscheduler-backend.onrender.com/schedule",
        {
          name,
          email,
          dateTime,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 60000, // 30 second timeout
        }
      );

      // console.log('Response received:', res.data);

      if (res.data.status === "success") {
        setResponse(
          `${res.data.message} <a href="${res.data.meetLink}" target="_blank" rel="noopener noreferrer">${res.data.meetLink}</a>`
        );
      } else if (res.data.status === "partial_success") {
        setResponse(
          `${res.data.message} <a href="${res.data.meetLink}" target="_blank" rel="noopener noreferrer">${res.data.meetLink}</a>`
        );
        setIsError(false);
      } else {
        setResponse(
          `Meeting created! <a href="${res.data.meetLink}" target="_blank" rel="noopener noreferrer">${res.data.meetLink}</a>`
        );
      }
    } catch (err) {
      console.error("Error details:", err);

      if (err.code === "ECONNREFUSED") {
        setResponse(
          "Cannot connect to server. Make sure your backend is running on port 5001."
        );
      } else if (err.response?.data?.error) {
        setResponse(`Error: ${err.response.data.error}`);
      } else {
        setResponse(`Error creating meeting: ${err.message}`);
      }
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      {/* Animated background elements */}
      <div className="background-orbs">
        <div className="orb-1"></div>
        <div className="orb-2"></div>
        <div className="orb-3"></div>
        <div className="grid-pattern"></div>
      </div>

      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-icon">
            <Calendar />
          </div>
          <h1>Auto Meeting Scheduler</h1>
          <p>Create your perfect moment</p>
        </div>

        {/* Main Card */}
        <div className="card-container">
          <div className="card-glow"></div>

          <div className="card">
            <form onSubmit={handleSubmit} className="form-container">
              {/* Name Input */}
              <div className="input-group">
                <label className="input-label">
                  <User className="blue-icon" />
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="input-group">
                <label className="input-label">
                  <Mail className="purple-icon" />
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input purple-focus"
                  required
                />
              </div>

              {/* DateTime Input */}
              <div className="input-group">
                <label className="input-label">
                  <Clock className="cyan-icon" />
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="form-input cyan-focus"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Creating Meeting...</span>
                  </>
                ) : (
                  <>
                    <Video />
                    <span>Schedule Meeting</span>
                    <ArrowRight />
                  </>
                )}
              </button>
            </form>

            {/* Response */}
            {response && (
              <div
                className={`response-container ${
                  isError ? "error" : "success"
                }`}
              >
                <div className="response-header">
                  {isError ? <AlertCircle /> : <CheckCircle />}
                  <span>{isError ? "Error!" : "Success!"}</span>
                </div>
                <div
                  className="response-text"
                  dangerouslySetInnerHTML={{ __html: response }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="footer-content">
            <Heart className="pink-icon" />
            <span>
              Made by Vivek Sharma {" "}
              <a
                className="linkWebSite"
                target="_blank"
                rel="noopener noreferrer"
                href="https://vivek-sharma-three.vercel.app/"
              >
                ( Visit )
              </a>
            </span>
            <Sparkles className="blue-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
