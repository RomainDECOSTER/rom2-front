import { Button, Grid } from '@material-ui/core';
import { AddCircle, Delete, Edit } from '@material-ui/icons';
import { toast } from 'components';
import { ConfirmDialog } from 'components/ConfirmDialog';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { paths } from 'routes';
import { CampaignActioner } from 'services/campaign';

function CampaignSubmitButtonComponent({ fields, setFields, mode, initialValues, reload, ...props }) {
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

    if (fields.description !== initialValues.description) {
      fieldsToSend.description = fields.description;
    }

    if (Object.entries(fieldsToSend).length === 0) {
      return toast.info(toastMessages.info.noFieldChanged);
    }
    setLoading(true);

    CampaignActioner.update(id, fieldsToSend)
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
    CampaignActioner.create(fields)
      .then(() => {
        setLoading(false);
        history.push(paths.front.campaign.home);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  function onDelete() {
    setLoading(true);
    CampaignActioner.delete(id)
      .then(() => {
        setLoading(false);
        history.push(paths.front.campaign.home);
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

const CampaignSubmitButton = injectIntl(CampaignSubmitButtonComponent);

export { CampaignSubmitButton };
