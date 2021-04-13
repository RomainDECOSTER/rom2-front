const ArrayToSelector = {
  getArray: tab => {
    return tab.map(item => {
      return { label: item.name, value: item._id };
    });
  },
  getEnums: tab => {
    return tab.map(item => {
      return { label: item, value: item };
    });
  },
};

export { ArrayToSelector };
