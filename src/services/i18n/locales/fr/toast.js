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
  },
  success: {
    userSuccessFullyCreated: "L'utilisateur a été créé avec succès.",
    userSuccessFullyEdited: "L'utilisateur a été modifié avec succès.",
    passwordChanged: 'Votre mot de passe a été défini avec succès.',
  },
  info: {},
  warning: {},
};

export { toast };
