

import React, {Component}         from 'react';
import { BrowserRouter, Route }		from 'react-router-dom';
import API, { initializeAPI }     from '../api';
import { initializeStore }        from './store';
import Main 								 			from './Main';
import Category 									from './Category';
import Topic           		 			  from './Topic';
import Navbar                     from './common/Navbar'
import Footer                     from './common/Footer'
import '../styles/App.css';

initializeAPI()

const store = initializeStore()

class App extends Component {

  render() {
    return(
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <div className="App__wrap" "App_content">
              <Navbar />
              <Route exact path="/" component={Main}/>
              <Route exact path="/category/:category" component={Category}/>
              <Route exact path="/topic/:id" component={Topic}/>
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
};

export default App;
