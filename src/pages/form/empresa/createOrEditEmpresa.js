import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  useParams } from "react-router-dom";

import Loading from "../../../components/loading";
import FormDadosEmpresa  from "./formDadosEmpresa";
import FormRepresentate from "./formRepresentante";
import FormAddress from "../common/formAddress";
import FormPhone from "../common/formPhone";
import { loadEmpresaById, updateAddress, updatePhone, updateRepresentante } from "../../../store/ducks/empresa";
import { loadListPessoa } from "../../../store/ducks/funcionario";

const CreateOrEditEmpresa = ({ loadEmpresaById, updateAddress, updateRepresentante, loadListPessoa, listPessoa, updatePhone, empresa, loaded, errors }) => {
    
    let { id } = useParams(); 
    useEffect(() => {
        if(id){
           loadEmpresaById(id);
        }
        loadListPessoa();
    },[loadListPessoa, loadEmpresaById, id])

    if(!loaded){
        return <Loading/>;
    }

    return (
        <div>
            <FormDadosEmpresa empresa={empresa}/>
            <br/>
            <FormAddress updateAddress={updateAddress} address={empresa && empresa.address ? empresa.address: empresa}/>
            <br/>
            <FormPhone updatePhone={updatePhone} phones={empresa && empresa.phones ? empresa.phones: []}/>
            <br/>
            <FormRepresentate empresa={empresa} updateRepresentante={updateRepresentante} listPessoa={listPessoa} />
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
    bindActionCreators({ loadEmpresaById, updateAddress, updatePhone, updateRepresentante, loadListPessoa }, dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(CreateOrEditEmpresa);