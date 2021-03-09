import { toast } from 'components';
import { lacleStore } from 'store';
import { CampaignApi } from './api';

const CampaignActioner = {
  list: () => {
    return CampaignApi.getList()
      .then(res => res)
      .catch(err => {
        const messages = lacleStore.getState().I18n.messages.toast.error;
        toast.error(messages.unableToRetrieveCampaignList);
        throw err;
      });
  },
  get: id => {
    return CampaignApi.getSpecific(id)
      .then(res => res)
      .catch(err => {
        const messages = lacleStore.getState().I18n.messages.toast.error;
        toast.error(messages.unableToRetrieveCampaignList);
        throw err;
      });
  },
  create: (id, fields) => {
    return CampaignApi.create(id, fields)
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
    return CampaignApi.update(id, fields)
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
    return CampaignApi.delete(id)
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

export { CampaignActioner };
