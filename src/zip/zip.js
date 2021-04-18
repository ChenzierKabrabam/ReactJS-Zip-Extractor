import * as zip from '@zip.js/zip.js/dist/zip'
// import * as zWorker from '@zip.js/zip.js/dist/z-worker'

zip.configure({
  workerScripts: false,
})

export const model = (() => {
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
