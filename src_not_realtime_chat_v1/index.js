import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import { createStore } from 'redux';
import './index.css';
import { mainReducer } from './redux/mainReducer';
import { Provider } from 'react-redux';

const store = createStore(mainReducer);

ReactDOM.render(

<Router>
  <Provider store={store}>
    <App/>
  </Provider>
</Router>
  
  ,document.getElementById('root')
);

