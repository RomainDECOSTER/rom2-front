import { paths } from 'routes';
import { AuthenticatedRoute } from 'routes/components';
import { CampaignCreate, CampaignEdit, CampaignList } from 'scenes';

const campaignRoutes = [
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.campaign.home,
      exact: true,
      component: CampaignList,
    },
  },
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.campaign.create,
      exact: true,
      component: CampaignCreate,
    },
  },
  {
    render: AuthenticatedRoute,
    props: {
      path: paths.front.campaign.edit,
      exact: true,
      component: CampaignEdit,
    },
  },
];

export { campaignRoutes };
