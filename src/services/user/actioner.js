import { UserApi } from './api';
import { lacleStore } from 'store';
import { toast } from 'components';

const UserActionTypes = {
  SET_USER: 'USER_SET_USER',
};

const UserActioner = {
  setUser: user => ({
    type: UserActionTypes.SET_USER,
    user: { ...user },
  }),

  forgotPassword: email => {
    return UserApi.forgotPassword(email)
      .then(res => res)
      .catch(err => {
        const messages = lacleStore.getState().I18n.messages.toast.error;
        const msg = err.description ? err.description : messages.errorOccured;
        toast.error(msg);
        throw err;
      });
  },

  getUserList: () => {
    return UserApi.getUserList()
      .then(res => res)
      .catch(err => {
        const errorMessages = lacleStore.getState().I18n.messages.toast.error;
        toast.error(errorMessages.unableToRetrieveUserList);
        throw err;
      });
  },

  getSpecificUserInfos: userId => {
    return UserApi.getSpecificUserInfos(userId)
      .then(res => res)
      .catch(err => {
        const errorMessages = lacleStore.getState().I18n.messages.toast.error;
        toast.error(errorMessages.unableToRetrieveUserInfos);
        throw err;
      });
  },

  setPassword: (confirmToken, password) => {
    return new Promise((resolve, reject) => {
      UserApi.setPassword(confirmToken, password)
        .then(res => {
          const messages = lacleStore.getState().I18n.messages.toast.success;
          toast.success(messages.passwordChanged);

          resolve(res);
        })
        .catch(err => {
          const messages = lacleStore.getState().I18n.messages.toast.error;
          const msg = err.description ? err.description : messages.errorOccured;
          toast.error(msg);

          reject(err);
        });
    });
  },

  createNewUser: fields => {
    return new Promise((resolve, reject) => {
      UserApi.createNewUser(fields)
        .then(res => {
          const messages = lacleStore.getState().I18n.messages.toast.success;
          toast.success(messages.userSuccessFullyCreated);

          resolve(res);
        })
        .catch(err => {
          const messages = lacleStore.getState().I18n.messages.toast.error;
          const msg = err.description ? err.description : messages.errorOccured;
          toast.error(msg);

          reject(err);
        });
    });
  },

  editUser: (userId, fields) => {
    return new Promise((resolve, reject) => {
      UserApi.editUser(userId, fields)
        .then(res => {
          const messages = lacleStore.getState().I18n.messages.toast.success;
          toast.success(messages.userSuccessFullyEdited);

          resolve(res);
        })
        .catch(err => {
          const messages = lacleStore.getState().I18n.messages.toast.error;
          const msg = err.description ? err.description : messages.errorOccured;
          toast.error(msg);

          reject(err);
        });
    });
  },
};

export { UserActioner, UserActionTypes };
