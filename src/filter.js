const reservedChars = new RegExp("[<>:\"\\|?*/]", "g");

function filter(string) {
  // if string ends with a dot
  if (string.slice(-1) === ".") {
    string = string.slice(0, -1);
  }

  return string.replace(reservedChars, "");
}

module.exports = filter;