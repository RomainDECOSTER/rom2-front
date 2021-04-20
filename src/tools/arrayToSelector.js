const ArrayToSelector = {
  getArray: tab => {
    return tab.map(item => {
      return { label: item.name, value: item._id };
    });
  },
  getNamesArray: tab => {
    return tab.map(item => {
      return { label: `${item.lastname}  ${item.firstname}`, value: item._id };
    });
  },
  getGeneralInformationNamesArray: tab => {
    return tab.map(item => {
      return {
        label: `${item.general_information.last_name}  ${item.general_information.first_name}`,
        value: item._id,
      };
    });
  },
  getEnums: tab => {
    return tab.map(item => {
      return { label: item, value: item };
    });
  },
};

export { ArrayToSelector };
