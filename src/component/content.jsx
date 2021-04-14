import React, { useState, useRef } from 'react'
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

// export const downloadFile = async (event) => {
//   const target = event.target
//   if (
//     target.dataset.entryIndex !== undefined &&
//     !target.download &&
//     !target.getAttribute('href')
//   ) {
//     event.preventDefault()
//     try {
//       await download(
//         entries[Number(target.dataset.entryIndex)],
//         target.parentElement,
//         target
//       )
//     } catch (error) {
//       // alert(error)
//       console.log(error)
//     }
//   }
// }
// const download = async (entry, li, a) => {
//   const unzipProgress = document.createElement('progress')
//   li.appendChild(unzipProgress)
//   const blobURL = await model.getURL(entry, {
//     onprogress: (index, max) => {
//       unzipProgress.value = index
//       unzipProgress.max = max
//     },
//   })
//   const clickEvent = new MouseEvent('click')
//   unzipProgress.remove()
//   unzipProgress.value = 0
//   unzipProgress.max = 0
//   a.href = blobURL
//   a.download = entry.filename
//   a.dispatchEvent(clickEvent)
// }

const Content = () => {
  const classes = useStyles()
  const fileInput = useRef(null)
  const fileInputButton = useRef(false)
  const [hide, setHide] = useState(false)
  let fileList = useRef(false)
  let selectedFile, entries
  /*
   * functionality for button:
   */

  //Dispatches an Event at the specified EventTarget, (synchronously) invoking the affected EventListeners in the appropriate order

  const handleButtonOnclick = () => {
    fileInput.current.dispatchEvent(new MouseEvent('click'))
  }

  const selectFile = async () => {
    try {
      selectedFile = fileInput.current.files[0]
      setHide(true)
      await loadFile()
    } catch (error) {
      alert(error)
      console.log(error)
    }
  }

  const loadFile = async () => {
    entries = await model.getEntries(selectedFile)

    console.log(entries)
    refresh()
  }

  const refresh = () => {
    const newFileList = fileList.current.cloneNode()
    entries.forEach((entry, entryIndex) => {
      const li = document.createElement('li')
      const anchor = document.createElement('a')
      anchor.style.textDecoration = 'none'
      anchor.style.color = '#2b2a2a'
      anchor.dataset.entryIndex = entryIndex
      anchor.textContent = entry.filename
      anchor.title = entry.filename
      if (!entry.directory) {
        anchor.href = ''
      }
      if (entry.directory) {
        // function for tree view place here
        anchor.style.fontWeight = '500'
      }
      anchor.setAttribute('download', entry.filename)
      li.appendChild(anchor)
      newFileList.appendChild(li)
      console.log(entry.directory)
    })
    fileList.current.replaceWith(newFileList)
    fileList = newFileList
    console.log(fileList)
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
          </>
        ) : (
          <Output refFile={fileList} ulStyle={classes.ulRoot} />
        )}
      </Paper>
    </>
  )
}

export default Content
