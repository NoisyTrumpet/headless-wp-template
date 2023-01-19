// Function to remove &amp; from a string and replace with &

const removeAmp = (str: string) => {
  return str.replace(/&amp;/g, "&");
};

export default removeAmp;
