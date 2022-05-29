import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'

export const actionButton = styled(Button)<ButtonProps>(({ theme }) => ({
  // backgroundColor: theme.palette.grey[500],
  align: 'center',
  paddingBlock: 15,
  paddingInline: 25,
  borderRadius: 50,
  boxShadow: '0px 5px 12px -2px rgba(0,0,0,0.3)',
  webkitBoxShadow: '0px 10px 20px -25px rgba(0,0,0,0.36)',
  MozBoxShadow: '0px 10px 20px -25px rgba(0,0,0,0.36)',
  '&:hover': {
    boxShadow: '0px 7px 12px 0px rgba(0,0,0,0.4)',
    backgroundColor: theme.mainColor.secondary[500],
  },
  transition: 'background 0.5s, color 0.5s, box-shadow 0.5s',
}))

export default actionButton
