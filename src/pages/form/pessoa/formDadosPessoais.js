import React from 'react';
import { Grid, FormGroup, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
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
                <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    as={Input}
                                    control={control}
                                    label="Nome"
                                    name="name"
                                    defaultValue={name ? name : ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    as={Input}
                                    control={control}
                                    label="E-mail"
                                    name="email"
                                    defaultValue={email ? email : ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    as={Input}
                                    control={control}
                                    label="Data de Nasc. (00/00/0000)"
                                    name="birthy_date"
                                    defaultValue={birth_date ? birth_date : ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    as={Input}
                                    control={control}
                                    label="CPF"
                                    name="cpf"
                                    defaultValue={""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    as={Input}
                                    control={control}
                                    label="C.I"
                                    name="ci"
                                    defaultValue={""}
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
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