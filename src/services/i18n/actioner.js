const I18nActionTypes = {
  SET_LOCALE: 'I18n_SET_LOCALE',
};

const I18nActioner = {
  setLocale: locale => ({
    type: I18nActionTypes.SET_LOCALE,
    locale,
  }),
};

export { I18nActioner, I18nActionTypes };
