import React, { useEffect } from 'react';
import { Box, Button, Fab,  Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from 'react-router-dom';

import CustomTable from '../../../components/table';
import { InputWithIcon } from '../../../components/form';
import Loading from "../../../components/loading";
import CreateOrEditDialog from "../common/item/createOrEditDialog";
import { loadItemLicitacao, searchItemLicitacao } from "../../../store/ducks/item";
import { setDialog } from "../../../store/ducks/dialog";
import { loadItemById, resetItem } from "../../../store/ducks/item"; 

const ListLicitacaoItem = ({ loadItemLicitacao, searchItemLicitacao, loadItemById, resetItem, setDialog, id, item, loaded }) => {

    const history = useHistory();
    const _loadItemById = (id) => { 
        loadItemById(id);
        setDialog(true);
    }
    const addItem = (e) => {
        resetItem();
        setDialog(true);
    }

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
                                <Fab onClick={addItem} color="primary">
                                <AddIcon/>
                                </Fab>
                        </Box>
                    </Box>   

                    {<CustomTable 
                        headers={headers} 
                        showEdit={true}
                        showDelete={true}
                        handleEdit={(id) => _loadItemById(id)}
                        handleDelete={() => {}}
                        data={item}
                        parentHandlePagination={(page, perPage) => loadItemLicitacao(page, perPage)}
                    />}

                    < CreateOrEditDialog type="licitacao" type_id={id}/>
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
        loaded: state.item.loaded,
        id: state.licitacao.data.id || "",
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ loadItemLicitacao, searchItemLicitacao, setDialog, loadItemById, resetItem }, dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(ListLicitacaoItem);
  