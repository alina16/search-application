import { SearchResults } from './pages/Search';
import { Provider } from 'react-redux';
import store from './store';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<SearchResults/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
