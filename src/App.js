import { useEffect, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import './css/main.css'

import Navbar from './components/Navbar/Navbar'
import HeroBanner from './components/HeroBanner/HeroBanner'
import Search from './components/Search/Search'
import { authCheckState } from './store/actions/authActions'
import Spinner from './components/Spinner/Spinner'
import SearchResultContainer from './components/Search/SearchResultContainer'

const AuthContainerLazy = lazy(() => import('./components/Auth/AuthContainer'))
const AdminDashBoardLazy = lazy(() =>
  import('./components/Dashboard/AdminDashBoard')
)
const MyBookingsLazy = lazy(() =>
  import('./components/MyBookings.js/MyBookings')
)

function App(props) {
  useEffect(() => {
    props.onTryAutoLogin()
    props?.history?.push('/')
  }, [props?.isUserLoggedIn])

  useEffect(() => {
    props?.history?.push('/')
  }, [props?.isUserAdmin])

  let adminRoute = (
    <>
      <Route
        path='/admin'
        render={() => (
          <Suspense fallback={<Spinner />}>
            <AdminDashBoardLazy />
          </Suspense>
        )}
      />
    </>
  )

  let commonRoute = !props?.isUserLoggedIn && (
    <>
      <Route
        path='/login'
        exact
        render={() => (
          <Suspense fallback={<Spinner />}>
            <AuthContainerLazy />
          </Suspense>
        )}
      />
      <Route
        path='/signup'
        exact
        render={() => (
          <Suspense fallback={<Spinner />}>
            <AuthContainerLazy />
          </Suspense>
        )}
      />
    </>
  )

  let userRoute = (
    <>
      <Route
        path='/my-bookings'
        exact
        render={() => (
          <Suspense fallback={<Spinner />}>
            <MyBookingsLazy />
          </Suspense>
        )}
      />
      <Route path='/' exact component={Search} />
      <Route path='/' exact component={SearchResultContainer} />
    </>
  )

  return (
    <div className='App'>
      {props?.isUserLoading && (
        <div className='app_backdrop'>
          <div className='apploading_spinner'>
            <Spinner />
          </div>
        </div>
      )}
      <>
        <Navbar />
        <Route render={() => <Redirect to={{ pathname: '/' }} />} />
        <Switch>
          <Route path='/' exact component={HeroBanner} />
        </Switch>
      </>
      {commonRoute}
      {props?.isUserAdmin && adminRoute}
      {props?.isUserLoggedIn && !props?.isUserAdmin && userRoute}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state?.user?.userLoggedIn,
    isUserLoading: state?.user?.loading,
    isUserAdmin: state?.user?.userDetails?.isAdmin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => dispatch(authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
