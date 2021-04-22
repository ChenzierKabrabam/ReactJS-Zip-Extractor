import { Button, Typography } from '@material-ui/core'
import React from 'react'
import { entries, download, blobURL } from './content'
import * as BiIcons from 'react-icons/bi'

const Output = (props) => {
  const downloadFile = async (event) => {
    const target = event.target

    if (
      target.dataset.entryIndex !== undefined &&
      !target.download &&
      !target.getAttribute('href')
    ) {
      event.preventDefault()

      try {
        await download(
          entries[Number(target.dataset.entryIndex)],
          target.parentElement,
          target
        )
      } catch (e) {
        alert(e)
      }
    }
  }

  const downloadAll = () => {
    const anchor = document.createElement('a')
    for (let i = 0; i < entries.length; i++) {
      const download = entries[i]
      if (download.directory === false) {
        anchor.setAttribute('href', blobURL)
        anchor.setAttribute('download', download.filename)
        anchor.click()
      }
    }
  }

  return (
    <div
      onClick={downloadFile}
      style={{ width: '100%', alignItem: 'flex-start', paddingLeft: '28px' }}
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
          onClick={downloadAll}
        >
          download all
        </Button>
      </Typography>
      <ul ref={props.refFile} className={(props.ulStyle, 'empty')}></ul>
      <Button
        variant='contained'
        href='/'
        style={{ background: 'grey', color: '#ffffff' }}
        startIcon={<BiIcons.BiArrowBack />}
      >
        <Typography
          style={{
            textTransform: 'none',
            textDecoration: 'none',
            color: '#ffffff',
          }}
        >
          Extract another archieve
        </Typography>
      </Button>
    </div>
  )
}

export default Output
