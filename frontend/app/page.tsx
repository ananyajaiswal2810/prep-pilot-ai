"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitAnswer = async () => {
    if (!answer.trim()) {
      setError("Please enter an answer.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/interview`,
        { answer }
      );
      setResult(res.data);
    } catch (e) {
      setError("Failed to get AI feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2">PrepPilot AI</h1>
        <p className="text-gray-600 mb-6">
          Practice interview answers and get AI-powered feedback.
        </p>

        <textarea
          className="w-full border rounded-lg p-3 mb-4"
          rows={5}
          placeholder="Type your interview answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <button
          onClick={submitAnswer}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          {loading ? "Evaluating..." : "Evaluate Answer"}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {result && (
          <div className="mt-6">
            <p className="font-semibold">Score: {result.score}/10</p>

            <p className="mt-2 font-medium">Strengths:</p>
            <ul className="list-disc list-inside">
              {result.strengths.map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            <p className="mt-2 font-medium">Improvements:</p>
            <ul className="list-disc list-inside">
              {result.improvements.map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
