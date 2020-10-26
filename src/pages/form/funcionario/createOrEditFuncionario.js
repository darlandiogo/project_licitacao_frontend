import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  useParams } from "react-router-dom";

import { loadFuncionarioById, loadListPessoa } from "../../../store/ducks/funcionario";

import Loading from "../../../components/loading";
import FormFuncionario from "./formFuncionario";

const CreateOrEditFuncionario = ({ loadFuncionarioById, loadListPessoa, listPessoa, funcionario, loaded, errors }) => {
    
    let { id } = useParams();  
    
    useEffect(() => {
        if(id){
           loadFuncionarioById(id);
        }
        loadListPessoa();
    },[loadFuncionarioById, loadListPessoa, id])

    if(!loaded){
        return <Loading/>;
    }

    return (
        <FormFuncionario
            listPessoa={listPessoa}
            funcionario={funcionario}
        />
    );
}

const mapStateToProps = ( state ) => {
    return {
        errors: state.funcionario.errors || [],
        funcionario: state.funcionario.data,
        listPessoa: state.funcionario.listPessoa,
        loaded: state.funcionario.loaded
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ loadFuncionarioById, loadListPessoa }, dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(CreateOrEditFuncionario);