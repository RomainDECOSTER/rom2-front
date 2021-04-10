import { IconButton, Paper, Typography } from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';
import { ConfirmDialog } from 'components/ConfirmDialog';
import { Selector } from 'components/Selector';
import { Table } from 'components/Table';
import moment from 'moment';
import React from 'react';
import { injectIntl } from 'react-intl';
import { ArrayUtils } from 'tools';
import { AddSubjects } from './components';

const subjects = [
  { value: 'francais', label: 'Français' },
  { value: 'francaislvl2', label: 'Français Langue de Scolarisation' },
  { value: 'math', label: 'Mathématiques' },
  { value: 'anglais', label: 'Anglais' },
  { value: 'svt', label: 'SVT' },
  { value: 'physique', label: 'Sciences Physiques' },
  { value: 'philosophie', label: 'Philosophie' },
  { value: 'ses', label: 'S.E.S' },
  { value: 'lecture_ecriture_calcul', label: 'Lecture Ecriture Calcul' },
  { value: 'allemand', label: 'Allemand' },
  { value: 'espagnol', label: 'Espagnol' },
  { value: 'histoire', label: 'Histoire Géographie' },
];
const type_level = [
  { value: '', label: '' },
  { value: 'Primaire', label: 'Primaire' },
  { value: 'College', label: 'College' },
  { value: 'Lycee', label: 'Lycee' },
];

const types = [
  { value: '', label: '' },
  { value: 'Enfant', label: 'Enfant' },
  { value: 'Ado', label: 'Ado' },
  { value: 'Adulte', label: 'Adulte' },
];

function SubjectFormComponent({ data, setData, disabled, ...props }) {
  const intl = props.intl.messages.components.subjects;
  const labels = intl.labels;

  function setSubjectsFields(index, field) {
    return value => {
      const newSubjects = ArrayUtils.copyJsonObjectArray(data);
      newSubjects[index][field] = value;
      setData(newSubjects);
    };
  }

  function deleteSubjects(index) {
    return () => {
      const newSubjects = ArrayUtils.copyJsonObjectArray(data);
      newSubjects.splice(index, 1);
      setData(newSubjects);
    };
  }

  function addSubjects(newData) {
    let newSubjects = ArrayUtils.copyJsonObjectArray(data);
    newSubjects = newSubjects.concat(newData);
    setData(newSubjects);
  }

  const weekDay = moment.weekdays(true).map(day => {
    return {
      label: day,
      value: day,
    };
  });
  weekDay.push({
    label: 'tous les jours',
    value: 'ALL_DAY',
  });

  const columns = [
    {
      id: 'name',
      align: 'center',
      label: labels.name,
      render: (row, index) => (
        <Selector
          selected={row.name}
          setSelected={setSubjectsFields(index, 'name')}
          items={subjects}
          disabled={disabled}
        />
      ),
    },
    {
      id: 'type',
      align: 'center',
      label: labels.type,
      render: (row, index) => (
        <Selector
          selected={row.type}
          setSelected={setSubjectsFields(index, 'type')}
          items={types}
          disabled={disabled}
        />
      ),
    },
    {
      id: 'level',
      align: 'center',
      label: labels.level,
      render: (row, index) => (
        <Selector
          selected={row.level}
          setSelected={setSubjectsFields(index, 'level')}
          items={type_level}
          disabled={disabled}
        />
      ),
    },
    {
      id: 'delete',
      label: <Delete className="vertical-align-middle" />,
      render: (row, index) => (
        <ConfirmDialog
          onConfirm={deleteSubjects(index)}
          button={({ onClick }) => (
            <IconButton disabled={disabled} onClick={onClick}>
              <Close color={disabled ? 'disabled' : 'error'} />
            </IconButton>
          )}
        ></ConfirmDialog>
      ),
    },
  ];

  return (
    <Paper className="padding-small full-width marginB20">
      <Typography variant="h5" gutterBottom>
        {intl.title}
      </Typography>
      <Table columns={columns} rows={data} />
      <AddSubjects addSubjects={addSubjects} disabled={disabled} />
    </Paper>
  );
}

const SubjectForm = injectIntl(SubjectFormComponent);

export { SubjectForm };
