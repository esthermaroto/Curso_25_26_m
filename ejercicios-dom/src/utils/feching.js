// fetching.js
const fetching = async (url) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Error en la solicitud");
    }

    return await res.json();
  } catch (error) {
    console.error("Error en fetching:", error.message);
    return null; // No rompes la app
  }
};

export default fetching;
