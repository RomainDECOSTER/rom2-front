import { WorkshopActionType } from './actioner';

const initialState = {
  current_workshop: undefined,
};

const WorkshopReducer = (state = initialState, action) => {
  switch (action.type) {
    case WorkshopActionType.SET_CURRENT_WORKSHOP:
      return { ...state, current_workshop: action.workshop };

    default:
      return state;
  }
};

export { WorkshopReducer };
