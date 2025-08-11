"use client";
import { useEffect, useState } from "react";
import { fetchIsHealthyStatus } from "../utils/fetchHealthStatusAPI";

export default function ResultsPage() {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchIsHealthyStatus()
      .then((data) => {
        setIsHealthy(data.isHealthy);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading results...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {isHealthy ? (
        <h1>Great job, keep it up!</h1>
      ) : (
        <h1>Consider healthier habits</h1>
      )}
    </div>
  );
}
