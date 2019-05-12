import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.css';

//components
import reducers from './reducers';
import App from './components/App';
import Welcome from './components/layout/Welcome';
import Signup from './components/auth/Signup';
import Feature from './components/layout/Feature';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';

const store = createStore(
  reducers,
  {auth: {authed: localStorage.getItem('token')}},
  applyMiddleware(thunk)
);
console.log(localStorage.getItem('token'))
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route exact path='/' component={Welcome} />
        <Route path='/signup' component={Signup} />
        <Route path='/feature' component={Feature} />
        <Route path='/signout' component={Signout} />
        <Route path='/signin' component={Signin}/>
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
