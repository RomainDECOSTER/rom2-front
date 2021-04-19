import { Button, Grid } from '@material-ui/core';
import { AddCircle, Delete, Edit } from '@material-ui/icons';
import { toast } from 'components';
import { ConfirmDialog } from 'components/ConfirmDialog';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { paths } from 'routes';
import { WorkshopActioner } from 'services/workshop';

function WorkshopSubmitButtonComponent({ fields, setFields, mode, initialValues, reload, ...props }) {
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
    const fieldsToSend = {};

    if (fields.name !== initialValues.name) {
      if (fields.name === '') {
        return setError('name');
      }
      fieldsToSend.name = fields.name;
    }

    if (Object.entries(fieldsToSend).length === 0) {
      return toast.info(toastMessages.info.noFieldChanged);
    }
    setLoading(true);

    WorkshopActioner.update(id, fieldsToSend)
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

    setLoading(true);
    WorkshopActioner.create(fields)
      .then(() => {
        setLoading(false);
        history.push(paths.front.workshop.home);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  function onDelete() {
    setLoading(true);
    WorkshopActioner.delete(id)
      .then(() => {
        setLoading(false);
        history.push(paths.front.workshop.home);
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

const WorkshopSubmitButton = injectIntl(WorkshopSubmitButtonComponent);

export { WorkshopSubmitButton };
