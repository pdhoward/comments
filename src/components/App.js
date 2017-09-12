

import React, {Component}         from 'react';
import { Route }           				from 'react-router-dom';
import API, { initializeAPI }     from '../api';
import Main 								 			from './Main';
import Category 									from './Category';
import Topic           		 			  from './Topic';
import NewPost         		 			  from './NewPost';
import Navbar                     from './common/Navbar'
import Footer                     from './common/Footer'
import Fork                       from './common/Fork'
import '../styles/App.css';

initializeAPI()

class App extends Component {
  state = {
    posts:[]
  }

  handleSubmitForm = (postData) => {
    console.log("SUBMITTED FORM")
    console.log(postData)
    API.createNewPost(postData).then(() => {
      console.log("Form was processed")
    })
  }

  render() {
    return(
      <div className="App">
        <div className="App__wrap">
          <Navbar />
          <div className="App_content">

            <Route exact path="/" component={Main}/>
            <Route exact path="/category/:category" component={Category}/>
            <Route exact path="/topic/:id" component={Topic}/>
            <Route exact path="/newpost" render={({history}) => (
              <NewPost
                onSubmitPost={ (postData) => {
                  this.handleSubmitForm(postData)
                  history.push('/')
                }}
              />
            )} />

          </div>
          <Footer />
          <Fork />
        </div>
      </div>
    );
  }
};

export default App;
