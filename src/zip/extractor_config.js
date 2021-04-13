import React, { useRef } from 'react'
import * as zip from '@zip.js/zip.js/dist/zip'

function Extractor() {
  const model = (() => {
    return {
      getEntries(file, options) {
        return new zip.ZipReader(new zip.BlobReader(file)).getEntries(options)
      },
      async getURL(entry, options) {
        return URL.createObjectURL(
          await entry.getData(new zip.BlobWriter(), options)
        )
      },
    }
  })()

  const fileInput = useRef(null)
  const encodingInput = useRef(false)
  const fileInputButton = useRef(false)
  let fileList = useRef(null)
  let selectedFile, entries

  const downloadFile = async (e) => {
    const target = e.target
    if (
      target.dataset.entryIndex !== undefined &&
      !target.download &&
      !target.getAttribute('href')
    ) {
      e.preventDefault()
      try {
        await download(
          entries[Number(target.dataset.entryIndex)],
          target.parentElement,
          target
        )
      } catch (error) {
        // alert(error)
        console.log(error)
      }
    }
  }

  async function selectFile() {
    try {
      // fileInputButton.current.disabled = true
      // encodingInput.current.disabled = true
      selectedFile = fileInput.current.files[0]
      await loadFiles()
    } catch (error) {
      // alert(error)
      console.log(error)
    } finally {
      fileInput.current.value = ''
    }
  }

  const selectEncoding = async () => {
    try {
      encodingInput.current.disabled = true
      fileInputButton.current.disabled = true
      await loadFiles(encodingInput.current.value)
    } catch (error) {
      // alert(error)
      console.log(error)
    } finally {
      fileInputButton.current.disabled = false
    }
  }
  async function loadFiles(filenameEncoding) {
    entries = await model.getEntries(selectedFile, { filenameEncoding })
    if (entries && entries.length) {
      fileList.current.classList.remove('empty')
      const filenameUTF8 = Boolean(
        !entries.find((entry) => !entry.filenameUTF8)
      )
      encodingInput.current.disabled = filenameUTF8
      refreshList()
    }
  }

  function refreshList() {
    const newFileList = fileList.current.cloneNode()
    entries.forEach((entry, entryIndex) => {
      const li = document.createElement('li')
      const anchor = document.createElement('a')
      anchor.dataset.entryIndex = entryIndex
      anchor.textContent = anchor.title = entry.filename
      anchor.title = `${entry.filename}`
      console.log(newFileList)
      if (!entry.directory) {
        anchor.href = ''
      }
      li.appendChild(anchor)
      newFileList.appendChild(li)
    })
    fileList.current.replaceWith(newFileList)
    fileList = newFileList
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

  return (
    <div onClick={downloadFile}>
      <ol>
        <li>
          <input
            type='file'
            ref={fileInput}
            accept='application/zip'
            onChange={selectFile}
          />
        </li>
        <li className='encodingItem'>
          <span>encoding</span>
          <select
            className='encodingInput'
            ref={encodingInput}
            disabled
            onChange={selectEncoding}
          >
            <option>utf-8</option>
            <option>cp437</option>
            <option>ibm866</option>
          </select>
        </li>
        <li>
          <span>download</span>
          <ul ref={fileList} className='empty'></ul>
        </li>
      </ol>
    </div>
  )
}

export default Extractor
