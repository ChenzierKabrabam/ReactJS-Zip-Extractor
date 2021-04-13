import { Paper, Typography, makeStyles } from '@material-ui/core'

const useStyle = makeStyles((theme) => ({
  root: {
    maxWidth: 390,
    margin: '24px auto',
    padding: '0 60px',
    backgroundColor: 'transparent',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 630,
    },
  },
  textDeco: {
    textAlign: 'center',
  },
}))
const Footer = () => {
  const classes = useStyle()
  return (
    <>
      <Paper elevation={0} className={classes.root}>
        <Typography
          variant='body1'
          className={classes.textDeco}
          style={{ color: 'black' }}
        >
          Supported formats:
        </Typography>
        <Typography
          variant='subtitle1'
          className={classes.textDeco}
          style={{ color: 'gray' }}
        >
          7z, zipx, rar, tar, exe, dmg, iso, zip, msi, nrg, gz, cab, bz2, wim,
          ace alz, ar, arc, arj, bin, cdi, chm, cpt, cpio, cramfs, crunch, deb,
          dd, dms, ext, fat, format, gpt, hfs, ihex, lbr, lzh, lzma, lzm, mbr,
          mdf, nsa, nds, nsis, ntfs, pit, pak, pdf, pp, qcow2, rpm, sar,
          squashfs, squeeze, sit, sitx, swf, udf, uefi, vdi, vhd, vmdk, warc,
          xar, xz, z, zoo, zi, jar
        </Typography>
      </Paper>
    </>
  )
}

export default Footer
