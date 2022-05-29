import Box, { BoxProps } from '@mui/material/Box'

export const fullScreenContainer = (props: BoxProps) => {
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

export default fullScreenContainer
