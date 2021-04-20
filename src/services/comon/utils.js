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
  getInterviewTemplates: async idCampaign => {
    return {
      campaigns: await CampaignActioner.list(),
      users: await UserActioner.getUserList(),
      students: await StudentActioner.list(idCampaign),
      volunteers: await VolunteerActioner.list(idCampaign),
    };
  },
  getPorfilNames(idProfil, entities) {
    const item = entities.find(element => element._id === idProfil);
    if (item) {
      return `${item.general_information.last_name} ${item.general_information.first_name}`;
    } else {
      return 'Inconnu';
    }
  },
};

export { ComonUtils };
