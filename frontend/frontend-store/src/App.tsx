import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import ErrorBoundaryComp from './components/error-boundary.comp';
import AppRoutes from 'App.routes';
import { Provider } from "react-redux";
import store from "store";

function App() {
  return (
    <ErrorBoundaryComp>
      <Provider store={store}>
        <Router>
          <AppRoutes />
        </Router>
      </Provider>
    </ErrorBoundaryComp>

  );
}

export default App;
