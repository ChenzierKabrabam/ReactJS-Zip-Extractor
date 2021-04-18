import * as zip from '@zip.js/zip.js/dist/zip-full'

// const INFLATE_IMPLEMENTATIONS = {
//   'zip.js': ['lib/z-worker.js'],
// }

// export const selectInflateImplementation = () => {
//   const inflateImplementation =
//     INFLATE_IMPLEMENTATIONS[inflateImplementationInput.value]
//   zip.configure({
//     workerScripts: {
//       inflate: inflateImplementation,
//     },
//   })
// }

zip.configure({
  workerScripts: {
    deflate: ['library_path/z-worker.js'],
    inflate: ['library_path/z-worker.js'],
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
