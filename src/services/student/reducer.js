import { StudentActionType } from './actioner';

const initialState = {
  current_student: undefined,
};

const StudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case StudentActionType.SET_CURRENT_STUDENT:
      return { ...state, current_student: action.student };

    default:
      return state;
  }
};

export { StudentReducer };
