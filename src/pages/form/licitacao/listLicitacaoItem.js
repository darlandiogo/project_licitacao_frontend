import React, { useEffect } from 'react';
import { Box, Button,  Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from 'react-router-dom';

import CustomTable from '../../../components/table';
import { InputWithIcon } from '../../../components/form';
import Loading from "../../../components/loading";
import { loadItemLicitacao, searchItemLicitacao } from "../../../store/ducks/item";

const ListLicitacaoItem = ({ loadItemLicitacao, searchItemLicitacao, item, loaded }) => {

    const history = useHistory();
    const loadItemById = (id) => console.log(id); //history.push("item/edit/"+id);
    const addItem = (e) => console.log("add");

    useEffect(() => {
        loadItemLicitacao();
    },[]);

    const [search, setSearch] = React.useState('');
    const handlerSearch = (e) => {
        searchItemLicitacao(e.target.value);
        setSearch(e.target.value);
    }

    const headers =  [
        { header: "Número", field: "number"},
        { header: "Especificação", field: "specification"},
        { header: "Unidade", field: "unity"},
        { header: "Quantidade", field: "quantity"},
        { header: "Valor Unitário",  field: "value"},
    ];  

    if(!loaded){
        return <Loading/>;
    }

    return (
        <Card>
            <CardHeader title="Items"/>
            <CardContent>
                <Button variant="contained" color="primary" style={{marginRight: 5}}>Importar</Button>
                <Button variant="contained" color="primary" style={{marginRight: 5}}>Exportar</Button>
                <Button variant="contained" color="primary">Remover todos</Button>
                <Box>
                    <Box style={{ display: 'flex', flex: 1, width: '100%' }}>
                        <Box style={{flex:1, textAlign: 'start', marginBottom:20}}>
                            <InputWithIcon   
                                name="search"
                                value={search}
                                type="text"
                                size="small"
                                autoComplete="text"
                                inputLabel="Pesquisar item"
                                style={{width:"75%"}}
                                onChange={handlerSearch}
                            />
                        </Box>
                        <Box style={{flex:1, textAlign: 'end'}}>
                                <Button onClick={addItem} variant="contained" color="primary">
                                <AddIcon/>
                                </Button>
                        </Box>
                    </Box>   

                    {<CustomTable 
                        headers={headers} 
                        showEdit={true}
                        showDelete={true}
                        handleEdit={(id) => loadItemById(id)}
                        handleDelete={() => {}}
                        data={item}
                        parentHandlePagination={(page, perPage) => loadItemLicitacao(page, perPage)}
                    />}
                </Box>
            </CardContent>
            <CardActions>
            
            </CardActions>
        </Card>
    );
}

const mapStateToProps = ( state ) => {
    return {
        errors: state.item.errors || [],
        item: state.item.data || [],
        loaded: state.item.loaded
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ loadItemLicitacao, searchItemLicitacao }, dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(ListLicitacaoItem);
  