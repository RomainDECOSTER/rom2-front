import { paths } from 'routes';
import { XHTTP } from 'services';

const END_POINTS = {
  ...paths.api.interview,
};

const InterviewApi = {
  getList: id => XHTTP(`${END_POINTS.list}?campaign=${id}`),

  getInterviewedList: (id, campaign) =>
    XHTTP(`${END_POINTS.getInterviewedList}?interviewed_id=${id}&campaign=${campaign}`),

  getSpecific: id => XHTTP(`${END_POINTS.get}${id}`),

  create: fields => XHTTP(END_POINTS.create, { method: 'post', body: fields }),

  update: (id, fields) => XHTTP(`${END_POINTS.edit}${id}`, { method: 'put', body: fields }),

  delete: id => XHTTP(`${END_POINTS.delete}${id}`, { method: 'delete' }),
};

export { InterviewApi };
