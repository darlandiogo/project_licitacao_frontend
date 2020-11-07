import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  useParams } from "react-router-dom";

import Loading from "../../../components/loading";
import FormCotacao from "./formCotacao";
import ListCotacaoItem from "./listCotacaoItem";

import { loadCotacaoById } from "../../../store/ducks/cotacao";

const CreateOrEditCotacao =  ({ loadCotacaoById, cotacao, loaded, errors  }) => {
    
    let { id } = useParams();  
    
    useEffect(() => {
        if(id){
            loadCotacaoById(id);
        }

    },[loadCotacaoById, id ])

    if(!loaded){
        return <Loading/>;
    }

    return (
        <>
            <FormCotacao cotacao={cotacao}/>
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
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ loadCotacaoById }, dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(CreateOrEditCotacao);