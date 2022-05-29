import Box, { BoxProps } from '@mui/material/Box'
import { BEST_MAX_WIDTH } from '@constants/view'

export const contentContainer = (props: BoxProps) => {
  return (
    <Box
      sx={{
        maxWidth: BEST_MAX_WIDTH,
      }}
      {...props}
    >
      {props.children}
    </Box>
  )
}

export default contentContainer
