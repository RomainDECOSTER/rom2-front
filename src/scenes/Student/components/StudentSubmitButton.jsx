import { Button, Grid } from '@material-ui/core';
import { AddCircle, Delete, Edit } from '@material-ui/icons';
import { toast } from 'components';
import { ConfirmDialog } from 'components/ConfirmDialog';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { paths } from 'routes';
import { StudentActioner } from 'services/student';
import { ObjectUtils } from 'tools';

function StudentSubmitButtonComponent({ fields, setFields, mode, initialValues, reload, ...props }) {
  const intl = props.intl.messages.scenes.submitButtons;
  const toastMessages = props.intl.messages.toast;
  const id = initialValues.id;
  const history = useHistory();

  function setLoading(loading = true) {
    setFields(f => ({ ...f, loading }));
  }

  function setError(name) {
    setFields(f => ({ ...f, errors: { ...f.errors, [name]: true } }));
  }

  function onEdit() {
    if (ObjectUtils.compareSimpleObjects(fields, initialValues)) {
      return toast.info(toastMessages.info.noFieldChanged);
    }
    setLoading(true);

    StudentActioner.update(id, fields)
      .then(() => {
        setLoading(false);
        reload();
      })
      .catch(() => {
        setLoading(false);
      });
  }

  function onCreate() {
    if (fields.name === '') {
      return setError('name');
    }

    if (fields.campaign === '') {
      return setError('campaign');
    }

    setLoading(true);
    StudentActioner.create(fields)
      .then(() => {
        setLoading(false);
        history.push(paths.front.student.home);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  function onDelete() {
    setLoading(true);
    StudentActioner.delete(id)
      .then(() => {
        setLoading(false);
        history.push(paths.front.student.home);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <Grid justify="space-evenly" container>
      <Button
        variant="contained"
        color="primary"
        startIcon={mode === 'edit' ? <Edit /> : <AddCircle />}
        onClick={mode === 'edit' ? onEdit : onCreate}
        disabled={fields.loading}
      >
        {intl.save}
      </Button>
      {mode === 'edit' && (
        <ConfirmDialog
          onConfirm={onDelete}
          button={({ onClick }) => (
            <Button
              className="bosch-sensor-edit-button"
              variant="contained"
              color="primary"
              startIcon={<Delete />}
              onClick={onClick}
              disabled={fields.loading}
            >
              {intl.delete}
            </Button>
          )}
        />
      )}
    </Grid>
  );
}

const StudentSubmitButton = injectIntl(StudentSubmitButtonComponent);

export { StudentSubmitButton };
