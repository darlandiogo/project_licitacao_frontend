import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CustomTable from '../../components/table';
import { loadPessoa } from "../../store/ducks/pessoa";

const FormPessoa = ({ loadPessoa, pessoa, loaded }) => {


    useEffect(()=>{
        console.log("here");
        loadPessoa();
    },[]);

    const headers =  [
        { header: "ID",   field: "id"},
        { header: "Nome",   field: "ci"},
        { header: "Email",   field: "cpf"},
    ];

    const users = [
        {
            id: 1,
            name: 'Darlan',
            email: 'darlandiogo@hotmail.com',
            phones: '219664554545'
        },
        {
            id: 2,
            name: 'Darlan',
            email: 'darlandiogo@hotmail.com',
            phones: '219664554545'
        }
    ];

    const page = 1;
    const perPage = 10;

    const getPerfil = (page ,perPage) => {
        
    }

    const initPerfilForm = (id) => {

    }

    console.log(loaded)

    if(!loaded){
        return <div>Carregando...</div>
    }

    return (
        <Box>
            Cadastro de Pessoa

            {<CustomTable 
                        headers={headers} 
                        showEdit={true}
                        handleEdit={(id) => initPerfilForm(id)}
                        handleDelete={() => {}}
                        data={pessoa}
                        parentHandlePagination={(page, perPage ) => getPerfil(page,perPage)}
                />  }
        </Box>
    );
}

//export default FormPessoa;

const mapStateToProps = ( state ) => {
    return {
        errors: state.pessoa.errors || [],
        pessoa: state.pessoa.data,
        loaded: state.pessoa.loaded
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ loadPessoa }, dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(FormPessoa);
  