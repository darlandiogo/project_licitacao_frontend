import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  useParams } from "react-router-dom";

import Loading from "../../../components/loading";
import FormDadosPessoais  from "./formDadosPessoais";
import FormAddress from "./formAddress";
import FormPhone from "./formPhone";

import { loadPessoaById } from "../../../store/ducks/pessoa";
const CreateOrEditPessoa = ({ loadPessoaById, pessoa, loaded, errors }) => {
    
    let { id } = useParams(); 
    useEffect(() => {
        if(id){
           loadPessoaById(id);
        }
    },[])

    if(!loaded){
        return <Loading/>;
    }

    return (
        <div>
            <FormDadosPessoais pessoa={pessoa}/>
            <br/>
            <FormAddress address={pessoa.address ? pessoa.address: pessoa}/>
            <br/>
            <FormPhone phones={pessoa.phones ? pessoa.phones: []}/>
            
        </div>
    );
}

const mapStateToProps = ( state ) => {
    return {
        errors: state.pessoa.errors || [],
        pessoa: state.pessoa.data,
        loaded: state.pessoa.loaded
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ loadPessoaById }, dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(CreateOrEditPessoa);