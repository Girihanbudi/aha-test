import Box, { BoxProps } from '@mui/material/Box'
import { BEST_MAX_WIDTH } from '@constants/screen-size'

/**
 * Content Container
 * A container for any content that limit max width to prevent content stretch in big screen
 * e.g. Blog page container
 */
export const ContentContainer = (props: BoxProps) => {
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

export default ContentContainer
