import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
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
import ListLicitacao           from "../pages/form/licitacao/listLicitacao";
import ListSecretaria          from "../pages/form/secretaria/listSecretaria";
import CreateOrEditSecretaria  from "../pages/form/secretaria/createOrEditSecretaria";
import CreateOrEditLicitacao   from "../pages/form/licitacao/createOrEditLicitacao";

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
          path="/secretaria/edit/:id" 
          headerTitle='Editar Secretaria'
          breadcrumbsConfig={[{label: "secretaria", path: "/secretaria/edit/:id"}]}
          component={CreateOrEditSecretaria} />
          <PrivateRoute 
          path="/secretaria" 
          headerTitle='Cadastro Secretaria'
          breadcrumbsConfig={[{label: "secretaria", path: "/secretaria"}]}
          exact component={ListSecretaria} /> 
        <PrivateRoute 
          path="/secretaria/create" 
          headerTitle='Adicionar Secretaria'
          breadcrumbsConfig={[{label: "secretaria", path: "/secretaria/create"}]}
          component={CreateOrEditSecretaria} /> 
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
        <PrivateRoute 
          path="/licitacao" 
          headerTitle='Cadastro Licitacao'
          breadcrumbsConfig={[{label: "licitacao", path: "/licitacao"}]}
          exact component={ListLicitacao} />
        <PrivateRoute 
          path="/licitacao/create" 
          headerTitle='Adicionar Licitacao'
          breadcrumbsConfig={[{label: "licitacao", path: "/licitacao/create"}]}
          component={CreateOrEditLicitacao} /> 
        <PrivateRoute 
          path="/licitacao/edit/:id" 
          headerTitle='Editar Licitacao'
          breadcrumbsConfig={[{label: "licitacao", path: "/licitacao/edit/:id"}]}
          component={CreateOrEditLicitacao} />

        <Route path="*" component={Error} />  
      </Switch>
    </BrowserRouter>
  );
}