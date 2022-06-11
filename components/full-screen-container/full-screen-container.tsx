import Box, { BoxProps } from '@mui/material/Box'

/**
 * Full Screen Container
 * A container that strech content to fid width user screen size
 * e.g. Can be used to initial landing page to place info
 */
export const FullScreenContainer = (props: BoxProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
      {...props}
    >
      {props.children}
    </Box>
  )
}

export default FullScreenContainer
