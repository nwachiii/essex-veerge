const capitalizeFirstLetterOfWords = str => {
  return str
    ?.toLowerCase()
    ?.replace(/(?:^|\b)(\w)|-(\w)/g, (match, g1, g2) => (g1 ? g1.toUpperCase() : '-' + g2))
    ?.trim();
};

export default capitalizeFirstLetterOfWords;
