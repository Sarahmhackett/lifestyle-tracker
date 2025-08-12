export async function validatePatient({ nhsNumber, surname, dateOfBirth }: { nhsNumber: number, surname: string, dateOfBirth: string }) {
    const res = await fetch("http://localhost:5000/validation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nhsNumber, surname, dateOfBirth }),
      credentials: "include", 
    });
  
    const data = await res.json();
    
    if (!res.ok) {
      return { 
        success: false, 
        message: data.error || data.status || "Validation failed" 
      };
    }
    
    return { success: true, data };
}