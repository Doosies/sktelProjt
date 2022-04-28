import React, {} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Setting} from './pages/pages';

const AppRoutes = () => {
    const routes = useRoutes([
      { path: '/admin', element: <Setting />},
    ]);
    return routes;
  }

function App(){
    return(
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}
export default App