export const numberInputOnWheelPreventChange = e => {
  let inputValue = e.target.value;
  const regex = /^-?[0-9]*$/; // Regular expression to match positive and negative numbers

  // Replace hyphen with a blank space and convert negative numbers to positive
  if (inputValue.includes('-')) {
    inputValue = Math.abs(parseInt(inputValue)); // Convert negative number to positive
    e.target.value = inputValue;
  }

  if (!regex.test(inputValue)) {
    e.preventDefault();
    return;
  }

  e.target.blur();
  // Prevent the page/container scrolling
  e.stopPropagation();

  setTimeout(() => {
    e.target.focus();
  }, 0);
};

export const handleKeyDown = event => {
  // Prevent '-' character
  if (event.key === '-') {
    event.preventDefault();
  }
};

export const handlePaste = event => {
  const pasteData = (event.clipboardData || window.clipboardData).getData('text');
  if (pasteData.startsWith('-')) {
    event.preventDefault();
  }
};
