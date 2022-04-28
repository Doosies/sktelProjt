import React, {} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Setting} from './pages/pages';


function App(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path={'/admin'} component={Setting} />
            </Switch>
        </BrowserRouter>
        
        
    );
}
export default App