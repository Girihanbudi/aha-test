import { styled } from '@mui/material/styles'
import MuiMenuItem, {
  MenuItemProps as MuiMenuItemProps,
} from '@mui/material/MenuItem'

interface MenuItemProps extends MuiMenuItemProps {
  type?: 'default' | 'warning' | 'danger'
}

/**
 * Menu Item
 * Custom Menu Item with style selector
 * e.g. delete menu should give noticeable color
 */
export const MenuItem = styled(MuiMenuItem)<MenuItemProps>(
  ({ theme, type }) => {
    let backgroundColor: string | undefined
    let color: string | undefined
    switch (type) {
      case 'warning':
        backgroundColor = theme.mainColor.warning[500]
        color = theme.mainColor.disabled[50]
        break
      case 'danger':
        backgroundColor = theme.mainColor.danger[500]
        color = theme.mainColor.disabled[50]
        break
      default:
        backgroundColor = undefined
        color = undefined
        break
    }

    return {
      '&:hover, &.Mui-selected, &.MuiIconButton-colorInherit': {
        backgroundColor,
        color,
        '& .MuiSvgIcon-root': {
          backgroundColor,
          color,
        },
      },
    }
  }
)

export default MenuItem
