import React from 'react'
import { Button, Typography } from '@material-ui/core'

const DefaultButton = (props) => {
  return (
    <>
      <Button
        variant='contained'
        color='primary'
        style={{ width: '250px', paddingTop: '15px', paddingBottom: '20px' }}
        ref={props.fileInputButtons}
        onClick={props.onHandleButtonOnClick}
      >
        <Typography
          variant='subtitle1'
          component='div'
          style={{ textTransform: 'lowercase' }}
        >
          <Typography
            variant='h5'
            className={props.textDeco}
            style={{ margin: '6px auto', fontWeight: 'bold' }}
          >
            Choose file
          </Typography>
          from your computer
        </Typography>
      </Button>
      <input
        type='file'
        accept='application/zip'
        ref={props.fileInput}
        onChange={props.onHandleOnChange}
        hidden
      />
    </>
  )
}

export default DefaultButton
