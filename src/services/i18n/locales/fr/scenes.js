const scenes = {
  login: {
    copyright: `Lacle © ${new Date().getFullYear()}`,
    forgotPasswordLink: 'Mot de passe oublié ?',
    loginButtonLabel: 'Se connecter',
    rememberMeLabel: 'Rester connecté',
    emailLabel: 'Adresse email',
    passwordLabel: 'Mot de passe',
    welcomeMessage: 'Connectez-vous à Rom2',
  },
  setPassword: {
    passwordLabel: 'Mot de passe',
    changePasswordButtonLabel: 'Confirmer',
    enterPassword: 'Veuillez renseigner votre nouveau mot de passe.',
  },
  forgotPassword: {
    title: 'Réinitialisation du mot de passe',
    emailLabel: 'Email',
    sendLinkButtonLabel: 'Envoyer le lien de réinitialisation',
    successMessage: 'Le lien de réinitialisation du mot de passe a été envoyé avec succès.',
  },
  Table: {
    actions: 'Actions',
  },
  campaignList: {
    title: 'Campagne',
    columnTitles: {
      name: 'Nom',
      description: 'Description',
    },
  },
  campaignCreate: {
    title: 'Créer une campagne',
  },
  campaignEdit: {
    title: 'Modifier une campagne',
    labels: {
      name: 'Nom',
      description: 'Description',
    },
  },
  submitButtons: {
    save: 'Sauvegarder',
    delete: 'Supprimer',
  },
  userForm: {
    labels: {
      firstname: 'Prénom',
      lastname: 'Nom',
      email: 'Email',
      roles: {
        title: 'Roles',
        admin: 'Admin',
        team: 'Team',
        user: 'User',
      },
    },
  },
  userList: {
    title: 'Utilisateurs',
    columnTitles: {
      firstname: 'Prénom',
      lastname: 'Nom',
      email: 'Email',
      roles: 'Roles',
    },
  },
  userCreate: {
    title: 'Créer un utilisateur',
  },
  userEdit: {
    title: 'Modifier un utilisateur',
  },
};

export { scenes };
