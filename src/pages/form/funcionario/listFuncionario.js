import React, { useEffect } from 'react';
import { Box, Button } from '@material-ui/core';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, useHistory } from 'react-router-dom';

import CustomTable from '../../../components/table';
import Loading from "../../../components/loading";

import { loadFuncionario } from "../../../store/ducks/funcionario";

const ListFuncionario = ({ loadFuncionario, funcionario, loaded }) => {

    const history = useHistory();
    const loadFuncionarioById = (id) => history.push("funcionario/edit/"+id);

    useEffect(() => {
        loadFuncionario();
    },[]);

    const headers =  [
        { header: "ID",   field: "id"},
        { header: "Nome", field: "name"},
        { header: "E-mail", field: "email"},
    ];

    if(!loaded){
        return <Loading/>;
    }

    console.log(funcionario);

    return (
        <Box>
            <Link to="/funcionario/create" style={{textDecoration:"none", marginBottom: "5%"}}>
                <Button variant="contained" color="primary">
                    Adicionar
                </Button>
            </Link>
            <hr/>

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
    bindActionCreators({ loadFuncionario }, dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(ListFuncionario);
  