import './App.css';
import * as React from 'react';
import { Reset } from 'styled-reset';
import Button from './components/Common/button';

function App() {
    return (
        <React.Fragment>
            <Reset />
            <Button className="bg-blue-500" width="200px" text="로그인" />
            <p className="font-bold bg-black"> hi</p>
        </React.Fragment>
    );
}

export default App;
