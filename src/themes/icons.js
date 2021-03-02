import React from 'react';
import clsx from 'clsx';
import Icon from '@mdi/react';
import {
  mdiAccountEdit,
  mdiAccountDetails,
  mdiMapMarkerMultiple,
  mdiMapMarkerPlus,
  mdiSelectMultipleMarker,
  mdiMapMarkerDistance,
  mdiViewGridPlus,
  mdiPencilBoxMultiple,
  mdiMapMarkerPath,
  mdiSelectionMarker,
  mdiSelectMultiple,
  mdiSelectDrag,
  mdiPlusCircleMultiple,
  mdiSignDirectionPlus,
  mdiRoutes,
  mdiTextBoxPlus,
  mdiFileDocumentEdit,
  mdiTextBoxMultiple,
  mdiAccessPoint,
  mdiHandshake,
  mdiAccessPointNetwork,
  mdiCircleMultiple,
  mdiFormatListBulletedSquare,
  mdiEyeCircle,
  mdiVideoBox,
  mdiCctv,
  mdiSelect,
  mdiNetwork,
  mdiTextBox,
  mdiTextBoxOutline,
  mdiTextBoxMultipleOutline,
  mdiTextBoxPlusOutline,
  mdiLan,
  mdiPlusNetwork,
  mdiSignCaution,
  mdiMonitorEye,
  mdiSignRealEstate,
  mdiPencilRuler,
  mdiChessKing,
  mdiRouter,
  mdiLanConnect,
  mdiBoomGate,
  mdiConsolidate,
  mdiDotsHexagon,
  mdiArrowAll,
} from '@mdi/js';

function icon(mdiIcon) {
  return props => <Icon path={mdiIcon} className={clsx('MuiSvgIcon-root', props.className)} />;
}

const AccountEdit = icon(mdiAccountEdit);
const AccountDetails = icon(mdiAccountDetails);
const MapMarkerMultiple = icon(mdiMapMarkerMultiple);
const MapMarkerPlus = icon(mdiMapMarkerPlus);
const SelectMultipleMarker = icon(mdiSelectMultipleMarker);
const MapMarkerDistance = icon(mdiMapMarkerDistance);
const GridPlus = icon(mdiViewGridPlus);
const PencilBoxMultiple = icon(mdiPencilBoxMultiple);
const MapMarkerPath = icon(mdiMapMarkerPath);
const SelectionMarker = icon(mdiSelectionMarker);
const SelectMultiple = icon(mdiSelectMultiple);
const SelectDrag = icon(mdiSelectDrag);
const PlusCircleMultiple = icon(mdiPlusCircleMultiple);
const SignDirectionPlus = icon(mdiSignDirectionPlus);
const Routes = icon(mdiRoutes);
const TextBoxPlus = icon(mdiTextBoxPlus);
const FileDocumentEdit = icon(mdiFileDocumentEdit);
const TextBoxMultiple = icon(mdiTextBoxMultiple);
const AccessPoint = icon(mdiAccessPoint);
const Handshake = icon(mdiHandshake);
const AccessPointNetwork = icon(mdiAccessPointNetwork);
const CircleMultiple = icon(mdiCircleMultiple);
const FormatListBulletedSquare = icon(mdiFormatListBulletedSquare);
const EyeCircle = icon(mdiEyeCircle);
const VideoBox = icon(mdiVideoBox);
const Cctv = icon(mdiCctv);
const Select = icon(mdiSelect);
const Network = icon(mdiNetwork);
const TextBox = icon(mdiTextBox);
const TextBoxOutline = icon(mdiTextBoxOutline);
const TextBoxMultipleOutline = icon(mdiTextBoxMultipleOutline);
const TextBoxPlusOutline = icon(mdiTextBoxPlusOutline);
const Lan = icon(mdiLan);
const PlusNetwork = icon(mdiPlusNetwork);
const SignCaution = icon(mdiSignCaution);
const MonitorEye = icon(mdiMonitorEye);
const DisplayList = icon(mdiSignRealEstate);
const DisplayRules = icon(mdiPencilRuler);
const Coordinator = icon(mdiChessKing);
const Router = icon(mdiRouter);
const Mtxtitan = icon(mdiLanConnect);
const Gate = icon(mdiBoomGate);
const SensysGateway = icon(mdiConsolidate);
const SensysSensor = icon(mdiDotsHexagon);
const Sensys = icon(mdiArrowAll);

export {
  AccountEdit,
  AccountDetails,
  MapMarkerMultiple,
  MapMarkerPlus,
  SelectMultipleMarker,
  MapMarkerDistance,
  GridPlus,
  PencilBoxMultiple,
  MapMarkerPath,
  SelectionMarker,
  SelectMultiple,
  SelectDrag,
  PlusCircleMultiple,
  SignDirectionPlus,
  Routes,
  TextBoxPlus,
  FileDocumentEdit,
  TextBoxMultiple,
  AccessPoint,
  Handshake,
  AccessPointNetwork,
  CircleMultiple,
  FormatListBulletedSquare,
  EyeCircle,
  VideoBox,
  Cctv,
  Select,
  Network,
  TextBox,
  TextBoxOutline,
  TextBoxMultipleOutline,
  TextBoxPlusOutline,
  Lan,
  PlusNetwork,
  SignCaution,
  MonitorEye,
  DisplayList,
  DisplayRules,
  Coordinator,
  Router,
  Mtxtitan,
  Gate,
  SensysGateway,
  SensysSensor,
  Sensys,
};
