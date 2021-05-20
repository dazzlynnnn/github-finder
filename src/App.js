import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import Main from './Main.js';
import Follower from './Follower.js';
import './App.css';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route exact path="/follower" component={Follower}/>
      </Switch>
    </Router>
  );
}

export default App;
