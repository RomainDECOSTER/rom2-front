import { XHTTP } from 'services';
import { paths } from 'routes';

const END_POINTS = {
  getUserInfos: paths.api.user.infos,
  setPassword: paths.api.user.setPassword,
  forgotPassword: paths.api.user.forgotPassword,
  getUserList: paths.api.user.factoriot.list,
  createNewUser: paths.api.user.factoriot.create,
  editUser: paths.api.user.factoriot.edit,
  getSpecificUserInfos: paths.api.user.factoriot.get,
};

const UserApi = {
  getUserInfos: () => XHTTP(END_POINTS.getUserInfos),

  setPassword: (confirmToken, password) =>
    XHTTP(END_POINTS.setPassword, {
      method: 'post',
      headers: { Authorization: 'Bearer ' + confirmToken },
      body: { password },
    }),

  forgotPassword: email =>
    XHTTP(END_POINTS.forgotPassword, {
      method: 'post',
      body: { email },
      noAuth: true,
    }),

  getUserList: () => XHTTP(END_POINTS.getUserList),

  createNewUser: fields =>
    XHTTP(END_POINTS.createNewUser, {
      method: 'post',
      body: {
        email: fields.email,
        firstname: fields.firstname,
        lastname: fields.lastname,
        modules: fields.permissions,
      },
    }),

  editUser: (userId, fields) =>
    XHTTP(`${END_POINTS.editUser}${userId}`, {
      method: 'put',
      body: {
        email: fields.email,
        firstname: fields.firstname,
        lastname: fields.lastname,
        status: fields.status,
        modules: fields.permissions,
      },
    }),

  getSpecificUserInfos: userId => XHTTP(`${END_POINTS.getSpecificUserInfos}${userId}`),
};

export { UserApi };
