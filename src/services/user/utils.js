import { HourglassEmpty, Check, Block } from '@material-ui/icons';

import { lacleStore } from 'store';
import { ArrayUtils } from 'tools';

const UserUtils = {
  getFullName: userState => {
    if (!userState) return '';
    const firstname = userState.firstname ? userState.firstname : '';
    const lastname = userState.lastname ? userState.lastname : '';
    return `${firstname} ${lastname}`;
  },

  comparePermissions: (a, b) => {
    return ArrayUtils.compareArrays(a, b);
  },

  getUserStatuses: () => {
    const statusLabels = lacleStore.getState().I18n.messages.services.users.statuses;
    return {
      pending: { color: 'blue', icon: HourglassEmpty, label: statusLabels.pending },
      active: { color: 'green', icon: Check, label: statusLabels.active },
      blocked: { color: 'red', icon: Block, label: statusLabels.blocked },
    };
  },
};

export { UserUtils };
