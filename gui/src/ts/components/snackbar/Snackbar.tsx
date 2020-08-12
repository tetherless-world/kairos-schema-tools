import {IconButton, Snackbar as MuiSnackbar} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import * as React from "react";

export const Snackbar: React.FunctionComponent<{
  message: React.ReactNode | null;
  onClose: () => void;
}> = ({message, onClose}) => (
  <MuiSnackbar
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    open={message != null}
    autoHideDuration={2000}
    onClose={onClose}
    message={message}
    action={
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    }
  />
);
