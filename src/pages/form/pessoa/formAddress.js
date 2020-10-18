import React from 'react';
import { FormGroup, Card, CardHeader, CardContent, CardActions, Grid } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Input, PrimaryButton } from '../../../components/form';
import {updateAddress} from "../../../store/ducks/pessoa";

const FormAddress =  (props) => {

    let { id, pessoa_id, address, number, complement, postal_code, neighborhood, city, state } = props.address;
    
    const { register, control, handleSubmit } = useForm();
    const onSubmit = data => props.updateAddress(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader title="Endereço"/>
                <CardContent>    
                    <input type="hidden" name="pessoa_id" defaultValue={pessoa_id ? pessoa_id : ""} ref={register} />
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Logradouro"
                                    name="address"
                                    defaultValue={address ? address: ""}
                                />
                            </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Numero"
                                    name="number"
                                    defaultValue={number ? number : ""}
                                />
                            </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                            <FormGroup>
                                <Controller
                                    as={Input}
                                    control={control}
                                    label="Complemento"
                                    name="complement"
                                    defaultValue={complement ? complement : ""}
                                />
                            </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="CEP"
                                    name="postal_code"
                                    defaultValue={postal_code ? postal_code : ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Bairro"
                                    name="neighborhood"
                                    defaultValue={neighborhood ? neighborhood : ""}
                                />
                            </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Cidade"
                                    name="city"
                                    defaultValue={city ? city : ""} 
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Estado"
                                    name="state"
                                    defaultValue={state ? state : ""}
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
    bindActionCreators({ updateAddress }, dispatch);

export default connect( 
    null,
    mapDispatchToProps
)(FormAddress);
