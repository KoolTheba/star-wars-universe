import PropTypes from 'prop-types'

import '../styles/globals.css'

if (Boolean(process.env.NEXT_PUBLIC_API_MOCKING) === true) {
  import('../../mocks').then(({ setupMocks }) => {
    setupMocks()
  })
}

function MyApp ({ Component, pageProps }) {
  return <Component {...pageProps} />
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
}

export default MyApp
