import React, { useEffect } from 'react';
import { Box, Button } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, useHistory } from 'react-router-dom';

import CustomTable from '../../../components/table';
import { InputWithIcon } from '../../../components/form';
import Loading from "../../../components/loading";
import { loadPessoa, searchPessoa } from "../../../store/ducks/pessoa";

const ListPessoa = ({ loadPessoa, searchPessoa, pessoa, loaded }) => {

    const history = useHistory();
    const {  control } = useForm();
    const loadPessoaById = (id) => history.push("pessoa/edit/"+id);
    

    useEffect(() => {
        loadPessoa();
    },[]);

    const [search, setSearch] = React.useState('');
    const handlerSearch = (e) => {
        console.log(e.target.value);
        searchPessoa(e.target.value);
        setSearch(e.target.value);
    }

    const headers =  [
        //{ header: "ID",   field: "id"},
        { header: "Nome", field: "name"},
        { header: "C.I", field: "ci"},
        { header: "CPF", field: "cpf"},
        { header: "Qualificação", field: "type"},
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
                        inputLabel="Pesquisar pessoa"
                        style={{width:"75%"}}
                        onChange={handlerSearch}
                    />
                </Box>
                <Box style={{flex:1, textAlign: 'end'}}>
                    <Link to="/pessoa/create" style={{textDecoration:"none", marginBottom: "5%"}}>
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
                handleEdit={(id) => loadPessoaById(id)}
                handleDelete={() => {}}
                data={pessoa}
                parentHandlePagination={(page, perPage) => loadPessoa(page,perPage)}
            />}
        </Box>
    );
}

const mapStateToProps = ( state ) => {
    return {
        errors: state.pessoa.errors || [],
        pessoa: state.pessoa.data || [],
        loaded: state.pessoa.loaded
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ loadPessoa, searchPessoa }, dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(ListPessoa);
  