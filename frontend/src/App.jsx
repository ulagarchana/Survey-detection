import { useState } from "react";

function App() {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState(3);
  const [answer4, setAnswer4] = useState("");
  const [answer5, setAnswer5] = useState("");

  const [startTime] = useState(Date.now());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    const surveyData = {
      q1: answer1,
      q2: answer2,
      q3: String(answer3),
      q4: answer4,
      q5: answer5,
      responseTime,
      browserInfo: navigator.userAgent,
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData),
      });

      const resultText = await response.text();
      console.log("Backend response:", resultText);

      if (!response.ok) {
        throw new Error(resultText);
      }

      alert("Survey submitted successfully!");
    } catch (error) {
      console.error("Submit error:", error);
      alert("Submission failed.");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h1>Survey Form</h1>
      <p>Welcome to the survey</p>
      <p>Answer the following questions.</p>

      <form onSubmit={handleSubmit}>
        <label>Q1. Why did you choose this university?</label>
        <br /><br />
        <textarea
          rows="5"
          cols="60"
          value={answer1}
          onChange={(e) => setAnswer1(e.target.value)}
        />

        <br /><br /><br />

        <label>Q2. How likely are you to recommend this university to others?</label>
        <br /><br />

        <label>
          <input
            type="radio"
            name="q2"
            value="Very Likely"
            onChange={(e) => setAnswer2(e.target.value)}
          />
          Very Likely
        </label>
        <br />

        <label>
          <input
            type="radio"
            name="q2"
            value="Likely"
            onChange={(e) => setAnswer2(e.target.value)}
          />
          Likely
        </label>
        <br />

        <label>
          <input
            type="radio"
            name="q2"
            value="Neutral"
            onChange={(e) => setAnswer2(e.target.value)}
          />
          Neutral
        </label>
        <br />

        <label>
          <input
            type="radio"
            name="q2"
            value="Unlikely"
            onChange={(e) => setAnswer2(e.target.value)}
          />
          Unlikely
        </label>
        <br />

        <label>
          <input
            type="radio"
            name="q2"
            value="Very Unlikely"
            onChange={(e) => setAnswer2(e.target.value)}
          />
          Very Unlikely
        </label>

        <br /><br /><br />

        <label>Q3. How satisfied are you with the university’s coursework?</label>
        <br /><br />

        <span>Not Satisfied</span>{" "}
        <input
          type="range"
          min="1"
          max="5"
          value={answer3}
          onChange={(e) => setAnswer3(e.target.value)}
        />{" "}
        <span>Very Satisfied</span>

        <br /><br /><br />

        <label>Q4. Are you satisfied with the quality of teaching?</label>
        <br /><br />

        <label>
          <input
            type="radio"
            name="q4"
            value="Yes"
            onChange={(e) => setAnswer4(e.target.value)}
          />
          Yes
        </label>
        <br />

        <label>
          <input
            type="radio"
            name="q4"
            value="No"
            onChange={(e) => setAnswer4(e.target.value)}
          />
          No
        </label>

        <br /><br />

        <label>Q5. Any other feedback?</label>
        <br /><br />
        <textarea
          rows="5"
          cols="60"
          value={answer5}
          onChange={(e) => setAnswer5(e.target.value)}
        />

        <br /><br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;