import { toast } from 'components';
import { lacleStore } from 'store';
import { InterviewApi } from './api';

const InterviewActioner = {
  list: id => {
    return InterviewApi.getList(id)
      .then(res => res)
      .catch(err => {
        const messages = lacleStore.getState().I18n.messages.toast.error;
        toast.error(messages.unableToRetrieveInterviewList);
        throw err;
      });
  },
  getInterviewedList: (id, campaign) => {
    return InterviewApi.getInterviewedList(id, campaign)
      .then(res => res)
      .catch(err => {
        const messages = lacleStore.getState().I18n.messages.toast.error;
        toast.error(messages.unableToRetrieveInterviewedList);
        throw err;
      });
  },
  get: id => {
    return InterviewApi.getSpecific(id)
      .then(res => res)
      .catch(err => {
        const messages = lacleStore.getState().I18n.messages.toast.error;
        toast.error(messages.unableToRetrieveInterviewInfos);
        throw err;
      });
  },
  create: (id, fields) => {
    return InterviewApi.create(id, fields)
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
    return InterviewApi.update(id, fields)
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
    return InterviewApi.delete(id)
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

export { InterviewActioner };
