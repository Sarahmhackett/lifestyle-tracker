export const fetchIsHealthyStatus = async (): Promise<{ isHealthy: boolean }> => {
    const res = await fetch("http://localhost:5000/results-info", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch health status");
    }
  
    return res.json();
  };