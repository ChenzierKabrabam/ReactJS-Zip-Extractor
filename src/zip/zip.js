import * as zip from '@zip.js/zip.js/dist/zip-full'

// zip.configure({
//   inflate: ['./z-worker.js'],
//   deflate: ['./z-worker.js'],
// })

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
