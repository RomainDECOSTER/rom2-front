const { paths } = require('routes');
const { XHTTP } = require('services/api');

const END_POINTS = {
  ...paths.api.campaign,
};

const CampaignApi = {
  getList: () => XHTTP(END_POINTS.list),

  getSpecific: id => XHTTP(`${END_POINTS.get}${id}`),

  create: fields => XHTTP(END_POINTS.create, { method: 'post', body: fields }),

  update: (id, fields) => XHTTP(`${END_POINTS.edit}${id}`, { method: 'put', body: fields }),

  delete: id => XHTTP(`${END_POINTS.delete}${id}`, { method: 'delete' }),
};

export { CampaignApi };
