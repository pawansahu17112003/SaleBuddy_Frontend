import makeStyles from '@mui/styles/makeStyles';
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: '90%',
    height: 'auto',
    justifyContent: 'center',
    marginTop: 70

  },
  box: {
    width: '40vw',
    height: 'auto',
    border: '2px solid #38ada9',
    borderRadius: 6,
    padding: 0

  },
  title: {
    width: '100%',
    background: '#38ada9',
    height: 70,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo_style: {
    maxWidth: 200,
    height: 60,
    objectFit: 'cover',
  },
  report_style: {
    maxWidth: 100,
    height: 60,
    objectFit: 'cover',
  },
  title_style: {
    fontSize: 22,
    color: '#ffff',
    fontWeight: 'bold'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button_style: {
    width: 200,
    background: '#3498db',
  },
  image_style: {
    maxWidth: 100,
    height: 60,
    objectFit: 'cover',
    borderRadius: 10    
  },
  helperTextStyle:{
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
    textAlign: 'left',
    marginTop: '3px',
    color:'#d32f2f'
    }
}));
export { useStyles }