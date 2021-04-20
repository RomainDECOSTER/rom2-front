import { ArrayToSelector } from 'tools/arrayToSelector';

const VolunteerEnums = {
  getTypeArray: () => {
    const type = [
      {
        key: 'Enfant',
        label: 'Enfant',
        value: 'Enfant',
      },
      {
        key: 'Ado',
        label: 'Ado',
        value: 'Ado',
      },
      {
        key: 'Adulte',
        label: 'Adulte',
        value: 'Adulte',
      },
    ];
    return type;
  },
  getLevelArray: () => {
    const level = [
      {
        key: 'Primaire',
        label: 'Primaire',
        value: 'Primaire',
      },
      {
        key: 'Collège',
        label: 'Collège',
        value: 'Collège',
      },
      {
        key: 'Lycée',
        label: 'Lycée',
        value: 'Lycée',
      },
    ];
    return level;
  },
  getAdultLevelArray: () => {
    const adultLevel = [
      {
        key: 'Grand Débutant',
        text: 'Grand Débutant',
        value: 'Grand Débutant',
      },
      {
        key: 'Débutant',
        text: 'Débutant',
        value: 'Débutant',
      },
      {
        key: 'Faux Débutant',
        text: 'Faux Débutant',
        value: 'Faux Débutant',
      },
      {
        key: 'Intermédiare',
        text: 'Intermédiare',
        value: 'Intermédiare',
      },
      {
        key: 'Avancé',
        text: 'Avancé',
        value: 'Avancé',
      },
    ];
    return adultLevel;
  },
  getOtherInterventionArray: () => {
    const otherInterventionList = ['LACLE', 'DRE', 'ROUBAIX', 'LILLE SUD', 'AUTRE', ''];
    return ArrayToSelector.getEnums(otherInterventionList);
  },
};

export { VolunteerEnums };
