import { Button, Typography } from '@material-ui/core'
import React from 'react'
import * as BiIcons from 'react-icons/bi'

const Output = (props) => {
  return (
    <>
      <Typography
        component='div'
        style={{ width: '100%', alignItem: 'flex-start', paddingLeft: '18px' }}
      >
        <Typography
          variant='h5'
          style={{
            marginBottom: '10px',
            textTransform: 'bolder',
            fontWeight: '700',
          }}
        >
          Archieve successfully extracted
        </Typography>
        <Typography component='div'>
          <Typography
            variant='h6'
            style={{ marginBottom: '18px', fontWeight: '500' }}
          >
            Click on the file to download
          </Typography>
          <Button
            variant='contained'
            color='primary'
            startIcon={<BiIcons.BiDownload />}
          >
            download
          </Button>
        </Typography>
        <ul ref={props.refFile}></ul>
        <Button
          variant='contained'
          style={{ background: 'grey', color: '#ffffff' }}
          onClick={() => alert('hello')}
          startIcon={<BiIcons.BiArrowBack />}
        >
          <Typography style={{ textTransform: 'none' }}>
            Extract another archieve
          </Typography>
        </Button>
      </Typography>
    </>
  )
}

export default Output
