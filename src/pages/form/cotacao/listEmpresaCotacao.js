import React, {useState, useCallback, useEffect} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, FormGroup, Box,  Card, CardHeader, CardContent, CardActions } from '@material-ui/core';

import { PrimaryButton } from "../../../components/form/index";
import Loading from "../../../components/loading";
import { loadCotacaoEmpresa, createCotacaoEmpresa, updateCotacaoEmpresa } from "../../../store/ducks/cotacao";

const ListEmpresaCotacao  = (props) => {

    
    let { listEmpresa } =  props;    
    const [empresas, setEmpresas] = useState(props.listEmpresas);
    const [value, setValue] = useState(''); 
    let _ref = React.createRef();
    let cotacao_id = null;

    if(props.cotacao){
        cotacao_id = props.cotacao.id;
    }
    
    useEffect(() => {
        if(cotacao_id){
            props.loadCotacaoEmpresa(cotacao_id);
        }
    },[props.loadCotacaoEmpresa, cotacao_id]);


    const onChangeValue = (event, values) => {
        event.preventDefault();
        if(values){
            setValue(values);
        }
    }

    const removeEmpresa = (index) => {
        let newList  = empresas.filter((_ ,_index) =>  _index !== index)
        setEmpresas(newList);

         // call submit
         console.log(index)
         props.updateCotacaoEmpresa(cotacao_id, {'pessoa_juridica': newList});
         //console.log({'cotacao': cotacao_id, 'pessoa_juridica': newList});

    } 
    const addEmpresa = (e) => {
        e.preventDefault();
        if(value !== ''){
            empresas.push({ ...value });
            setValue('');
            _ref.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0].click();
        } 

        // call submit
        props.createCotacaoEmpresa({'cotacao_id': cotacao_id, 'pessoa_juridica_id': value.id});
        //console.log({'cotacao': cotacao_id, 'pessoa_juridica_id': value.id});
    }

    const renderEmpresa = useCallback(() => {
        return (
            <List>
                {empresas && empresas.map( (item, index) => (
                    <ListItem key={index}>
                        <ListItemText
                        primary={`${item.name} (${item.cnpj})`}
                        secundary={null}
                        />

                        <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={ () => removeEmpresa(index)}>
                            <DeleteIcon />
                        </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        );
    }, [empresas]);


    if(!props.loaded){
        return <Loading/>;
    }

    return (
        <Card>
            <CardHeader title="Empresa"/>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={10}>
                        <FormGroup>
                        <Autocomplete
                            id="combo-box-demo"
                            ref={_ref}
                            options={listEmpresa}
                            onChange={onChangeValue}
                            getOptionLabel={(elem) => `${elem.name} (${elem.cnpj})`}
                            style={{ width: "100%" }}
                            renderInput={(params) => <TextField {...params} label="Empresa" />}
                        />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormGroup>
                            <PrimaryButton  
                                type="submit"  
                                variant="contained" 
                                color="primary"
                                label="Salvar" 
                                onClick={addEmpresa}>
                                <AddIcon/>
                            </PrimaryButton>
                        </FormGroup>
                    </Grid>
                </Grid>
                <Box>
                    {renderEmpresa()}
                </Box>
            </CardContent>
            <CardActions>
            
            </CardActions>
        </Card>
    );
}

const mapStateToProps = ( state ) => {
    return {
        listEmpresas: state.cotacao.cotacao_empresa || [],
        loaded: state.cotacao.loaded_cotacao_empresa,
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ loadCotacaoEmpresa, createCotacaoEmpresa, updateCotacaoEmpresa }, dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(ListEmpresaCotacao);
