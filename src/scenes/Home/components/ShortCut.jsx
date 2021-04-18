import { AccessibilityNew, AccountCircle, AddCircle, HomeWork, School } from '@material-ui/icons';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { paths } from 'routes';
import { InterviewDialogBox } from './InterviewDialogBox';
import './ShortCut.scss';

function ShortCutComponent(props) {
  const intl = props.intl.messages.scenes.home;
  const history = useHistory();

  return (
    <div className="cards">
      <div className="card" onClick={() => history.push(paths.front.student.create)}>
        <div className="card-img">
          <div className="circle"></div>
          <AddCircle className="add" fontSize="inherit" color="inherit" />
          <School className="icon" fontSize="inherit" color="inherit" />
        </div>
        <div className="card-text">
          <h3>{intl.buttons.student}</h3>
        </div>
      </div>
      <div className="card" onClick={() => history.push(paths.front.volunteer.create)}>
        <div className="card-img">
          <div className="circle"></div>
          <AddCircle className="add" fontSize="inherit" color="inherit" />
          <AccessibilityNew className="icon" fontSize="inherit" color="inherit" />
        </div>
        <div className="card-text">
          <h3>{intl.buttons.volunteer}</h3>
        </div>
      </div>
      <InterviewDialogBox />
      <div className="card" onClick={() => history.push(paths.front.user.create)}>
        <div className="card-img">
          <div className="circle"></div>
          <AddCircle className="add" fontSize="inherit" color="inherit" />
          <AccountCircle className="icon" fontSize="inherit" color="inherit" />
        </div>
        <div className="card-text">
          <h3>{intl.buttons.user}</h3>
        </div>
      </div>
      <div className="card" onClick={() => history.push(paths.front.workshop.create)}>
        <div className="card-img">
          <div className="circle"></div>
          <AddCircle className="add" fontSize="inherit" color="inherit" />
          <HomeWork className="icon" fontSize="inherit" color="inherit" />
        </div>
        <div className="card-text">
          <h3>{intl.buttons.workshop}</h3>
        </div>
      </div>
    </div>
  );
}

const ShortCut = injectIntl(ShortCutComponent);

export { ShortCut };
