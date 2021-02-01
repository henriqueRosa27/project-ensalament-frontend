import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  variantSuccess: {
    backgroundColor: '#43a047 !important',
    color: '#fff !important',
    borderRadius: 5,
  },
  variantError: { backgroundColor: 'blue !important' },
  variantWarning: { backgroundColor: 'green !important' },
  variantInfo: { backgroundColor: 'yellow !important' },
}));
