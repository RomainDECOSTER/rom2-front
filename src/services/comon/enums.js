import { ArrayToSelector } from 'tools/arrayToSelector';

const ComonEnums = {
  getKnowLacleArray: () => {
    const kwonLacleList = [
      'BAO (pour bouche à oreille)',
      'établissement scolaire',
      'mairie',
      'référent RSA',
      'internet',
      'AS',
      'DRE',
      'éducateur',
      'CCAS',
      'Pôle emploi',
      'Cimade',
      'Presse',
      'France Bénévolat',
      'Partenaire',
      'Employeur',
      'autre',
      '',
    ];
    return ArrayToSelector.getEnums(kwonLacleList);
  },
  getDistrictArray: () => {
    let districtList = [
      'Bois Blancs',
      'Centre',
      'Faubourg de Béthune',
      'Fives',
      'Hellemmes',
      'Lille Sud',
      'Lomme',
      'Moulins',
      'Saint Maurice-Pellevoisin',
      'Vauban Esquermes',
      'Vieux Lille',
      'Wazemmes',
      'Autres',
      '',
    ];
    return ArrayToSelector.getEnums(districtList);
  },
  getGenderArray: () => {
    const genders = [
      { value: 'F', label: 'Femme' },
      { value: 'M', label: 'Homme' },
      { value: '', label: ' ' },
    ];
    return genders;
  },
  getSchoolPathArray: () => {
    const schoolPathList = ['Brevet', 'Bac', 'Bac+1', 'Bac+2', 'Bac+3', 'Bac+4', 'Bac+5', 'Bac+8', ''];
    return ArrayToSelector.getEnums(schoolPathList);
  },
};

export { ComonEnums };
