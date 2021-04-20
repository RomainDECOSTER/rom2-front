import { IconButton, Paper, Typography } from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';
import { ConfirmDialog } from 'components/ConfirmDialog';
import { Selector } from 'components/Selector';
import { Table } from 'components/Table';
import React from 'react';
import { injectIntl } from 'react-intl';
import { ComonEnums } from 'services/comon';
import { VolunteerEnums } from 'services/volunteer';
import { ArrayUtils } from 'tools';
import { AddSubjects } from './components';

const subjects = ComonEnums.getSubjectArray();
const type_level = VolunteerEnums.getLevelArray();
const types = VolunteerEnums.getTypeArray();

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
