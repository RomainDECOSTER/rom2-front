import { CampaignActionType } from './actioner';

const initialState = {
  current_campaign: undefined,
};

const CampaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case CampaignActionType.SET_CURRENT_CAMPAIGN:
      return { ...state, current_campaign: action.campaign };

    default:
      return state;
  }
};

export { CampaignReducer };
