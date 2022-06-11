import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

/**
 * Important Text Box
 * Used to show important thing to user
 * e.g. message box
 */
export const ImportantTextBox = styled(Box)<BoxProps>(({ theme }) => ({
  // backgroundColor: theme.palette.grey[500],
  align: 'center',
  backgroundColor: theme.mainColor.warning[100],
  color: theme.mainColor.primary[900],
  borderRadius: 5,
  padding: 5,
  // border: 'solid 2px',
  textAlign: 'center',
  fontWeight: '500',
}))

export default ImportantTextBox
