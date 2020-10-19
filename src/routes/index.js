import React from "react";
import { BrowserRouter, Switch, Route,  Link } from "react-router-dom";
import PrivateRoute from "./private_route";

// pages
import Login                   from  "../pages/login";
import Error                   from  "../pages/error";
import Dashboard               from  "../pages/dashboard";
import ListPessoa              from  "../pages/form/pessoa/listPessoa";
import CreateOrEditPessoa      from  "../pages/form/pessoa/createOrEditPessoa";
import ListFuncionario         from  "../pages/form/funcionario/listFuncionario";
import createOrEditFuncionario from  "../pages/form/funcionario/createOrEditFuncionario";
import ListEmpresa             from "../pages/form/empresa/listEmpresa";
import CreateOrEditEmpresa     from "../pages/form/empresa/createOrEditEmpresa";

export default function Routes() {
  return (
    <BrowserRouter basename={""}>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute 
          path="/dashboard" 
          headerTitle='Dashboard' 
          breadcrumbsConfig={[{label: "dashboard", path: "/dashboard"}]}
          exact component={Dashboard} />
        <PrivateRoute 
          path="/empresa" 
          headerTitle='Cadastro Empresa'
          breadcrumbsConfig={[{label: "empresa", path: "/empresa"}]}
          exact component={ListEmpresa} /> 
        <PrivateRoute 
          path="/empresa/create" 
          headerTitle='Adicionar Empresa'
          breadcrumbsConfig={[{label: "empresa", path: "/empresa/create"}]}
          component={CreateOrEditEmpresa} /> 
        <PrivateRoute 
          path="/empresa/edit/:id" 
          headerTitle='Editar Empresa'
          breadcrumbsConfig={[{label: "empresa", path: "/empresa/edit/:id"}]}
          component={CreateOrEditEmpresa} />
        <PrivateRoute 
          path="/pessoa" 
          headerTitle='Cadastro Pessoa'
          breadcrumbsConfig={[{label: "pessoa", path: "/pessoa"}]}
          exact component={ListPessoa} /> 
        <PrivateRoute 
          path="/pessoa/create" 
          headerTitle='Adicionar Pessoa'
          breadcrumbsConfig={[{label: "pessoa", path: "/pessoa/create"}]}
          component={CreateOrEditPessoa} /> 
        <PrivateRoute 
          path="/pessoa/edit/:id" 
          headerTitle='Editar Pessoa'
          breadcrumbsConfig={[{label: "pessoa", path: "/pessoa/edit/:id"}]}
          component={CreateOrEditPessoa} /> 
        <PrivateRoute 
          path="/funcionario" 
          headerTitle='Cadastro Funcionario'
          breadcrumbsConfig={[{label: "funcionario", path: "/funcionario"}]}
          exact component={ListFuncionario} /> 
        <PrivateRoute 
          path="/funcionario/create" 
          headerTitle='Adicionar Funcionario'
          breadcrumbsConfig={[{label: "funcionario", path: "/funcionario/create"}]}
          component={createOrEditFuncionario} /> 
        <PrivateRoute 
          path="/funcionario/edit/:id" 
          headerTitle='Editar Funcionario'
          breadcrumbsConfig={[{label: "funcionario", path: "/funcionario/edit/:id"}]}
          component={createOrEditFuncionario} /> 

        <Route path="*" component={Error} />  
      </Switch>
    </BrowserRouter>
  );
}