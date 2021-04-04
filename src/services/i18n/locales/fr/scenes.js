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
  campaign: {
    list: {
      title: 'Campagne',
      columnTitles: {
        name: 'Nom',
        description: 'Description',
      },
    },
    create: {
      title: 'Créer une campagne',
    },
    edit: {
      title: 'Modifier une campagne',
      labels: {
        name: 'Nom',
        description: 'Description',
      },
    },
  },
  submitButtons: {
    save: 'Sauvegarder',
    delete: 'Supprimer',
    edit: 'Modifier',
  },
  user: {
    form: {
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
    list: {
      title: 'Utilisateurs',
      columnTitles: {
        firstname: 'Prénom',
        lastname: 'Nom',
        email: 'Email',
        roles: 'Roles',
      },
    },
    create: {
      title: 'Créer un utilisateur',
    },
    edit: {
      title: 'Modifier un utilisateur',
    },
  },
  workshop: {
    form: {
      labels: {
        name: "Nom de l'atelier",
      },
    },
    list: {
      title: 'Ateliers',
      columnTitles: {
        name: "Nom de l'atelier",
      },
    },
    create: {
      title: 'Créer un atelier',
    },
    edit: {
      title: 'Modifier un atelier',
    },
  },
  common: {
    general_information: {
      title: 'Informations Générales',
      labels: {
        last_name: 'Nom',
        first_name: 'Prénom',
        maiden_name: 'Nom de jeune fille',
        gender: 'Sexe',
        birthday: 'Date de naissance',
        birthtown: 'Lieu de naissance',
        origin: 'Origine',
        nationality: 'Nationalité',
        langage: 'Langue première',
        entry_date: "Date d'entrée",
        mobile: 'Numéro de téléphone',
        email: 'Email',
        health_problems: 'Problèmes de santé',
        address: 'Adresse',
        city: 'Ville',
        postal_code: 'Code postal',
        neighbourhood: 'Quartier',
        primary_neighbourhood: 'Quartier prioritaire',
      },
    },
    registration_information: {
      title: "Information d'inscription",
      labels: {
        campaign: 'Campagne',
        date: "Date d'inscription",
        number: 'Nombre',
        fresh: 'Nouveau membre',
        first_date: 'Date de première inscription',
        know_lacle: 'Comment avez-vous connu LACLE ?',
        other_known: 'Autres',
      },
    },
    family_ressources: {
      title: 'Ressources Familiales',
      labels: {
        salary: 'Salarié',
        plain_time: 'Temps Plein',
        middle_time: 'Temps partiel',
        CDD: 'CDD',
        CDI: 'CDI',
        INTERIM: 'INTERIM',
        help: 'Aidé',
        AAH: 'AAH',
        RSA: 'RSA',
        student: 'Etudiant',
        ASSEDIC: 'ASSEDIC',
        ADA: 'ADA',
        AMASE: 'AMASE',
        without_ressources: 'Sans ressources',
        pension: 'Pension',
        other: 'Autre',
        CAFNumber: 'N° CAF',
        instructing_body: 'Orga. instructeur',
        obtention_data: "Date d'obtention",
        other_details: 'Autres détails',
        referent: 'Référent',
        internship: 'Stagiaire',
        parentWork: 'Travail des parents',
      },
    },
    availabilities_information: {
      title: 'Disponibilités',
      labels: {
        day: 'Jour de la semaine',
        start_hour: 'Heure de début',
        end_hour: 'Heure de fin',
      },
    },
  },
  student: {
    type: "Type d'apprenant",
    family_situation: {
      title: 'Situation Familiale',
      labels: {
        alone: 'Seul',
        couple: 'En couple',
        children: 'Avec enfants',
      },
    },
    life_state: {
      title: "Status de l'apprenant",
      labels: {
        salary: 'Salarié',
        plain_time: 'Temps Plein',
        middle_time: 'Temps partiel',
        CDD: 'CDD',
        CDI: 'CDI',
        INTERIM: 'INTERIM',
        help: 'Aidé',
        employment_asker: "Demandeur d'emploi",
        home_children: '',
        country_asker: "Demandeur d'asile",
        home: 'Au foyer',
        AAH: 'AAH',
        ESAT: 'ESAT',
        young_alone: 'Jeune isolé',
        RSA: 'RSA',
        other: 'Autres',
        ESAT_details: 'ESAT détails',
        employment_asker_date: "Date d'inscription à pole emploi",
        other_details: 'Autres détails',
        comment: 'Commentaire',
      },
    },
    social_mediation: {
      title: 'Médiation sociale',
      labels: {
        active: 'Activé',
        details: 'Détails',
      },
    },
    level: {
      title: "Niveau de l'apprenant",
      labels: {
        initial_level: 'Niveau initial',
        final_level: 'Niveau final',
        certification: 'Certification',
        certification_final: 'Certification Obtenue',
        MIFE: 'MIFE',
        level_comment: 'Commentaire',
        school_path: 'Parcours scolaire',
        name: 'Formations',
        comment: 'Commentaire',
      },
    },
    school: {
      title: 'Scolaire',
      labels: {
        level: 'Niveau',
        class_room: 'Classes',
        school_name: "Nom de l'établissement",
        school_comment: "Commentaire sur l'établissement",
        school_path: 'Parcours scolaire',
        subjet: 'Matières',
        comment: "Commentaire sur l'apprenant",
      },
    },
    workshop: {
      title: 'Atelier',
      labels: {
        workshops: 'Ateliers',
        workshopsComment: 'Commentaire sur les Ateliers',
      },
    },
  },
  studentList: {
    title: 'Apprenants',
    columnTitles: {
      last_name: 'Nom',
      first_name: 'Prénom',
      mobile: 'Téléphone',
      email: 'Email',
    },
  },
  studentCreate: {
    title: 'Ajouter un apprenant',
  },
  studentEdit: {
    title: 'Modifier un apprenant',
  },
  studentProfil: {
    title: "Profil d'un apprenant",
  },
};

export { scenes };
