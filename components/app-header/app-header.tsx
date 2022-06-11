import React from 'react'
import Head from 'next/head'

interface AppMetadata {
  name: string
  content: string
}

const defaultMetadata: AppMetadata[] = [
  {
    name: 'description',
    content: 'Aha Test - Simple auth app',
  },
  {
    name: 'keywords',
    content: 'Authentication, Dashboard',
  },
  {
    name: 'author',
    content: '',
  },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0',
  },
]

interface AppHeaderProps {
  title: string
  meta?: AppMetadata[]
  ico?: string
}

const AppHeader = ({
  title,
  meta = defaultMetadata,
  ico = '/favicon.ico',
}: AppHeaderProps) => {
  return (
    <Head>
      <title>{title}</title>
      {meta &&
        meta.map((data, index) => (
          <meta key={index} name={data.name} content={data.content} />
        ))}
      <link rel="icon" href={ico} />
    </Head>
  )
}

export default AppHeader
