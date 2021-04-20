import * as zip from '@zip.js/zip.js/dist/zip'
import * as fflate from 'fflate'

// zip.configure({
//   inflate: ['./z-worker.js'],
//   deflate: ['./z-worker.js'],
// })

const { Deflate, Inflate } = zip.initShimAsyncCodec(
  fflate,
  undefined,
  (codec, onData) => (codec.ondata = onData)
)

zip.configure({
  useWebWorkers: false,
  Deflate,
  Inflate,
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
