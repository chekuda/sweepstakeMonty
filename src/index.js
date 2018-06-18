import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './components/App/App';
import AddGame from './components/AddGame/AddGame';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<BrowserRouter>
  <Switch>
    <Route path='/addgame' component={ AddGame }/>
    <Route path='/' component={ App }/>
  </Switch>
</BrowserRouter>,
document.getElementById('root'))
registerServiceWorker()


