

import React, {Component}         from 'react';
import { BrowserRouter, Route }   from 'react-router-dom';
import Navbar                     from './common/Navbar'
import Footer                     from './common/Footer'
import Fork                       from './common/Fork'
import '../styles/App.css';

class App extends Component {
  render() {
    return(
  <BrowserRouter>
      <div className="App">
        <div className="App__wrap">
          <Navbar />
          <div className="App_content">
            {this.props.children}
          </div>
          <Footer />
          <Fork />
        </div>
      </div>
    </BrowserRouter>
    );
  }
};

export default App;
