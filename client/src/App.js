import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Services from './components/Services/Services';
import Auth from './components/Auth/Auth';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/services" exact component={Services} />
        <Route path="/auth" exact component={Auth} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
