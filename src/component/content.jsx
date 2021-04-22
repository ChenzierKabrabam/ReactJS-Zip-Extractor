import React, { useRef } from 'react'
import { makeStyles, Paper } from '@material-ui/core'
import { model } from '../zip/zip'
import DefaultButton from './default_button'
import Output from './output'

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
  ulRoot: {
    listStyleType: 'none',
  },
}))

export let entries

export const blobURL = async (entry) => {
  await model.getURL(entry)
}
export const download = async (entry, li, a) => {
  const clickEvent = new MouseEvent('click')
  a.href = blobURL
  a.download = entry.filename

  // removing the address and download attribute so that it wont download it
  if (entry.directory === true) {
    a.removeAttribute('href')
    a.removeAttribute('download')
  }
  a.dispatchEvent(clickEvent)
}

const Content = () => {
  const classes = useStyles()
  const [hide, setHide] = React.useState(true)
  const fileInput = useRef(null)
  const fileInputButton = useRef(false)
  let fileList = useRef(false)
  let selectedFile

  /*
   * Dispatches an Event at the specified EventTarget, (synchronously) invoking the affected EventListeners
   * in the appropriate order
   */

  /*
   * The Blob object represents a blob, which is a file-like object of immutable, raw data; they can be read as
   * text or binary data, or converted into a ReadableStream so its methods can be used for processing the data.
   */

  const handleButtonOnclick = () => {
    fileInput.current.dispatchEvent(new MouseEvent('click'))
  }

  const selectFile = async () => {
    try {
      selectedFile = fileInput.current.files[0]
      await loadFile()
    } catch (error) {
      alert(error)
    }
  }

  const loadFile = async () => {
    entries = await model.getEntries(selectedFile)
    setHide(false)
    refreshList()
  }

  const refreshList = () => {
    const newFileList = fileList.current.cloneNode()

    // showing the filename of the zip
    const span = document.createElement('li')
    span.style.fontSize = '14px'
    span.style.fontWeight = '500'
    span.innerText = selectedFile.name
    newFileList.appendChild(span)

    entries.forEach((entry, entryIndex) => {
      const li = document.createElement('li')
      const anchor = document.createElement('a')
      anchor.style.color = '#000000'
      anchor.style.textDecoration = 'none'

      anchor.dataset.entryIndex = entryIndex
      anchor.textContent = anchor.title = entry.filename

      if (!entry.directory) {
        anchor.href = ''
      }
      if (entry.directory) {
        li.style.fontSize = '14px'
        li.style.fontWeight = '500'
      }
      li.appendChild(anchor)
      newFileList.appendChild(li)
    })

    fileList.current.replaceWith(newFileList)
    fileList = newFileList
  }

  return (
    <>
      <Paper elevation={0} variant='outlined' className={classes.root}>
        {hide === true ? (
          <DefaultButton
            fileInputButtons={fileInputButton}
            textDeco={classes.textTransform}
            onHandleButtonOnClick={handleButtonOnclick}
            onHandleOnChange={selectFile}
            fileInput={fileInput}
          />
        ) : (
          <Output refFile={fileList} ulStyle={classes.ulRoot} />
        )}
      </Paper>
    </>
  )
}

export default Content
