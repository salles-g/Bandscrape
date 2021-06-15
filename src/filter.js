const reservedChars = new RegExp("[<>:\"\\|?*/]", "g");
const dotAtEnd = new RegExp("[.]*$", "g");

function filter(string) {
  string = string.replace(dotAtEnd, "");
  return string.replace(reservedChars, "");
}

module.exports = filter;