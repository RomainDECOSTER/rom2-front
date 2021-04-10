import { paths } from 'routes';
import { XHTTP } from 'services';

const END_POINTS = {
  ...paths.api.volunteer,
};

const VolunteerApi = {
  getList: id => XHTTP(`${END_POINTS.list}?campaign=${id}`),

  getSpecific: id => XHTTP(`${END_POINTS.get}${id}`),

  create: fields => XHTTP(END_POINTS.create, { method: 'post', body: fields }),

  update: (id, fields) => XHTTP(`${END_POINTS.edit}${id}`, { method: 'put', body: fields }),

  delete: id => XHTTP(`${END_POINTS.delete}${id}`, { method: 'delete' }),
};

export { VolunteerApi };
