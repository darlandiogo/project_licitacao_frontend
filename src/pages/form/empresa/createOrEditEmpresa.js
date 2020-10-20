import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  useParams } from "react-router-dom";

import Loading from "../../../components/loading";
import FormDadosEmpresa  from "./formDadosEmpresa";
import FormRepresentate from "./formRepresentante";
import FormAddress from "../common/formAddress";
import FormPhone from "../common/formPhone";
import { loadEmpresaById, updateAddress, updatePhone } from "../../../store/ducks/empresa";
import { loadListPessoa } from "../../../store/ducks/funcionario";

const CreateOrEditEmpresa = ({ loadEmpresaById, updateAddress, loadListPessoa, listPessoa, updatePhone, empresa, loaded, errors }) => {
    
    let { id } = useParams(); 
    useEffect(() => {
        if(id){
           loadEmpresaById(id);
        }
        loadListPessoa();
    },[])

    if(!loaded){
        return <Loading/>;
    }

    return (
        <div>
            <FormDadosEmpresa empresa={empresa}/>
            <br/>
            <FormAddress updateAddress={updateAddress} address={empresa.address ? empresa.address: empresa}/>
            <br/>
            <FormPhone updatePhone={updatePhone} phones={empresa.phones ? empresa.phones: []}/>
            <br/>
            <FormRepresentate representate={{}} listPessoa={listPessoa} />

            
        </div>
    );
}

const mapStateToProps = ( state ) => {
    return {
        errors: state.empresa.errors || [],
        empresa: state.empresa.data,
        listPessoa: state.funcionario.listPessoa,
        loaded: state.empresa.loaded
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ loadEmpresaById, updateAddress, updatePhone, loadListPessoa }, dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(CreateOrEditEmpresa);