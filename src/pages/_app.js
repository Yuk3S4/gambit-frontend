import 'semantic-ui-css/semantic.min.css'
import { initAmplify } from '@/utils'
import '@/scss/global.scss'
import { AuthProvider, BasketProvider, SearchProvider } from '@/context'

// Inicializar Amplify
initAmplify()

export default function App(props) {
  const { Component, pageProps } = props

  return (
    <AuthProvider>
      <BasketProvider>
        <SearchProvider>
          <Component {...pageProps} />
        </SearchProvider>
      </BasketProvider>
    </AuthProvider>  
  )
}
