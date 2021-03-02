import { fr as frData } from './locales/fr';

const DEFAULT_LANGUAGE = 'fr';
const LOCALES = ['fr']; // available locale
const localeData = {}; // will receive the messages

/*function flattenMessages(nestedMessages = {}, prefix = "") {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      messages[prefixedKey] = value; // eslint-disable-line no-param-reassign
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}*/

localeData.fr = frData;
//localeData.fr.messages = flattenMessages(localeData.fr.messages);

//localeData.en.messages = flattenMessages(localeData.en.messages);

export { DEFAULT_LANGUAGE, LOCALES, localeData };
