import React from 'react';
import logo from './logo.svg';

import './App.css';
import {LabelConn} from './Label';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = ( props: any ) => {
  return (
    <div className="App">
      <LabelConn/>
    </div>
  );
}

export default App;
