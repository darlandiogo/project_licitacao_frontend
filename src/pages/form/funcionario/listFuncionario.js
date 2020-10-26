import React, { useEffect } from 'react';
import { Box, Button } from '@material-ui/core';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, useHistory } from 'react-router-dom';

import CustomTable from '../../../components/table';
import Loading from "../../../components/loading";
import { InputWithIcon } from '../../../components/form';

import { loadFuncionario, searchFuncionario  } from "../../../store/ducks/funcionario";

const ListFuncionario = ({ loadFuncionario, searchFuncionario, funcionario, loaded }) => {

    const history = useHistory();
    const loadFuncionarioById = (id) => history.push("funcionario/edit/"+id);

    useEffect(() => {
        loadFuncionario();
    },[loadFuncionario]);

     const [search, setSearch] = React.useState('');
    const handlerSearch = (e) => {
        searchFuncionario(e.target.value);
        setSearch(e.target.value);
    }
    const headers =  [
        //{ header: "ID",   field: "id"},
        { header: "Nome", field: "name"},
        { header: "C.I", field: "ci"},
        { header: "CPF", field: "cpf"},
        { header: "Cargo", field: "role"},
        { header: "Portaria", field: "portaria"},
    ];

    if(!loaded){
        return <Loading/>;
    }

    return (
        <Box>
            <Box style={{ display: 'flex', flex: 1, width: '100%' }}>
                <Box style={{flex:1, textAlign: 'start', marginBottom:20}}>
                    <InputWithIcon   
                        name="search_funcionario"
                        value={search}
                        type="text"
                        size="small"
                        autoComplete="text"
                        inputLabel="Pesquisar funcionario"
                        style={{width:"75%"}}
                        onChange={handlerSearch}
                    />
                </Box>
                <Box style={{flex:1, textAlign: 'end'}}>
                    <Link to="/funcionario/create" style={{textDecoration:"none", marginBottom: "5%"}}>
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
                handleEdit={(id) => loadFuncionarioById(id)}
                handleDelete={() => {}}
                data={funcionario}
                parentHandlePagination={(page, perPage) => loadFuncionario(page,perPage)}
            />}
        </Box>
    );
}

const mapStateToProps = ( state ) => {
    return {
        errors: state.funcionario.errors || [],
        funcionario: state.funcionario.data || [],
        loaded: state.funcionario.loaded
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ loadFuncionario, searchFuncionario }, dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(ListFuncionario);
  