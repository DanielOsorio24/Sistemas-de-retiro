import React, { useState, useCallback } from 'react';
import {Alert, Form, Button, Col} from 'react-bootstrap';

import authDB from './authDB';


const initialCredentials = {
      email: '',
      password: ''
    };

const Login = () =>  {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [error, setError] = useState(false);

  const handleOnChange = useCallback((name) => (event) => {
    setError(false);
    const value = event.target.value;
    setCredentials(preState => ({...preState, [name]: value}))
  }, []);

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    const fromDB = authDB.db[credentials.email] || {};

    const {password} = fromDB;

    if(password === credentials.password){
      localStorage.setItem("authUser", JSON.stringify(authDB.db[credentials.email]));
      return;
    }
    setError(true);
  }, [credentials]);

    return (
      <>
        <Col>
        { error && <Alert  variant="danger">No existe {credentials.email} en la DB.</Alert>}

          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={credentials.email} onChange={handleOnChange('email')}/>
            </Form.Group>
            
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={credentials.password} onChange={handleOnChange('password')}/>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!credentials.email && !credentials.password}>
              Submit
            </Button>
        </Form>
      </Col>
      </>
    );
};

export default Login;
