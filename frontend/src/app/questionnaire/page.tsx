"use client";
import { useEffect, useState } from "react";
import { fetchSessionInfo } from "../utils/sessionInfoAPI";
import LifestyleForm from "../components/lifestyleForm";

export default function QuestionnairePage() {
  const [nhsNumber, setNhsNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSessionInfo()
      .then((data) => {
        setNhsNumber(data.nhsNumber);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading session info...</p>;
  if (error) return <p>Error: {error}</p>;

  return <>
    <LifestyleForm /> 
  </>

}
