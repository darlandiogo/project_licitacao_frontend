import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  useParams } from "react-router-dom";

import Loading from "../../../components/loading";
import FormCotacao from "./formCotacao";
import ListEmpresaCotacao from "./listEmpresaCotacao";
import ListCotacaoItem from "./listCotacaoItem";

import { loadCotacaoById, loadListEmpresa } from "../../../store/ducks/cotacao";

const CreateOrEditCotacao =  ({ loadCotacaoById, loadListEmpresa, listEmpresa, cotacao, loaded, errors  }) => {
    
    let { id } = useParams();  
    
    useEffect(() => {
        if(id){
            loadCotacaoById(id);
        }
        loadListEmpresa();
    },[loadCotacaoById, loadListEmpresa, id ])

    if(!loaded){
        return <Loading/>;
    }

    return (
        <>
            <FormCotacao cotacao={cotacao}/>
            <br/>
            {listEmpresa ? (<ListEmpresaCotacao cotacao={cotacao} listEmpresa={listEmpresa}/>) : (<> </>) }
            <br/>
            { cotacao && cotacao.id ? (<ListCotacaoItem/>) : (<> </>)}
        </>
    );
}

const mapStateToProps = ( state ) => {
    return {
        errors: state.cotacao.errors || [],
        cotacao: state.cotacao.data,
        loaded: state.cotacao.loaded,
        listEmpresa: state.cotacao.listEmpresa,
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ loadCotacaoById, loadListEmpresa }, dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(CreateOrEditCotacao);