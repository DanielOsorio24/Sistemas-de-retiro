import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Alert, Form, Button, Container, Row, Col} from 'react-bootstrap';

import  Login from './Login';
import  SignUp from './SignUp';


const authDB = {
  'chisthoval@icloud.com': {
    password: '12345678',
    firstName: 'Christhoval',
    surName: 'Barba'
  }
}

const initialCredentials = {
      email: '',
      password: ''
    };

const App = () =>  {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [error, setError] = useState(false);
  const [view, setView] = useState('login');

  const handleOnChange = useCallback((name) => (event) => {
    setError(false);
    const value = event.target.value;
    setCredentials(preState => ({...preState, [name]: value}))
  }, []);

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    if(authDB[credentials.email]){
      localStorage.setItem("authUser", JSON.stringify(authDB[credentials.email]));
      return;
    }
    setError(true);
  }, [credentials]);

    return (
      <Container>
  <Row>
  {view === 'login' && (<Login />)}
  {view === 'signup' && (<SignUp />)}
  
</Row>
      </Container>
    );
};

render(<App />, document.getElementById('root'));
