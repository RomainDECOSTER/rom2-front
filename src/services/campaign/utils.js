const CampaignUtils = {
  getCampaignName(id, campaigns) {
    return campaigns.find(element => element._id === id)?.name || 'Campagne Inconnue';
  },
};

export { CampaignUtils };
