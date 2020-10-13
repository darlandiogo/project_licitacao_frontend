import React, {useState} from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";

import { FormGroup, Paper, Typography } from '@material-ui/core';
import { Input, PrimaryButton } from '../../components/form';
import Error from "../../components/error";

import { loginUser, resetError } from "../../store/ducks/login";

import './style.css';

const Login  = ( { loginUser, loaded, errors, user } ) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  setTimeout(()=>{ resetError() },3000)

  const validate = (value) => errors.find(elem => elem.field === value);

  const handleSubmit = ( ) => {
      loginUser({ email, password })
  }

  if(loaded && user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="login">
        <Paper className="box_login">
          <Typography variant="h5">
              LOGIN
          </Typography>
          <FormGroup className="margin-form">
            <Input
              label="username"
              name="username"
              value={email}
              error={validate('email')}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="margin-form">
            <Input
              name="password"
              label="senha"
              value={password}
              error={validate('password')}
              onChange={e => setPassword(e.target.value)}
            />
          </FormGroup> 
          <FormGroup className="margin-form">
            <PrimaryButton
              variant="contained" 
              color="primary"
              label="Login"
              loading={!loaded}
              onClick={handleSubmit}/>
          </FormGroup>
        </Paper>

        <Error/>

    </div>
  );
}

const mapStateToProps = ( state ) => {
  return {
    errors: state.login.errors || [],
    user: state.login.data,
    loaded: state.login.loaded
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ loginUser, resetError }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
