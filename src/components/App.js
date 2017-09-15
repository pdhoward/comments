
//////////////////////////////////////////////////
//////////     Mainline        //////////////////
/////////////////////////////////////////////////

import React, {Component}         from 'react';
import { Provider }               from 'react-redux';
import { BrowserRouter, Route }		from 'react-router-dom';
import { initializeAPI }          from '../api';
import { initializeStore }        from '../store';
import API                        from '../api';
import Main 								 			from './Main';
import Category 									from './Category';
import Topic           		 			  from './Topic';
import NewPost                    from './NewPost'
import Navbar                     from './common/Navbar'
import Footer                     from './common/Footer'
import '../styles/App.css';

initializeAPI()

// to app_content to the app_wrap classname
// "App_content"
// https://github.com/JedWatson/classnames
const store = initializeStore()

class App extends Component {

  handleSubmit = (data) => {
    API.createNewPost(data).then(function(response){
      console.log("posted update to db")
    })
  }

  render() {
    return(
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <div className="App__wrap">
              <Navbar />
              <Route exact path="/" component={Main}/>
              <Route exact path="/category/:category" component={Category}/>
              <Route exact path="/topic/:id" component={Topic}/>

              <Route exact path="/newpost" render={({history}) => (
                  <NewPost
                    onSubmitPost={ (data) => {
                      this.handleSubmit(data)
                      history.push('/')
                      }}
                    />
                )} />

              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
};

export default App;
