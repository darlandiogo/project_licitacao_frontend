import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  useParams } from "react-router-dom";

import { loadLicitacaoById, selectOptions } from "../../../store/ducks/licitacao";
import { loadSecretaria } from "../../../store/ducks/empresa";

import Loading from "../../../components/loading";
import FormLicitacao from "./formLicitacao";
import ListLicitacaoItem from "./listLicitacaoItem";

const CreateOrEditLicitacao =  ({ loadLicitacaoById, selectOptions, listSelectOptions, loadSecretaria,  listSecretaria, licitacao, loaded, loaded2, errors  }) => {
    
    let { id } = useParams();  
    
    useEffect(() => {
        if(id){
            loadLicitacaoById(id);
        }
        loadSecretaria(1,100);
        selectOptions();
    },[loadLicitacaoById, id, loadSecretaria, selectOptions])

    if(!loaded || !loaded2){
        return <Loading/>;
    }

    return (
        <>
            <FormLicitacao 
                licitacao={licitacao}
                listSecretaria={listSecretaria}
                listSelectOptions={listSelectOptions}
            />
            <br/>
            { licitacao && licitacao.id ? (<ListLicitacaoItem/>) : (<> </>)}
        </>
    );
}

const mapStateToProps = ( state ) => {
    return {
        errors: state.licitacao.errors || [],
        licitacao: state.licitacao.data,
        listSelectOptions : state.licitacao.selectOptions || [],
        listSecretaria: state.empresa.data || [],
        loaded: state.licitacao.loaded,
        loaded2: state.empresa.loaded
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ loadLicitacaoById, selectOptions, loadSecretaria }, dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(CreateOrEditLicitacao);