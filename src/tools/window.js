const WindowUtils = {
  openNewTab: (path, absolute = false) => {
    const url = absolute ? path : `${window.location.origin}${path}`;
    window.open(url, '_blank', 'noopener');
  },
};

export { WindowUtils };
