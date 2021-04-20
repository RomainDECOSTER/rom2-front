import { IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { Selector } from 'components/Selector';
import { Table } from 'components/Table';
import moment from 'moment';
import 'moment/locale/fr';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { ComonEnums } from 'services/comon';
import { VolunteerEnums } from 'services/volunteer';

moment.locale('fr');

const subjects = ComonEnums.getSubjectArray();
const type_level = VolunteerEnums.getLevelArray();
const types = VolunteerEnums.getTypeArray();

function AddSubjectsComponent({ addSubjects, disabled, ...props }) {
  const emptySubject = {
    name: '',
    type: '',
    level: '',
  };
  const [newSubjects, setNewSubjects] = useState(emptySubject);

  const intl = props.intl.messages.components.subjects;
  const labels = intl.labels;

  function setFieldFunction(name) {
    return value => {
      setNewSubjects(a => ({ ...a, [name]: value }));
    };
  }

  function addNewSubjects() {
    addSubjects(newSubjects);
  }

  const columns = [
    {
      id: 'name',
      align: 'center',
      label: labels.name,
      render: row => (
        <Selector
          labelId="name"
          label={intl.labels.name}
          selected={row.name}
          setSelected={setFieldFunction('name')}
          items={subjects}
          disabled={disabled}
        />
      ),
    },
    {
      id: 'type',
      align: 'center',
      label: labels.type,
      render: row => (
        <Selector
          labelId="type"
          label={intl.labels.type}
          selected={row.type}
          setSelected={setFieldFunction('type')}
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
          labelId="level"
          label={intl.labels.level}
          selected={row.level}
          setSelected={setFieldFunction('level')}
          items={type_level}
          disabled={disabled}
        />
      ),
    },
    {
      align: 'center',
      render: () => (
        <IconButton
          disabled={disabled}
          onClick={() => {
            addNewSubjects();
            setNewSubjects(emptySubject);
          }}
        >
          <AddCircle color={disabled ? 'disabled' : 'secondary'} />
        </IconButton>
      ),
    },
  ];

  return <Table hideHeader columns={columns} rows={[newSubjects]} className="overflow-y-hidden" />;
}

const AddSubjects = injectIntl(AddSubjectsComponent);

export { AddSubjects };
