import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { FormGroup, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { Input, PrimaryButton } from '../../../components/form';

const FormPhone = ({ phones }) => {
    
    const [dense, setDense] = React.useState(false);
    const { register, control, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader title="Telefones"/>
                <CardContent>
                    
                <List dense={dense}>
                        {phones && phones.map( (item, index) => (
                            <ListItem key={index}>
                            <ListItemText
                            primary={item.number}
                            secundary={null}
                            />
                            <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>

                        ))}
                    </List>

                    {/*<FormGroup>
                        <Controller
                            as={Input}
                            control={control}
                            label="Nome"
                            name="name"
                            defaultValue={name ? name : ""}
                        />
                    </FormGroup>
                    */}
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