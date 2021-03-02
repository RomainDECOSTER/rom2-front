import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

function ConfirmDialogComponent(props) {
  const [open, setOpen] = useState(false);
  const { button: OpenButton, children, onConfirm } = props;
  const intl = props.intl.messages.components.confirmDialog;

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  return (
    <>
      <OpenButton onClick={openDialog} />
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>{intl.title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            {intl.close}
          </Button>
          <Button
            onClick={() => {
              closeDialog();
              onConfirm();
            }}
            color="primary"
            autoFocus
          >
            {intl.confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const ConfirmDialog = injectIntl(ConfirmDialogComponent);

export { ConfirmDialog };
