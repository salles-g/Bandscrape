const reserved_characters = ["<", ">", ":", "\"", "/", "\\", "|", "?", "*"];

function filter(string) {

  if (string.slice(-1) == ".") {
    string = string.slice(0, -1);
  }

  return string.split('').filter(el => !reserved_characters.includes(el)).join('');

}

module.exports = filter;