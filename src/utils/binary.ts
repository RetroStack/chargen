const charsetToByteArray = (charset: number[][], dataWidth: number): Uint8Array => {
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

  return new Uint8Array(result);
};

const downloadData = (data: Uint8Array) => {
  const blob = new Blob([data.buffer], {
    type: "application/octet-stream",
  });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "character_set.bin";
  link.click();
};

export { charsetToByteArray, downloadData };
