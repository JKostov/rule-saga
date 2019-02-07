
export function convertBlobToFile(blob) {
  const file = new File([blob], blob[0].name);
  file.originalname = file.name;

  return file;
}
