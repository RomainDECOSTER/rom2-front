const toast = {
  error: {
    accessDenied: "Vous n'êtes pas authorisé à faire ceci.",
    wrongCreds: 'Email ou mot de passe invalide.',
    serverError: "Une erreur s'est produite avec le serveur.",
    errorOccured: "Une erreur s'est produite.",
    invalidEmail: 'Adresse email invalide.',
    passwordNeeded: 'Veuillez renseigner un mot de passe.',
    sessionExpired: 'Session expirée, veuillez vous reconnecter.',
    unableToRetrievePermissions:
      "Une erreur s'est produite avec le serveur, impossible de récupérer les permissions de l'utilisateur.",
    unableToRetrieveUserList: 'Impossible de récupérer la liste des utilisateurs.',
    unableToRetrieveUserInfos: "Impossible de récupérer les informations de l'utilisateur.",
    unableToRetrieveCampaignList: 'Impossible de récupérer la liste des campagnes.',
    unableToRetrieveCampaignInfos: 'Impossible de récupérer les informations de la campagne',
    unableToRetrieveStudentList: 'Impossible de récupérer la liste des apprenants.',
    unableToRetrieveStudentInfos: "Impossible de récupérer les informations de l'apprenant",
    unableToRetrieveVolunteerList: 'Impossible de récupérer la liste des bénévoles.',
    unableToRetrieveVolunteerInfos: 'Impossible de récupérer les informations du bénévoles',
    unableToRetrieveWorkshopList: 'Impossible de récupérer la liste des ateliers.',
    unableToRetrieveWorkshopInfos: "Impossible de récupérer les informations de l'atelier",
    unableToRetrieveInterviewList: 'Impossible de récupérer la liste des interviews.',
    unableToRetrieveInterviewInfos: "Impossible de récupérer les informations de l'interview",
    unableToRetrieveInterviewedList: "Impossible de récupérer la liste des interviews de l'utilisateur.",
    unableToRetrievePositionedWorkshopList: 'Impossible de récupérer la liste des ateliers positionnés.',
    unableToRetrievePositionedWorkshopInfos: "Impossible de récupérer les informations de l'atelier positionné",
  },
  success: {
    userSuccessFullyCreated: "L'utilisateur a été créé avec succès.",
    userSuccessFullyEdited: "L'utilisateur a été modifié avec succès.",
    passwordChanged: 'Votre mot de passe a été défini avec succès.',
    successFullyCreated: 'Créé avec succès.',
    successFullyEdited: 'Modifié avec succès.',
    successFullyDeleted: 'Supprimer avec succès.',
  },
  info: {
    noFieldChanged: "Aucun champ n'a été modifié.",
  },
  warning: {},
};

export { toast };
