import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  useParams } from "react-router-dom";

import Loading from "../../../components/loading";
import FormDadosEmpresa  from "./formDadosEmpresa";
import FormAddress from "../common/formAddress";
import FormPhone from "../common/formPhone";
import { loadEmpresaById, updateAddress, updatePhone } from "../../../store/ducks/empresa";

const CreateOrEditEmpresa = ({ loadEmpresaById, updateAddress, updatePhone, empresa, loaded, errors }) => {
    
    let { id } = useParams(); 
    useEffect(() => {
        if(id){
           loadEmpresaById(id);
        }
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
            
        </div>
    );
}

const mapStateToProps = ( state ) => {
    return {
        errors: state.empresa.errors || [],
        empresa: state.empresa.data,
        loaded: state.empresa.loaded
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ loadEmpresaById, updateAddress, updatePhone }, dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(CreateOrEditEmpresa);