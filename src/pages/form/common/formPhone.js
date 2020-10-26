import React, {useState, useCallback} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import {  Grid, FormGroup, Button, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { useForm } from "react-hook-form";

import { Input, PrimaryButton } from '../../../components/form';

const FormPhone = (props) => {

    const [phones, setPhones] = useState(props.phones || []);
    const [number,setNumber] = useState('');

    const { register, handleSubmit } = useForm();
    const onSubmit = data => props.updatePhone(data); 

    const removeNumber = (index) => {
        let newList  = phones.filter((_ ,_index) =>  _index !== index)
        setPhones(newList);
    } 
    const addNumber = (e) => {
        e.preventDefault();
        if(number !== ''){
            phones.push({ number : number });
            setNumber('');
        } 
    }

    const renderPhones = useCallback(() => {
            return (
                <List>
                    {phones && phones.map( (item, index) => (
                        <ListItem key={index}>
                            <ListItemText
                            primary={item.number}
                            secundary={null}
                            />
                            <input 
                            type="hidden" 
                            name={"numbers["+index+"]"} 
                            value={item.number} ref={register}/>

                            <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={ () => removeNumber(index)}>
                                <DeleteIcon />
                            </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            );
    }, [phones]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader title="Telefones"/>
                <CardContent>
                    
                    <input 
                        type="hidden" 
                        name={"pessoa_id"} 
                        defaultValue={phones[0] ? phones[0].pessoa_id : ""} 
                        ref={register}
                    />

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={10}>
                            <FormGroup>
                                <Input
                                    label="Numero"
                                    name="number"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <FormGroup>
                                <Button variant="contained" color="primary" onClick={addNumber}>
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

export default FormPhone;
