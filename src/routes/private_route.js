import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import CustomHeader from "../components/header";
import Layout from '../components/layout';
import { Container } from "@material-ui/core";

const PrivateRoute = ({ 
  component: Component,
  auth, 
  headerTitle, 
  breadcrumbsConfig,
  loaded, 
   ...rest }
) => {
  
  if (!loaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
          <Layout>
            { 
              headerTitle ? 
              ( <>
                  < CustomHeader breadcrumbsConfig={breadcrumbsConfig}/>
                  <Container>
                    <Component {...rest}/>
                  </Container> 
              </> ) 
              : 
             <Component {...rest}/>
            }
            
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

const mapStatesToProps = ( state) => ({
  auth: state.login.data,
  loaded: state.login.loaded
});

export default connect(mapStatesToProps)(PrivateRoute);
