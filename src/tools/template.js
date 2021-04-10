function getTemplate(loadTemplate) {
  return loadTemplate()
    .then(res => {
      return res;
    })
    .catch(err => {
      return [];
    });
}

export { getTemplate };
