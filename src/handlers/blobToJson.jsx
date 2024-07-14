export const blobToJson = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result.trim();
      if (result.startsWith("{") || result.startsWith("[")) {
        try {
          const json = JSON.parse(result);
          resolve(json);
        } catch (err) {
          reject(new Error("Failed to parse JSON: " + err.message));
        }
      } else {
        resolve(result);
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read the Blob: " + reader.error));
    };

    reader.readAsText(blob);
  });
};
