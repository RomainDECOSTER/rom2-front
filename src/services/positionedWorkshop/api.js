import { paths } from 'routes';
import { XHTTP } from 'services/api';

const END_POINTS = {
  ...paths.api.positionedWorkshop,
};

const PositionedWorkshopApi = {
  getList: campaignId => XHTTP(`${END_POINTS.list}?campaign=${campaignId}`),

  getSpecific: id => XHTTP(`${END_POINTS.get}${id}`),

  create: fields => XHTTP(END_POINTS.create, { method: 'post', body: fields }),

  update: (id, fields) => XHTTP(`${END_POINTS.edit}${id}`, { method: 'put', body: fields }),

  delete: id => XHTTP(`${END_POINTS.delete}${id}`, { method: 'delete' }),
};

export { PositionedWorkshopApi };
