const BASE_URL = import.meta.env.VITE_LOGGER_BASE_URL || "http://localhost:3001";

export async function Log(stack, level, packageName, message) {
  try {
    const response = await fetch(`${BASE_URL}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stack,
        level,
        package: packageName,
        message,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Log request failed: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Logger error:", error);
    throw error;
  }
}
