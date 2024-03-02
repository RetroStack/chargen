const charsetToByteArray = (charset: number[][], dataWidth: number): number[] => {
  const result: number[] = [];
  const bytes = Math.ceil(dataWidth / 8);

  for (let i = 0; i < charset.length; i++) {
    const rows = charset[i];
    for (let row = 0; row < rows.length; row++) {
      let currentRow = rows[row];
      for (let byte = 0; byte < bytes; byte++) {
        result.push(currentRow & 0xff);
        currentRow = currentRow >> 8;
      }
    }
  }

  return result;
};

const downloadData = (data: Uint8Array, filename: string) => {
  const blob = new Blob([data.buffer], {
    type: "application/octet-stream",
  });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

export { charsetToByteArray, downloadData };
