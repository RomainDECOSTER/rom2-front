import { combineReducers } from 'redux';
import { AuthenticationReducer } from './authentication';
import { CampaignReducer } from './campaign';
import { I18nReducer } from './i18n';

const appReducers = combineReducers({
  I18n: I18nReducer,
  Authentication: AuthenticationReducer,
  Campaign: CampaignReducer,
});

export { appReducers };
