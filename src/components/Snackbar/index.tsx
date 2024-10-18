import Snackbar from '@mui/material/Snackbar';
import { SnackbarProps } from './types';

const SnackBar = (props: SnackbarProps) => {
  const { message, vertical = 'bottom', horizontal = 'right', open } = props;
  return <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} message={message} />;
};

export default SnackBar;
