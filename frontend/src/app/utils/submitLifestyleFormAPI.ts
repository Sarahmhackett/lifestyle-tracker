export const submitLifestyleForm = async (
    drink: boolean, 
    smoke: boolean, 
    exercise: boolean, 
    nhsNumber: string
  ) => {
    const res = await fetch("http://localhost:5000/lifestyle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ drink, smoke, exercise, nhsNumber }),
    });
  
    if (!res.ok) throw new Error("Failed to save lifestyle data");
  
    const result = await res.json();
    return result;
  };
  