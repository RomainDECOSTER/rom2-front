function defaultComparator(a, b) {
  return a === b;
}

const ArrayUtils = {
  compareArrays: (a, b, comparator = defaultComparator) => {
    if (a === b) return true;
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;

    const aClone = [...a];
    const bClone = [...b];

    aClone.sort();
    bClone.sort();

    for (let i = 0; i < aClone.length; ++i) {
      if (!comparator(aClone[i], bClone[i])) {
        return false;
      }
    }
    return true;
  },

  copyJsonObjectArray: array => JSON.parse(JSON.stringify(array)),

  loop: (n, cb) => {
    for (let i = 0; i < n; i++) {
      cb(i, n);
    }
  },
};

export { ArrayUtils };
