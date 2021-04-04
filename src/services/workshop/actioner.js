import { toast } from 'components';
import { lacleStore } from 'store';
import { WorkshopApi } from './api';

const WorkshopActioner = {
  list: () => {
    return WorkshopApi.getList()
      .then(res => res)
      .catch(err => {
        const messages = lacleStore.getState().I18n.messages.toast.error;
        toast.error(messages.unableToRetrieveWorkshopList);
        throw err;
      });
  },
  get: id => {
    return WorkshopApi.getSpecific(id)
      .then(res => res)
      .catch(err => {
        const messages = lacleStore.getState().I18n.messages.toast.error;
        toast.error(messages.unableToRetrieveWorkshopList);
        throw err;
      });
  },
  create: (id, fields) => {
    return WorkshopApi.create(id, fields)
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
    return WorkshopApi.update(id, fields)
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
    return WorkshopApi.delete(id)
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

export { WorkshopActioner };
