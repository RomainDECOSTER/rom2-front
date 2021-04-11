import { ArrayToSelector } from 'tools/arrayToSelector';

const StudentEnums = {
  getTypeArray: () => {
    const types = [
      { value: 'AS', label: 'AS' },
      { value: 'FLE', label: 'FLE' },
      { value: 'MSB', label: 'MSB' },
      { value: 'AA', label: 'AA' },
      { value: '', label: ' ' },
    ];
    return types;
  },
  getCertificationsArray: type => {
    let certification = [
      {
        key: 'TCF',
        label: 'TCF',
        value: 'TCF',
      },
      {
        key: 'CFG',
        label: 'CFG',
        value: 'CFG',
      },
      {
        label: '',
        value: '',
      },
    ];
    if (type === 'MSB' || type === 'FLE' || type === 'AA') {
      certification.push(
        {
          label: 'DILF',
          value: 'DILF',
        },
        {
          label: 'DELF',
          value: 'DELF',
        },
        {
          label: 'TCF',
          value: 'TCF',
        },
        {
          label: 'CFG',
          value: 'CFG',
        },
        {
          label: 'A1',
          value: 'A1',
        },
        {
          label: 'A2',
          value: 'A2',
        },
        {
          label: 'B1',
          value: 'B1',
        },
        {
          label: 'B2',
          value: 'B2',
        },
      );
    }
    return certification;
  },
  getMIFEArray: type => {
    let mifeLevel = [
      {
        label: 'V bis',
        value: 'V bis',
      },
      {
        label: 'V',
        value: 'V',
      },
      {
        label: 'VI',
        value: 'VI',
      },
      {
        label: 'VI bis',
        value: 'VI bis',
      },
      {
        label: 'VII',
        value: 'VII',
      },
      {
        label: 'VII bis',
        value: 'VII bis',
      },
    ];
    if (type === 'AA') {
      mifeLevel.push({
        label: 'V',
        value: 'V',
      });
    }
    if (type === 'FLE') {
      mifeLevel.push(
        {
          label: 'I',
          value: 'I',
        },
        {
          label: 'II',
          value: 'II',
        },
        {
          label: 'III',
          value: 'III',
        },
        {
          label: 'IV',
          value: 'IV',
        },
      );
    }
    mifeLevel.push({
      label: '',
      value: '',
    });
    return mifeLevel;
  },
  getLevelArray: () => {
    const level = [
      {
        label: 'A1.1',
        value: 'A1.1',
      },
      {
        label: 'A1',
        value: 'A1',
      },
      {
        label: 'A2',
        value: 'A2',
      },
      {
        label: 'B1',
        value: 'B1',
      },
      {
        label: 'B2',
        value: 'B2',
      },
      {
        label: 'C1',
        value: 'C1',
      },
      {
        label: 'C2',
        value: 'C2',
      },
      {
        label: 'RAN',
        value: 'RAN',
      },
    ];
    for (let index = 0; index < 4; index++) {
      level.push({
        label: `ET${index + 1}`,
        value: `ET${index + 1}`,
      });
    }
    level.push({
      label: '',
      value: '',
    });
    return level;
  },
  getClassLevelArray: () => {
    const classLevelList = ['primaire', 'collège', 'lycée', ''];
    return ArrayToSelector.getEnums(classLevelList);
  },
  getFirstClassRoomArray: () => {
    const firstClassRoomList = ['grande section', 'CP', 'CE1', 'CE2', 'CM1', 'CM2', 'ULIS', ''];
    return ArrayToSelector.getEnums(firstClassRoomList);
  },
  getSecondClassRoomArray: () => {
    const secondClassRoomList = ['6ème', '5ème', '4ème', '3ème', 'SEGPA', 'ULIS'];
    return ArrayToSelector.getEnums(secondClassRoomList);
  },
  getThirdClassRoomArray: () => {
    const thirdClassRoomList = ['2nde', '1ère', 'terminale', 'pro'];
    return ArrayToSelector.getEnums(thirdClassRoomList);
  },
  getSubjectArray: () => {
    const subjectList = [
      'Français',
      'Français Langue de Scolarisation',
      'Mathématiques',
      'Anglais',
      'SVT',
      'Sciences Physiques',
      'Philosophie',
      'S.E.S',
      'lecture-écriture-calcul',
      'Allemand',
      'Espagnol',
      'Histoire géographie',
      '',
    ];
    return ArrayToSelector.getEnums(subjectList);
  },
  getOptionsArray: () => {
    const optionsList = [
      'Arts',
      'Écologie, agronomie et territoires',
      'Histoire géographie, géopolitique et sciences politiques',
      'Humanités, littérature et philosophie',
      'Langues et littératures étrangères',
      'Mathématiques',
      'Numérique et sciences informatiques',
      'SVT (sciences de la vie et de la terre)',
      'Sciences de l’ingénieur',
      'Sciences économiques et sociales',
      'Physique chimie',
      'Arts',
      'LCA (langues et culture de l’antiquité)',
      'EPS (éducation physique et sportive)',
      'LV3 (langue vivante 3)',
      'Mathématiques expertes (en terminale)',
      'Mathématiques complémentaires en terminale)',
      'Droit et grands enjeux dans le monde contemporain (en terminale)',
      '',
    ];
    return ArrayToSelector.getEnums(optionsList);
  },
};

export { StudentEnums };
