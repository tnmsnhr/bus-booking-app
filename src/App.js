import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import './css/main.css'

import Navbar from './components/Navbar/Navbar'
import HeroBanner from './components/HeroBanner/HeroBanner'
import Search from './components/Search/Search'
import { authCheckState } from './store/actions/authActions'
import AuthContainer from './components/Auth/AuthContainer'
import Spinner from './components/Spinner/Spinner'
import SearchResultContainer from './components/Search/SearchResultContainer'
import MyBookings from './components/MyBookings.js/MyBookings'
import AdminDashBoard from './components/Dashboard/AdminDashBoard'

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
      <Route path='/admin' component={AdminDashBoard} />
    </>
  )

  let commonRoute = !props?.isUserLoggedIn && (
    <>
      <Route path='/login' exact component={AuthContainer} />
      <Route path='/signup' exact component={AuthContainer} />
    </>
  )

  let userRoute = (
    <>
      <Route path='/my-bookings' exact component={MyBookings} />
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
    isUserAdmin: state?.user?.userDetails?.isAdmin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => dispatch(authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
