import { CampaignApi } from 'services/campaign';
import { UserApi } from 'services/user';
import { WorkshopApi } from 'services/workshop';

const PositionedWorkshopUtils = {
  getPositionedWorkshopTemplates: async () => ({
    workshops: await WorkshopApi.getList(),
    animators: await UserApi.getUserList(),
    campaigns: await CampaignApi.getList(),
  }),
};

export { PositionedWorkshopUtils };
