import React from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core'
import * as AiIcons from 'react-icons/ai'
import * as DiIcons from 'react-icons/di'

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '18px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      padding: '0 30px',
    },
  },
}))
const UrlButton = (props) => {
  const classses = useStyle()

  const alertBox = () => {
    alert('not yet implement the function')
  }
  return (
    <>
      <div className={classses.root}>
        <Button startIcon={<DiIcons.DiGoogleDrive />} onClick={alertBox}>
          <Typography variant='button' className={props.styles}>
            from Google Drive
          </Typography>
        </Button>
        <Button startIcon={<AiIcons.AiOutlineDropbox />} onClick={alertBox}>
          <Typography variant='button' className={props.styles}>
            from Dropbox
          </Typography>
        </Button>
        <Button startIcon={<AiIcons.AiOutlineLink />} onClick={alertBox}>
          <Typography variant='button'>url</Typography>
        </Button>
      </div>
      {/* <ul ref={props.title} className='empty'></ul> */}
    </>
  )
}
export default UrlButton
