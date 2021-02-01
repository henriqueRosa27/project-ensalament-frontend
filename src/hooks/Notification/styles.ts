import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  variantSuccess: {
    backgroundColor: '#00c936 !important',
    color: '#fff !important',
    borderRadius: 5,
  },
  variantError: {
    bbackgroundColor: '#f23835 !important',
    color: '#fff !important',
    borderRadius: 5,
  },
  variantWarning: { backgroundColor: 'green !important' },
  variantInfo: { backgroundColor: 'yellow !important' },
}));
