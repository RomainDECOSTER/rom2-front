import { CampaignActioner } from 'services/campaign';
import { WorkshopActioner } from 'services/workshop';

const ComonUtils = {
  getComonTemplates: async () => {
    return {
      campaigns: await CampaignActioner.list(),
      workshops: await WorkshopActioner.list(),
    };
  },
};

export { ComonUtils };
