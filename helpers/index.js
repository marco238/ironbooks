module.exports.isSelected = function (options) {
  const { selectValue, dbValue } = options.hash;

  console.log('selectValue ', selectValue);
  console.log('dbValue ', dbValue);

  if (selectValue === dbValue) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};
