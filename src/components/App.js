

import React, {Component}         from 'react';
import { Route }           				from 'react-router-dom';
import { initializeAPI }          from '../api';
import Main 								 			from './Main';
import Category 									from './Category';
import Topic           		 			  from './Topic';
import Navbar                     from './common/Navbar'
import Footer                     from './common/Footer'
import Fork                       from './common/Fork'
import '../styles/App.css';

initializeAPI()

class App extends Component {
  render() {
    return(
      <div className="App">
        <div className="App__wrap">
          <Navbar />
          <div className="App_content">
            <Route exact path="/" component={Main}/>
            <Route exact path="/category/:category" component={Category}/>
            <Route exact path="/topic/:id" component={Topic}/>
          </div>
          <Footer />
          <Fork />
        </div>
      </div>
    );
  }
};

export default App;
