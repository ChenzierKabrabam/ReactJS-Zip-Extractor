import React, { useRef } from 'react'
import { makeStyles, Paper } from '@material-ui/core'
import { model } from '../zip/zip'
import DefaultButton from './default_button'
import Output from './output'
import * as zip from '@zip.js/zip.js/dist/zip-full'
import * as fflate from '@zip.js/zip.js/dist/z-worker-fflate'

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

export const download = async (entry, li, a) => {
  const unzipProgress = document.createElement('progress')
  unzipProgress.style.display = 'none'
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
  const [hide, setHide] = React.useState(true)
  const fileInput = useRef(null)
  const fileInputButton = useRef(false)
  let fileList = useRef(false)
  let selectedFile

  zip.configure({
    workerScripts: {
      inflate: ['../zip/z-worker.js', '../zip/z-worker-fflate.js'],
      deflate: ['../zip/z-worker.js', '../zip/z-worker-fflate.js'],
    },
  })
  // const { Deflate, Inflate } = zip.initShimAsyncCodec(
  //   fflate,
  //   undefined,
  //   (codec, onData) => (codec.ondata = onData)
  // )

  // zip.configure({
  //   useWebWorkers: false,
  //   Deflate,
  //   Inflate,
  // })

  //Dispatches an Event at the specified EventTarget, (synchronously) invoking the affected EventListeners in the appropriate order

  const handleButtonOnclick = () => {
    fileInput.current.dispatchEvent(new MouseEvent('click'))
  }
  // selectInflateImplementation()

  const selectFile = async () => {
    try {
      selectedFile = fileInput.current.files[0]
      await loadFile()
      console.log(selectedFile)
    } catch (error) {
      alert(error)
    }
  }

  const loadFile = async () => {
    setHide(false)
    entries = await model.getEntries(selectedFile)
    console.log(entries)
    refreshList()
  }

  const refreshList = () => {
    const newFileList = fileList.current.cloneNode()

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
