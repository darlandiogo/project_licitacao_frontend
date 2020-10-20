import React, {useState, useCallback} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { Grid, FormGroup, Button, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { useForm } from "react-hook-form";

import { PrimaryButton } from '../../../components/form';

const FormRepresentante = (props) => {

    const [representantes, setRepresentantes] = useState(props.representantes || []);
    const [value,setValue] = useState('Selecione...');

    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);//props.updatePhone(data); 

    const removeRepresentante = (index) => {
        let newList  = representantes.filter((_ ,_index) =>  _index != index)
        setRepresentantes(newList);
    } 
    const addRepresentante = (e) => {
        console.log('hhe');
        e.preventDefault();
        if(value != ''){
            representantes.push({ ...value });
            setValue('');
        } 
    }

    const onChangeValue = (event, values) => {
        event.preventDefault();
        if(values){
            setValue(values);
        }
    }

    const renderPhones = useCallback(() => {
        return (
            <List>
                {representantes && representantes.map( (item, index) => (
                    <ListItem key={index}>
                        <ListItemText
                        primary={`${item.name} (${item.cpf}) `}
                        secundary={null}
                        />
                        <input 
                        type="hidden" 
                        name={"values["+index+"]"} 
                        value={item.id} ref={register}/>

                        <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={ () => removeRepresentante(index)}>
                            <DeleteIcon />
                        </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        );
    }, [representantes]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader title="Representantes"/>
                <CardContent>
                    
                    <input 
                        type="hidden" 
                        name={"pessoa_id"} 
                        defaultValue={representantes[0] ? representantes[0].pessoa_id : ""} 
                        ref={register}
                    />

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={10}>
                            <FormGroup>
                            <Autocomplete
                                id="combo-box-demo"
                                options={props.listPessoa}
                                onChange={onChangeValue}
                                getOptionLabel={(elem) => `${elem.name} (${elem.cpf})`}
                                style={{ width: "100%" }}
                                renderInput={(params) => <TextField {...params} label="Representante" />}
                            />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <FormGroup>
                                <Button variant="contained" color="primary" onClick={addRepresentante}>
                                    <AddIcon/>
                                </Button>
                            </FormGroup>
                        </Grid>
                    </Grid>

                {renderPhones()}

                </CardContent>
                <CardActions>
                    <PrimaryButton
                    type="submit"
                    variant="contained" 
                    color="primary"
                    label="Salvar"
                    />
                </CardActions>
            </Card>
        </form>
    );
}

export default FormRepresentante;
