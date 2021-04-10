import { toast } from 'components';
import { lacleStore } from 'store';
import { VolunteerApi } from './api';

const VolunteerActioner = {
  list: id => {
    return VolunteerApi.getList(id)
      .then(res => res)
      .catch(err => {
        const messages = lacleStore.getState().I18n.messages.toast.error;
        toast.error(messages.unableToRetrieveStudentList);
        throw err;
      });
  },
  get: id => {
    return VolunteerApi.getSpecific(id)
      .then(res => res)
      .catch(err => {
        const messages = lacleStore.getState().I18n.messages.toast.error;
        toast.error(messages.unableToRetrieveStudentList);
        throw err;
      });
  },
  create: (id, fields) => {
    return VolunteerApi.create(id, fields)
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
    return VolunteerApi.update(id, fields)
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
    return VolunteerApi.delete(id)
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

export { VolunteerActioner };
