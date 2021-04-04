import { toast } from 'components';
import { lacleStore } from 'store';
import { StudentApi } from './api';

const StudentActionType = {
  SET_CURRENT_STUDENT: 'SET_CURRENT_STUDENT',
};

const StudentActioner = {
  setCurrentStudent: studentId => ({ type: StudentActionType.SET_CURRENT_STUDENT, student: studentId }),
  list: id => {
    return StudentApi.getList(id)
      .then(res => res)
      .catch(err => {
        const messages = lacleStore.getState().I18n.messages.toast.error;
        toast.error(messages.unableToRetrieveStudentList);
        throw err;
      });
  },
  get: id => {
    return StudentApi.getSpecific(id)
      .then(res => res)
      .catch(err => {
        const messages = lacleStore.getState().I18n.messages.toast.error;
        toast.error(messages.unableToRetrieveStudentList);
        throw err;
      });
  },
  create: (id, fields) => {
    return StudentApi.create(id, fields)
      .then(() => {
        const messages = lacleStore.getState().I18n.messages.toast.success;
        toast.success(messages.successFullyCreated);
      })
      .catch(err => {
        const messages = lacleStore.getState().I18n.messages.toast.error;
        const msg = err.description ? err.description : messages.errorOccured;
        toast.error(msg);

        throw err;
      });
  },
  update: (id, fields) => {
    return StudentApi.update(id, fields)
      .then(() => {
        const messages = lacleStore.getState().I18n.messages.toast.success;
        toast.success(messages.successFullyEdited);
      })
      .catch(err => {
        const messages = lacleStore.getState().I18n.messages.toast.error;
        const msg = err.description ? err.description : messages.errorOccured;
        toast.error(msg);

        throw err;
      });
  },
  delete: id => {
    return StudentApi.delete(id)
      .then(() => {
        const messages = lacleStore.getState().I18n.messages.toast.success;
        toast.success(messages.successFullyDeleted);
      })
      .catch(err => {
        const messages = lacleStore.getState().I18n.messages.toast.error;
        const msg = err.description ? err.description : messages.errorOccured;
        toast.error(msg);

        throw err;
      });
  },
};

export { StudentActioner, StudentActionType };
