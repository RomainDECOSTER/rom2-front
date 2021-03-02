import { I18nActionTypes } from './actioner';
import { DEFAULT_LANGUAGE, LOCALES, localeData } from './i18n';

const INIT_LOCALE =
  LOCALES.indexOf(global.navigator !== undefined && global.navigator.language) >= 0
    ? global.navigator.language
    : DEFAULT_LANGUAGE;

const initialState = {
  ...localeData[INIT_LOCALE],
  locales: LOCALES,
};

const I18nReducer = (state = initialState, action) => {
  switch (action.type) {
    case I18nActionTypes.SET_LOCALE:
      if (state.locales.indexOf(action.locale) !== -1) {
        return {
          ...state,
          ...localeData[action.locale],
        };
      }
      return state;
    default:
      return state;
  }
};

export { I18nReducer };
