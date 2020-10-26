import React, { useEffect } from 'react';
import { Box, Button } from '@material-ui/core';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, useHistory } from 'react-router-dom';

import CustomTable from '../../../components/table';
import Loading from "../../../components/loading";
import { InputWithIcon } from '../../../components/form';

import { loadEmpresa, searchEmpresa } from "../../../store/ducks/empresa";

const ListEmpresa = ({ loadEmpresa, searchEmpresa, empresa, loaded }) => {

    const history = useHistory();
    const loadEmpresaById = (id) => history.push("empresa/edit/"+id);

    useEffect(() => {
        loadEmpresa();
    },[loadEmpresa]);

    const [search, setSearch] = React.useState('');
    const handlerSearch = (e) => {
        searchEmpresa(e.target.value);
        setSearch(e.target.value);
    }

    const headers =  [
        //{ header: "ID",   field: "id"},
        { header: "CNPJ", field: "cnpj"},
        { header: "Nome Fantasia", field: "nome_fantasia"},
        { header: "Razão Social", field: "razao_social"},
        { header: "Tipo", field: "type"},
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
                        inputLabel="Pesquisar empresa"
                        style={{width:"75%"}}
                        onChange={handlerSearch}
                    />
                </Box>
                <Box style={{flex:1, textAlign: 'end'}}>
                    <Link to="/empresa/create" style={{textDecoration:"none", marginBottom: "5%"}}>
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
                handleEdit={(id) => loadEmpresaById(id)}
                handleDelete={() => {}}
                data={empresa}
                parentHandlePagination={(page, perPage) => loadEmpresa(page,perPage)}
            />}
        </Box>
    );
}

const mapStateToProps = ( state ) => {
    return {
        errors: state.empresa.errors || [],
        empresa: state.empresa.data || [],
        loaded: state.empresa.loaded
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ loadEmpresa, searchEmpresa }, dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(ListEmpresa);
  