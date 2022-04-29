import './App.css';
import Create from './components/create';
import Read from './components/read';
import Update from './components/update';
import ReadBrand from './components/readBrand';
import CreateBrand from './components/createBrand';
import UpdateBrand from './components/updateBrand';

import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="main">
        <h2 className="main-header">Eletrodomesticos</h2>
        <div>
          <Route exact path='/create' component={Create} />
        </div>
        <div style={{ marginTop: 20 }}>
          <Route exact path='/' component={Read} />
        </div>

        <Route path='/update' component={Update} />
        <Route path='/marcas' component={ReadBrand} />
        <Route path='/criar/marcas' component={CreateBrand} />
        <Route path='/editar/marcas' component={UpdateBrand} />

      </div>
    </Router>
  );
}

export default App;
