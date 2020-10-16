import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, useHistory } from 'react-router-dom';

import CustomTable from '../../../components/table';
import { PrimaryButton } from '../../../components/form';
import Loading from "../../../components/loading";
import { loadPessoa } from "../../../store/ducks/pessoa";

const ListPessoa = ({ loadPessoa, pessoa, loaded }) => {

    const history = useHistory();
    const loadPessoaById = (id) => history.push("pessoa/edit/"+id);

    useEffect(() => {
        loadPessoa();
    },[]);

    const headers =  [
        { header: "ID",   field: "id"},
        { header: "Nome", field: "name"},
        { header: "E-mail", field: "email"},
    ];

    if(!loaded){
        return <Loading/>;
    }

    return (
        <Box>
            <Link to="/pessoa/create">
                Adicionar
            </Link>

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
    bindActionCreators({ loadPessoa }, dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(ListPessoa);
  