import { Button, Grid } from '@material-ui/core';
import { AddCircle, Delete, Edit } from '@material-ui/icons';
import { toast } from 'components';
import { ConfirmDialog } from 'components/ConfirmDialog';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { paths } from 'routes';
import { UserActioner } from 'services/user';

function UserSubmitButtonComponent({ fields, setFields, mode, initialValues, reload, ...props }) {
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

    if (fields.firstname !== initialValues.firstname) {
      if (fields.firstname === '') {
        return setError('firstname');
      }
      fieldsToSend.firstname = fields.firstname;
    }

    if (fields.lastname !== initialValues.lastname) {
      if (fields.lastname === '') {
        return setError('lastname');
      }
      fieldsToSend.lastname = fields.lastname;
    }

    if (fields.email !== initialValues.email) {
      if (fields.email === '') {
        return setError('email');
      }
      fieldsToSend.email = fields.email;
    }

    if (Object.entries(fieldsToSend).length === 0) {
      return toast.info(toastMessages.info.noFieldChanged);
    }
    setLoading(true);

    UserActioner.editUser(id, fieldsToSend)
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

    console.log(fields);

    setLoading(true);
    UserActioner.createNewUser(fields)
      .then(() => {
        setLoading(false);
        history.push(paths.front.user.home);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  function onDelete() {
    setLoading(true);
    UserActioner.delete(id)
      .then(() => {
        setLoading(false);
        history.push(paths.front.user.home);
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

const UserSubmitButton = injectIntl(UserSubmitButtonComponent);

export { UserSubmitButton };
