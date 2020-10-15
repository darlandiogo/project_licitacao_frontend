import React from 'react';
import { Button, FormGroup, Card, CardHeader, CardContent, CardActions, Typography } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { Input, PrimaryButton } from '../../../components/form';

const FormDadosPessoais = ({ pessoa: { id, name, email, birth_date } }) => {
    
    const { register, control, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader title="Dados Pessoais"/>
                <CardContent>
                    
                <input type="hidden" name="id" defaultValue={id ? id : ""} ref={register} />

                    <FormGroup>
                        <Controller
                            as={Input}
                            control={control}
                            label="Nome"
                            name="name"
                            defaultValue={name ? name : ""}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Controller
                            as={Input}
                            control={control}
                            label="E-mail"
                            name="email"
                            defaultValue={email ? email : ""}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Controller
                            as={Input}
                            control={control}
                            label="Data de Nascimento"
                            name="birthy_date"
                            defaultValue={birth_date ? birth_date : ""}
                        />
                    </FormGroup>
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

export default FormDadosPessoais;