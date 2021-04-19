const CampaignUtils = {
  getCampaignName(id, templates) {
    return templates.campaigns.find(element => element._id === id).name;
  },
};

export { CampaignUtils };
