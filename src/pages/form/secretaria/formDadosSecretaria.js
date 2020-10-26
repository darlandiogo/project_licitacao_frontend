import React from 'react';
import { Grid, FormGroup, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Input, PrimaryButton } from '../../../components/form';

import { createEmpresa, updateEmpresa } from '../../../store/ducks/empresa';

const FormDadosSecretaria = (props) => {

    let { id, name, email } = props.empresa;
    let cnpj = "";
    if(props.empresa.pessoa_juridica){
        cnpj = props.empresa.pessoa_juridica.cnpj;
    }
    
    const { register, control, handleSubmit } = useForm();
    const onSubmit = data => data.id ? props.updateEmpresa(data.id, data) : props.createEmpresa(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader title="Secretaria"/>
                <CardContent>
                    
                <input type="hidden" name="id" defaultValue={id ? id : ""} ref={register} />
                <input type="hidden" name="type" defaultValue={"secretaria"} ref={register} />
                  <input type="hidden" name="razao_social" defaultValue={""} ref={register} />
                <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Nome da Secretaria"
                                    name="name"
                                    defaultValue={name ? name : ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="CNPJ"
                                    name="cnpj"
                                    defaultValue={cnpj ? cnpj : ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
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
    bindActionCreators({ createEmpresa, updateEmpresa }, dispatch);

export default connect( 
    null,
    mapDispatchToProps
)(FormDadosSecretaria);
