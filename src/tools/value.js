const ValueUtils = {
  valueOrDefault: (value, defaultValue, format = v => v) => {
    return value !== undefined && value !== null ? format(value) : defaultValue;
  },

  isNumber: (value, validator, type = 'float', base = 10) => {
    const maybeInt = type === 'int' ? parseInt(value, base) : parseFloat(value, base);
    if (isNaN(maybeInt)) {
      return false;
    }
    if (typeof validator === 'function') {
      return validator(maybeInt) === true;
    }
    return true;
  },

  toNumber: (value, defaultValue = 0, type = 'float', base = 10) => {
    const maybeInt = type === 'int' ? parseInt(value, base) : parseFloat(value, base);
    if (isNaN(maybeInt)) {
      return defaultValue;
    }
    return maybeInt;
  },
};

export { ValueUtils };
