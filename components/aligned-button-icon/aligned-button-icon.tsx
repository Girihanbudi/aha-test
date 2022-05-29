import React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import { Box } from '@mui/material'

interface AlignedButtonIconProps extends ButtonProps {
  icon: React.ReactNode
  children?: React.ReactNode
}

const AlignedButtonIcon = (props: AlignedButtonIconProps) => {
  const { icon, children } = props

  return (
    <Button
      fullWidth
      variant="contained"
      sx={{
        textTransform: 'none',
      }}
      {...props}
      // lableStyle={{ position: 'absolute', top: 0, left: -10 }}
    >
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
        <Box
          sx={{
            mx: 1,
            marginRight: 'auto',
            marginLeft: 0,
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'center',
          }}
        >
          {icon}
        </Box>
        <Box
          sx={{
            width: '100%',
          }}
        >
          {children}
        </Box>
      </Box>
    </Button>
  )
}

export default AlignedButtonIcon
