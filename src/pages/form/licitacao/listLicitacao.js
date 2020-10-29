import React, { useEffect } from 'react';
import { Box, Button } from '@material-ui/core';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, useHistory } from 'react-router-dom';

import CustomTable from '../../../components/table';
import { InputWithIcon } from '../../../components/form';
import Loading from "../../../components/loading";
import { loadLicitacao, searchLicitacao } from "../../../store/ducks/licitacao";

const ListLicitacao = ({ loadLicitacao, searchLicitacao, licitacao, loaded }) => {

    const history = useHistory();
    const loadLicitacaoById = (id) => history.push("licitacao/edit/"+id);
    

    useEffect(() => {
        loadLicitacao();
    },[loadLicitacao]);

    const [search, setSearch] = React.useState('');
    const handlerSearch = (e) => {
        searchLicitacao(e.target.value);
        setSearch(e.target.value);
    }

    const headers =  [
        { header: "Número", field: "process_number"},
        { header: "Numero do Proc. Adm.", field: "bidding_number"},
        { header: "Data do Proc. Adm.", field: "process_date"},
        { header: "Objetivo", field: "bidding_objective"},
        { header: "Valor Total",  field: "value"},
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
                        inputLabel="Pesquisar licitacao"
                        style={{width:"75%"}}
                        onChange={handlerSearch}
                    />
                </Box>
                <Box style={{flex:1, textAlign: 'end'}}>
                    <Link to="/licitacao/create" style={{textDecoration:"none", marginBottom: "5%"}}>
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
                handleEdit={(id) => loadLicitacaoById(id)}
                handleDelete={() => {}}
                data={licitacao}
                parentHandlePagination={(page, perPage) => loadLicitacao(page,perPage)}
            />}
        </Box>
    );
}

const mapStateToProps = ( state ) => {
    return {
        errors: state.licitacao.errors || [],
        licitacao: state.licitacao.data || [],
        loaded: state.licitacao.loaded
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ loadLicitacao, searchLicitacao }, dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(ListLicitacao);
  