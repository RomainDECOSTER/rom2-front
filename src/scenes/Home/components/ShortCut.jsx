import { AccessibilityNew, AccountCircle, AddCircle, CalendarViewDay, HomeWork, School } from '@material-ui/icons';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { paths } from 'routes';
import './ShortCut.scss';

function ShortCutComponent(props) {
  const intl = props.intl.messages.scenes;
  const history = useHistory();

  function onEdit() {
    history.push(paths.front.volunteer.home);
  }

  return (
    <div className="cards">
      <div className="card" onClick={() => history.push(paths.front.student.create)}>
        <div className="card-img">
          <div className="circle"></div>
          <AddCircle className="add" fontSize="inherit" color="inherit" />
          <School className="icon" fontSize="inherit" color="inherit" />
        </div>
        <div className="card-text">
          <h3>Ajouter un apprenant</h3>
        </div>
      </div>
      <div className="card" onClick={() => history.push(paths.front.volunteer.create)}>
        <div className="card-img">
          <div className="circle"></div>
          <AddCircle className="add" fontSize="inherit" color="inherit" />
          <AccessibilityNew className="icon" fontSize="inherit" color="inherit" />
        </div>
        <div className="card-text">
          <h3>Ajouter un bénévole</h3>
        </div>
      </div>
      <div className="card" onClick={() => history.push(paths.front.user.create)}>
        <div className="card-img">
          <div className="circle"></div>
          <AddCircle className="add" fontSize="inherit" color="inherit" />
          <AccountCircle className="icon" fontSize="inherit" color="inherit" />
        </div>
        <div className="card-text">
          <h3>Ajouter un utilisateur</h3>
        </div>
      </div>
      <div className="card" onClick={() => history.push(paths.front.workshop.create)}>
        <div className="card-img">
          <div className="circle"></div>
          <AddCircle className="add" fontSize="inherit" color="inherit" />
          <HomeWork className="icon" fontSize="inherit" color="inherit" />
        </div>
        <div className="card-text">
          <h3>Ajouter un atelier</h3>
        </div>
      </div>
      <div className="card" onClick={() => history.push(paths.front.campaign.create)}>
        <div className="card-img">
          <div className="circle"></div>
          <AddCircle className="add" fontSize="inherit" color="inherit" />
          <CalendarViewDay className="icon" fontSize="inherit" color="inherit" />
        </div>
        <div className="card-text">
          <h3>Ajouter une campagne</h3>
        </div>
      </div>
    </div>
  );
}

const ShortCut = injectIntl(ShortCutComponent);

export { ShortCut };
