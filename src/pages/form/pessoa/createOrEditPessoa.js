import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  useParams } from "react-router-dom";

import Loading from "../../../components/loading";

import FormDadosPessoais  from "./formDadosPessoais";
import FormAddress from "./formAddress";

//import { validate } from "../../../helpers";

import { loadPessoaById } from "../../../store/ducks/pessoa";
const CreateOrEditPessoa = ({ loadPessoaById, pessoa, loaded, errors }) => {
    
    let { id } = useParams();

    let pes = {
        id: "",
        name: "",
        email: "",
        birth_date: ""
    }

    let add = { 
        pessoa_id: "", 
        address: "",
        number: "", 
        complement: "", 
        postal_code: "", 
        neighborhood: "", 
        city: "", 
        state: "", 
        loaded : ""
    }

    useEffect(() => {
        if(id){
           loadPessoaById(id);
        }
    },[])

    if(!loaded){
        return <Loading/>;
    }

    console.log(pessoa);

    return (
        <div>
            { pessoa ? <FormDadosPessoais pessoa={pessoa}/> : <FormDadosPessoais pessoa={pes}/> }
            <br/>
            {pessoa.address ? (<FormAddress address={pessoa.address}/>) : (<FormAddress address={add}/>) }
            
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