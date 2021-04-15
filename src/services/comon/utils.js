import { CampaignActioner } from 'services/campaign';
import { StudentActioner } from 'services/student';
import { UserActioner } from 'services/user';
import { VolunteerActioner } from 'services/volunteer';
import { WorkshopActioner } from 'services/workshop';

const ComonUtils = {
  getComonTemplates: async () => {
    return {
      campaigns: await CampaignActioner.list(),
      workshops: await WorkshopActioner.list(),
    };
  },
  getInterviewTemplates: async id_campaign => {
    return {
      campaigns: await CampaignActioner.list(),
      users: await UserActioner.getUserList(),
      students: await StudentActioner.list(id_campaign),
      volunteers: await VolunteerActioner.list(id_campaign),
    };
  },
};

export { ComonUtils };
