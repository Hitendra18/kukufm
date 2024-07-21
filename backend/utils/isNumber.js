const isNumber = (string) => {
  return /^\d+$/.test(string);
};

module.exports = { isNumber };
