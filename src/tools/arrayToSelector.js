const ArrayToSelector = {
  getArray: tab => {
    return tab.map(item => {
      return { label: item.name, value: item._id };
    });
  },
};

export { ArrayToSelector };
