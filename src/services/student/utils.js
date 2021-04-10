import { CampaignActioner } from 'services/campaign';
import { WorkshopActioner } from 'services/workshop';

const StudentUtils = {
  getStudentTemplates: async () => {
    return {
      campaigns: await CampaignActioner.list(),
      workshops: await WorkshopActioner.list(),
    };
  },
};

export { StudentUtils };
