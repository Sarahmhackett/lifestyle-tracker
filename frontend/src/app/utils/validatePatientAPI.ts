export async function validatePatient({ nhsNumber, surname, dateOfBirth }: { nhsNumber: number, surname: string, dateOfBirth: string }) {
    const res = await fetch("http://localhost:5000/validation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nhsNumber, surname, dateOfBirth }),
      credentials: "include", 
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Validation failed");
    }
  
    return res.json();
  }