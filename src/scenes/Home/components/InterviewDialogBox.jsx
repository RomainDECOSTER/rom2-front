import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { AddCircle, Assignment, PlayCircleFilled } from '@material-ui/icons';
import { Selector } from 'components/Selector';
import { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { paths } from 'routes';
import { ComonUtils } from 'services/comon';
import { lacleStore } from 'store';
import { ArrayToSelector } from 'tools/arrayToSelector';
import './ShortCut.scss';

function InterviewDialogBoxComponent(props) {
  const [open, setOpen] = useState(false);
  const [interview, setInterview] = useState({
    type: '',
    interviewed_id: '',
    templates: {},
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const reduxState = lacleStore.getState();
  const id_campaign = reduxState.Campaign.current_campaign;
  const intl = props.intl.messages.scenes.home;
  const history = useHistory();
  const types = [
    { value: 'student', label: 'Apprenant' },
    { value: 'volunteer', label: 'Bénévoles' },
  ];

  function setFieldFunction(name) {
    return value => {
      setInterview(f => ({ ...f, [name]: value }));
    };
  }

  function sendToCreate() {
    if (interview.type !== '' && interview.interviewed_id !== '') {
      history.push({
        pathname: paths.front.interview.create,
        state: interview,
      });
    } else {
      setError(true);
    }
  }

  useEffect(() => {
    if (loading) {
      ComonUtils.getInterviewTemplates(id_campaign).then(templates => {
        setInterview({ ...interview, templates: templates });
        setLoading(false);
      });
    }
    return () => {};
  }, [loading]);

  return (
    <div>
      {!loading ? (
        <div>
          <div className="card" onClick={() => setOpen(true)}>
            <div className="card-img">
              <div className="circle"></div>
              <AddCircle className="add" fontSize="inherit" color="inherit" />
              <Assignment className="icon" fontSize="inherit" color="inherit" />
            </div>
            <div className="card-text">
              <h3>{intl.buttons.interview}</h3>
            </div>
          </div>
          <Dialog disableBackdropClick disableEscapeKeyDown open={open}>
            <DialogTitle>{intl.InterviewDialog.title}</DialogTitle>
            <DialogContent>
              {error ? <h6 className="redText">{intl.InterviewDialog.error}</h6> : null}
              <Selector
                labelId="user"
                label={intl.InterviewDialog.type}
                selected={interview.type}
                setSelected={setFieldFunction('type')}
                items={types}
                disabled={!open}
              />
              {interview.type !== '' ? (
                <Selector
                  labelId="user"
                  label={intl.InterviewDialog.name}
                  selected={interview.interviewed_id}
                  setSelected={setFieldFunction('interviewed_id')}
                  items={
                    interview.type === 'student'
                      ? ArrayToSelector.getGeneralInformationNamesArray(interview.templates.students)
                      : ArrayToSelector.getGeneralInformationNamesArray(interview.templates.volunteers)
                  }
                  disabled={!open}
                />
              ) : null}
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={() => setOpen(false)} disabled={!open}>
                Annuler
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PlayCircleFilled />}
                onClick={sendToCreate}
                disabled={!open}
              >
                Continuer
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : null}
    </div>
  );
}

const InterviewDialogBox = injectIntl(InterviewDialogBoxComponent);

export { InterviewDialogBox };
