const TimeUtils = {
  isValidTimeString: time => {
    const timeRegex = /^([0-1]?[0-9]|2[0-4]):[0-5][0-9]$/;
    return typeof time === 'string' && time.match(timeRegex);
  },
};

export { TimeUtils };
