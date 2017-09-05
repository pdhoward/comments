

import React        from 'react';
import Navbar       from './common/Navbar'
import Footer       from './common/Footer'
import Fork         from './common/Fork'
import Header       from './Header';
import TopicNav     from './TopicNav';
import '../styles/App.css';

var App = React.createClass({
  render() {
    return(
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
    );
  }
});

module.exports = App;
