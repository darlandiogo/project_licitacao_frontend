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
import { loadItemById, resetItem, deleteItem, exportItem, importItem } from "../../../store/ducks/item"; 

const ListLicitacaoItem = ({ 
    loadItemLicitacao, 
    searchItemLicitacao, 
    loadItemById, 
    deleteItem, 
    exportItem, 
    importItem, 
    resetItem, 
    setDialog, 
    id, 
    item, 
    loaded 
}) => {

    const history = useHistory();
    const _loadItemById = (id) => { 
        loadItemById(id);
        setDialog(true);
    }
    const _deleteItem = (id) => deleteItem({id: id, type: 'licitacao'}); 
    
    const addItem = (e) => {
        resetItem();
        setDialog(true);
    }

    const exportHandle = () => exportItem({type_id: id, type: 'licitacao'});

    const importHandle = (event) => {
        
        event.preventDefault();

        var input = event.target;

        var reader = new FileReader();
        reader.onload = () => {
            let str  =  reader.result.split(";");
            let file = str[1].replace("base64,", "");
            importItem({type_id: id, type: 'licitacao', file: file});
            document.querySelector('#_ref').value = ""; 
        }
 

        reader.readAsDataURL(input.files[0]); //readAsBinaryString // readAsDataURL
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
                <Button
                    color="primary" 
                    style={{marginRight: 5}} 
                    variant="contained"
                    component="label"
                    onChange={importHandle}
                    >
                    Importar
                    <input
                        type="file"
                        id="_ref"
                        style={{ display: "none" }}
                />
                </Button>

                <Button variant="contained" color="primary" style={{marginRight: 5}} onClick={exportHandle}>Exportar</Button>
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
                        handleEdit={(id)   => _loadItemById(id)}
                        handleDelete={(id) => _deleteItem(id)}
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ 
    loadItemLicitacao, 
    searchItemLicitacao, 
    setDialog, 
    loadItemById, 
    deleteItem, 
    exportItem, 
    importItem, 
    resetItem }, 
dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(ListLicitacaoItem);
  