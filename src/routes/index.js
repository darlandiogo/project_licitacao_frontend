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
import ListCotacao             from "../pages/form/cotacao/listCotacao"
import ListSecretaria          from "../pages/form/secretaria/listSecretaria";
import CreateOrEditSecretaria  from "../pages/form/secretaria/createOrEditSecretaria";
import CreateOrEditLicitacao   from "../pages/form/licitacao/createOrEditLicitacao";
import CreateOrEditCotacao     from "../pages/form/cotacao/createOrEditCotacao";

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
          breadcrumbsConfig={[
            {label: "empresa", path: "/empresa"},
            {label: "adicionar", path: "/empresa/create"}
          ]}
          component={CreateOrEditEmpresa} /> 
          <PrivateRoute 
          path="/empresa/edit/:id" 
          headerTitle='Editar Empresa'
          breadcrumbsConfig={[
            {label: "empresa", path: "/empresa"},
            {label: "editar", path: "/empresa/edit/:id"}
          ]}
          component={CreateOrEditEmpresa} />

          <PrivateRoute 
          path="/secretaria" 
          headerTitle='Cadastro Secretaria'
          breadcrumbsConfig={[{label: "secretaria", path: "/secretaria"}]}
          exact component={ListSecretaria} /> 
        <PrivateRoute 
          path="/secretaria/create" 
          headerTitle='Adicionar Secretaria'
          breadcrumbsConfig={[
            {label: "secretaria", path: "/secretaria"},
            {label: "adicionar", path: "/secretaria/create"}
          ]}
          component={CreateOrEditSecretaria} /> 

        <PrivateRoute 
          path="/secretaria/edit/:id" 
          headerTitle='Editar Secretaria'
          breadcrumbsConfig={[
            {label: "secretaria", path: "/secretaria"},
            {label: "editar", path: "/secretaria/edit/:id"}
          ]}
          component={CreateOrEditSecretaria} />
        
        
        <PrivateRoute 
          path="/pessoa" 
          headerTitle='Cadastro Pessoa'
          breadcrumbsConfig={[{label: "pessoa", path: "/pessoa"}]}
          exact component={ListPessoa} /> 

        <PrivateRoute 
          path="/pessoa/create" 
          headerTitle='Adicionar Pessoa'
          breadcrumbsConfig={[
            {label: "pessoa", path: "/pessoa"},
            {label: "adicionar", path: "/pessoa/create"}
        ]}
          component={CreateOrEditPessoa} /> 

        <PrivateRoute 
          path="/pessoa/edit/:id" 
          headerTitle='Editar Pessoa'
          breadcrumbsConfig={[
            {label: "pessoa", path: "/pessoa"},
            {label: "editar", path: "/pessoa/edit/:id"},
          ]}
          component={CreateOrEditPessoa} /> 

        <PrivateRoute 
          path="/funcionario" 
          headerTitle='Cadastro Funcionário'
          breadcrumbsConfig={[{label: "funcionário", path: "/funcionario"}]}
          exact component={ListFuncionario} /> 
        <PrivateRoute 
          path="/funcionario/create" 
          headerTitle='Adicionar Funcionário'
          breadcrumbsConfig={[
            {label: "funcionário", path: "/funcionario"},
            {label: "adicionar", path: "/funcionario/create"},
          ]}
          component={createOrEditFuncionario} /> 
        <PrivateRoute 
          path="/funcionario/edit/:id" 
          headerTitle='Editar Funcionário'
          breadcrumbsConfig={[
            {label: "funcionário", path: "/funcionario"},
            {label: "editar", path: "/funcionario/edit/:id"}
          ]}
          component={createOrEditFuncionario} />
        <PrivateRoute 
          path="/licitacao" 
          headerTitle='Cadastro Licitação'
          breadcrumbsConfig={[{label: "licitação", path: "/licitacao"}]}
          exact component={ListLicitacao} />
        <PrivateRoute 
          path="/licitacao/create" 
          headerTitle='Adicionar Licitação'
          breadcrumbsConfig={[
            {label: "licitação", path: "/licitacao"},
            {label: "adicionar", path: "/licitacao/create"},
          ]}
          component={CreateOrEditLicitacao} /> 
        <PrivateRoute 
          path="/licitacao/edit/:id" 
          headerTitle='Editar Licitação'
          breadcrumbsConfig={[
            {label: "licitação", path: "/licitacao"},
            {label: "editar", path: "/licitacao/edit/:id"},
          ]}
          component={CreateOrEditLicitacao} />

        <PrivateRoute 
          path="/cotacao" 
          headerTitle='Cadastro Licitação'
          breadcrumbsConfig={[{label: "cotação", path: "/cotacao"}]}
          exact component={ListCotacao} />

        <PrivateRoute 
          path="/cotacao/create" 
          headerTitle='Adicionar Cotaçao'
          breadcrumbsConfig={[
            {label: "cotação", path: "/cotacao"},
            {label: "adicionar", path: "/cotacao/create"},
          ]}
          component={CreateOrEditCotacao} /> 
        <PrivateRoute 
          path="/cotacao/edit/:id" 
          headerTitle='Editar Cotação'
          breadcrumbsConfig={[
            {label: "cotação", path: "/cotacao"},
            {label: "editar", path: "/cotacao/edit/:id"},
          ]}
          component={CreateOrEditCotacao} />

        <Route path="*" component={Error} />  
      </Switch>
    </BrowserRouter>
  );
}