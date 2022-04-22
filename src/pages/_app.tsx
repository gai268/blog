import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'

import store from '../stores/store'
import ErrorBoundary from '../ErrorBoundary'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ErrorBoundary>
  )
}
