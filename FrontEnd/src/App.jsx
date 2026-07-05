import React, { useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import EditorImport from "react-simple-code-editor";
import axios from "axios";

import "./App.css";

const Editor = EditorImport.default || EditorImport;

function App() {
  const [code, setCode] = useState(`function sum(){
      return 1+1
    }`);

  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  async function reviewcode() {
    setLoading(true);
    setReview("");
    try {
      const response = await axios.post("http://localhost:3004/ai/get-review", {
        code,
      });
      const data = response.data?.response ?? response.data;
      setReview(typeof data === "string" ? data : JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error submitting code:", error);
      setReview("Failed to load review");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">

        <div className="app-title">
          <h1>AI Code Reviewer</h1>
        </div>
      </header>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                Prism.highlight(code, Prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", "monospace"',
                fontSize: 18,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div
            className={`review${loading ? " disabled" : ""}`}
            onClick={loading ? undefined : reviewcode}
          >
            {loading ? "Reviewing..." : "Review"}
          </div>
        </div>

        <div className="right">
          <div className="review-output">
            <h2>Review Output</h2>
            {review ? <pre>{review}</pre> : <p>Click review to see feedback</p>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
