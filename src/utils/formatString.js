export const formatToUrl = string => {
  const isURL = string.includes(`https://`) || string.includes(`http://`);

  if (isURL) {
    return string;
  } else {
    return `https://${string}`;
  }
};
