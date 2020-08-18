import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router, HashRouter } from 'react-router-dom';
// import FormContent from "./Page/FormContent/FormContent";
import routes from './routes';
import history from "./history";

class App extends React.Component {


  showContentMenus = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (<Route key={index} path={route.path} exact={route.exact} render={route.main} />)
      })
    }

    return <Switch>{result}</Switch>
  }

  render() {
    return (

      <HashRouter history={history}>
        <div className="App">
          {this.showContentMenus(routes)}

        </div>
      </HashRouter>
    );
  }
}

export default App;
