import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@constants/translation'
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme } from '@styles/default'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { wrapper, store } from '../store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider
      session={pageProps.session}
      // In case you use a custom path and your app lives at "/cool-app" rather than at the root "/"
      // basePath="cool-app"
      // Re-fetch session every 5 minutes
      refetchInterval={5 * 60}
      // Re-fetches session when window is focused
      refetchOnWindowFocus={true}
    >
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  )
}

// export default wrapper.withRedux(MyApp)
export default MyApp
