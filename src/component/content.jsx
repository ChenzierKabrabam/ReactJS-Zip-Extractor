import React, { useState, useRef } from 'react'
import { makeStyles, Paper } from '@material-ui/core'
import { model } from '../zip/zip'
import UrlButton from './url_button'
import DefaultButton from './default_button'
// import * as BiIcons from 'react-icons/bi'
import Output from './output'
// import * as BiIcons from 'react-icons/bi'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 390,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
    paddingTop: '50px',
    paddingBottom: '50px',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 630,
    },
  },
  textTransform: {
    textTransform: 'none',
  },
}))

let selectedFile, entries

export const downloadFile = async (event) => {
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
        target.parentNode,
        target
      )
    } catch (error) {
      // alert(error)
      console.log(error)
    }
  }
}
const download = async (entry, li, a) => {
  const unzipProgress = document.createElement('progress')
  li.appendChild(unzipProgress)
  const blobURL = await model.getURL(entry, {
    onprogress: (index, max) => {
      unzipProgress.value = index
      unzipProgress.max = max
    },
  })
  const clickEvent = new MouseEvent('click')
  unzipProgress.remove()
  unzipProgress.value = 0
  unzipProgress.max = 0
  a.href = blobURL
  a.download = entry.filename
  a.dispatchEvent(clickEvent)
}

const Content = () => {
  const classes = useStyles()
  const fileInput = useRef(null)
  const fileInputButton = useRef(false)
  const [hide, setHide] = useState(false)
  let fileList = useRef(false)
  /*
   * functionality for button:
   */

  const handleButtonOnclick = () => {
    fileInput.current.dispatchEvent(new MouseEvent('click'))
  }

  const selectFile = async () => {
    try {
      selectedFile = fileInput.current.files[0]
      /* hiding all the button when input is full */
      setHide(true)
      await loadFile()
    } catch (error) {
      alert(error)
      console.log(error)
    }
  }

  const loadFile = async () => {
    entries = await model.getEntries(selectedFile)
    if (entries && entries.length) {
      fileList.current.classList.remove('empty')
    }
    refresh()
    // const newFileList = fileList.current.cloneNode()
    // entries.forEach((entry, entryIndex) => {
    //   const li = document.createElement('li')
    //   const anchor = document.createElement('a')
    //   anchor.dataset.entryIndex = entryIndex
    //   anchor.textContent = anchor.title = entry.filename
    //   anchor.title = `${entry.filename}`
    //   if (!entry.directory) {
    //     anchor.href = ''
    //   }
    //   li.appendChild(anchor)
    //   newFileList.appendChild(li)
    // })
    // fileList.current.replaceWith(newFileList)
    // fileList = newFileList
  }

  const refresh = () => {
    const newFileList = fileList.current.cloneNode()
    entries.forEach((entry, entryIndex) => {
      const li = document.createElement('li')
      const anchor = document.createElement('a')
      anchor.dataset.entryIndex = entryIndex
      anchor.textContent = anchor.title = entry.filename
      anchor.title = `${entry.filename}`
      if (!entry.directory) {
        anchor.href = ''
      }
      li.appendChild(anchor)
      newFileList.appendChild(li)
    })
    fileList.current.replaceWith(newFileList)
    fileList = newFileList
  }

  /*
   * end of function
   */

  return (
    <>
      <Paper
        elevation={0}
        variant='outlined'
        className={classes.root}
        // onClick={downloadFile}
      >
        {hide === false ? (
          <>
            <DefaultButton
              fileInputButtons={fileInputButton}
              textDeco={classes.textTransform}
              onHandleButtonOnClick={handleButtonOnclick}
              onHandleOnChange={selectFile}
              fileInput={fileInput}
            />
            <UrlButton styles={classes.textTransform} />
          </>
        ) : (
          <Output refFile={fileList} className='empty' />
        )}
      </Paper>
    </>
  )
}

export default Content
