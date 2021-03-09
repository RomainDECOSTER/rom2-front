import { ArrayUtils } from 'tools';

const ObjectUtils = {
  compareSimpleObjects: (a, b) => {
    if (a === b) return true;
    if (a === undefined || b === undefined || a === null || b === null) return false;
    if (typeof a !== 'object' || typeof b !== 'object') return false;

    const aKeys = Object.keys(a).filter(key => a[key] !== undefined);
    const bKeys = Object.keys(b).filter(key => b[key] !== undefined);

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    aKeys.sort();
    bKeys.sort();

    if (
      !ArrayUtils.compareArrays(aKeys, bKeys, (aKey, bKey) => {
        if (aKey !== bKey) return false;
        if (typeof a[aKey] === 'object' && typeof b[bKey] === 'object') {
          return ObjectUtils.compareSimpleObjects(a[aKey], b[bKey]);
        }
        return a[aKey] === b[bKey];
      })
    ) {
      return false;
    }

    return true;
  },

  copySimpleObject: obj => JSON.parse(JSON.stringify(obj)),
};

export { ObjectUtils };
