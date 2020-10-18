import React from 'react';
import { Grid, FormGroup, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Input, PrimaryButton } from '../../../components/form';

import { createPessoa, updatePessoa } from '../../../store/ducks/pessoa';

const FormDadosPessoais = (props) => {

    let { id, name, email, birth_date } = props.pessoa;
    let cpf, ci, type = "";
    if(props.pessoa.pessoa_fisica){
        cpf = props.pessoa.pessoa_fisica.cpf;
        ci  = props.pessoa.pessoa_fisica.ci;
        type = props.pessoa.pessoa_fisica.type;
    }

    const { register, control, handleSubmit } = useForm();
    const onSubmit = data => data.id ? props.updatePessoa(data.id, data) : props.createPessoa(data);

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
                                    required
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
                                    label="Nasc.(Ex.: 01/01/1999)"
                                    name="birth_date"
                                    defaultValue={birth_date ? birth_date : ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="CPF"
                                    name="cpf"
                                    defaultValue={cpf ? cpf : ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="C.I"
                                    name="ci"
                                    defaultValue={ci ? ci : ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    as={Input}
                                    control={control}
                                    label="Tipo"
                                    name="type"
                                    defaultValue={type ? type : ""}
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

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ createPessoa, updatePessoa }, dispatch);

export default connect( 
    null,
    mapDispatchToProps
)(FormDadosPessoais);
