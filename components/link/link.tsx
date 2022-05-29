import React from 'react'
import { styled } from '@mui/material/styles'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

import Typography, { TypographyProps } from '@mui/material/Typography'

export const LinkText = styled(Typography)<TypographyProps>(({ theme }) => ({
  // backgroundColor: theme.palette.grey[500],
  color: theme.mainColor.primary[500],
  fontWeight: 'bold',
  textDecoration: 'none',
  '&:hover': {
    color: theme.mainColor.secondary[100],
  },
  transition: 'background 0.5s, color 0.5s',
}))

interface CustomLinkProps extends NextLinkProps {
  children?: React.ReactNode
}

const link = (props: CustomLinkProps) => {
  return (
    <NextLink {...props}>
      <a>
        <LinkText>{props.children}</LinkText>
      </a>
    </NextLink>
  )
}

export default link
