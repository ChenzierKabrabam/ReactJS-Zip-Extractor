import * as zip from '@zip.js/zip.js/dist/zip'
import * as zipConfig from '@zip.js/zip.js'

zip.configure({
  workerScripts: {
    deflate: ['./z-worker.js'],
    inflate: ['./z-worker.js'],
  },
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
