import React from 'react'
import Link from 'next/link'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

interface AppBarProps {
  title?: string
  titleLink?: string
  children?: React.ReactNode
}

const AppBar = ({
  title = process.env.NEXT_PUBLIC_APPNAME,
  titleLink,
  children,
}: AppBarProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {titleLink ? (
              <Link href={titleLink}>
                <a>{title}</a>
              </Link>
            ) : (
              title
            )}
          </Typography>
          {children && <div>{children}</div>}
        </Toolbar>
      </MuiAppBar>
    </Box>
  )
}

export default AppBar
