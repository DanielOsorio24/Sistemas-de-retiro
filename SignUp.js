import React, { useState, useCallback, useEffect } from 'react';
import {Alert, Form, Button, Col} from 'react-bootstrap';

import authDB from './authDB';


const initial = {
      email: '',
      password: '',
      firstName: '',
      surName: '',
      id: '',
      state: 0,
    };

const SignUp = () =>  {
  const [data, setData] = useState(initial);
  const [error, setError] = useState('');

  const handleOnChange = useCallback((name) => (event) => {
    setError(false);
    const value = event.target.value;
    setData(preState => ({...preState, [name]: value}))
  }, []);

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    authDB.add(data);
    console.log({authDB});
  }, [data]);

    return (
      <>
        <Col>
        { error && <Alert  variant="danger">{error}</Alert>}

          <Form onSubmit={onSubmit}>


          
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Nombre" value={data.firtName} onChange={handleOnChange('firstName')}/>
            </Form.Group>

            <Form.Group controlId="formBasicSurName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" placeholder="Apellido" value={data.surName} onChange={handleOnChange('surName')}/>
            </Form.Group>

            <Form.Group controlId="formBasicId">
              <Form.Label>Cedula</Form.Label>
              <Form.Control type="text" placeholder="Cedula" value={data.id} onChange={handleOnChange('id')}/>
            </Form.Group>

            <Form.Group controlId="formBasicState">
              <Form.Label>Provincia</Form.Label>
              <Form.Control as="select" custom onChange={handleOnChange('state')} value={data.state}>
                <option value="1">Bocas del Toro</option>
                <option value="8">Panama</option>
                <option value="5">Darien</option>
              </Form.Control>
            </Form.Group>

            <hr/>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={data.email} onChange={handleOnChange('email')}/>
            </Form.Group>
            
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={data.password} onChange={handleOnChange('password')}/>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!data.email && !data.password}>
              Submit
            </Button>
        </Form>
      </Col>
      </>
    );
};

export default SignUp;
