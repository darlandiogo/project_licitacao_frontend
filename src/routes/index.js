import React from "react";
import { BrowserRouter, Switch, Route,  Link } from "react-router-dom";
import PrivateRoute from "./private_route";

// pages
import Login  from "../pages/login";
import Error from  "../pages/error";
import Dashboard from "../pages/dashboard";
import FormPessoa from  "../pages/form/formPessoa";

const basename = ""

export default function Routes() {
    return (
      <BrowserRouter basename={basename}>
        <Switch>
          <Route path="/" exact component={Login} />
          <PrivateRoute 
            path="/dashboard" 
            headerTitle='Dashboard' 
            breadcrumbsConfig={[{label: "dashboard", path: "/dashboard"}]}
            exact component={Dashboard} /> 
          <PrivateRoute 
            path="/pessoa" 
            headerTitle='Cadastro Pessoa'
            breadcrumbsConfig={[{label: "pessoa", path: "/pessoa"}]}
            exact component={FormPessoa} /> 
          <Route path="*" component={Error} />  
            
        </Switch>
      </BrowserRouter>
    );
}