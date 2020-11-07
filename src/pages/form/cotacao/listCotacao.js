import React, { useEffect } from 'react';
import { Box, Button } from '@material-ui/core';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, useHistory } from 'react-router-dom';

import CustomTable from '../../../components/table';
import { InputWithIcon } from '../../../components/form';
import Loading from "../../../components/loading";
import { loadCotacao, searchCotacao } from "../../../store/ducks/cotacao";

const ListCotacao = ({ loadCotacao, searchCotacao, cotacao, loaded }) => {

    const history = useHistory();
    const loadCotacaoById = (id) => history.push("cotacao/edit/"+id);
    

    useEffect(() => {
        loadCotacao();
    },[loadCotacao]);

    const [search, setSearch] = React.useState('');
    const handlerSearch = (e) => {
        searchCotacao(e.target.value);
        setSearch(e.target.value);
    }

    const headers =  [
        { header: "Processo", field: "process_number"},
        { header: "Objetivo", field: "purpose_bidding"},
        { header: "Data da Solicitacão", field: "process_date"},
    ];  

    if(!loaded){
        return <Loading/>;
    }

    return (
        <Box>
            <Box style={{ display: 'flex', flex: 1, width: '100%' }}>
                <Box style={{flex:1, textAlign: 'start', marginBottom:20}}>
                    <InputWithIcon   
                        name="search"
                        value={search}
                        type="text"
                        size="small"
                        autoComplete="text"
                        inputLabel="Pesquisar cotacao"
                        style={{width:"75%"}}
                        onChange={handlerSearch}
                    />
                </Box>
                <Box style={{flex:1, textAlign: 'end'}}>
                    <Link to="/cotacao/create" style={{textDecoration:"none", marginBottom: "5%"}}>
                        <Button variant="contained" color="primary">
                            Adicionar
                        </Button>
                    </Link>
                </Box>
            </Box>   

            {<CustomTable 
                headers={headers} 
                showEdit={true}
                showDelete={true}
                handleEdit={(id) => loadCotacaoById(id)}
                handleDelete={() => {}}
                data={cotacao}
                parentHandlePagination={(page, perPage) => loadCotacao(page,perPage)}
            />}
        </Box>
    );
}

const mapStateToProps = ( state ) => {
    return {
        errors: state.cotacao.errors || [],
        cotacao: state.cotacao.data || [],
        loaded: state.cotacao.loaded
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ loadCotacao, searchCotacao }, dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(ListCotacao);
  