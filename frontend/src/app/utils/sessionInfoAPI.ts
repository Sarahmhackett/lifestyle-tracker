export async function fetchSessionInfo(): Promise<{ nhsNumber: string }> {
    const res = await fetch("http://localhost:5000/session-info", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  
    if (!res.ok) {
      throw new Error("No session data found");
    }
  
    return res.json();
  }