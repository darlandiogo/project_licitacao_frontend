import React, { useState, useCallback} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useForm, Controller } from "react-hook-form";
import { 
    Grid, FormControl, FormGroup, Card, CardHeader, CardContent, 
    CardActions, InputLabel, Select, MenuItem 
} from '@material-ui/core';

import { Input, PrimaryButton } from '../../../components/form';
import { updateCotacao, createCotacao } from "../../../store/ducks/cotacao";

const FormCotacao =  (props) => {

     let { 
        id, process_number, process_date, purpose_bidding, 

    } = props.cotacao;

    const { register, control, handleSubmit } = useForm();
    const onSubmit = data =>  data.id ? props.updateCotacao(data.id, data) : props.createCotacao(data); 
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
             <Card>
                <CardHeader title="Cotação"/>
                <CardContent>
                    <input type="hidden" name="id" value={id ? id: ""} ref={register} />
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Processo administrativo"
                                    name="process_number"
                                    defaultValue={ process_number ? process_number: ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    type="date"
                                    as={Input}
                                    control={control}
                                    label="Data do processo administrativo"
                                    name="process_date"
                                    defaultValue={process_date ? process_date: ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormGroup>
                                <Controller
                                    required
                                    variant="outlined"
                                    multiline
                                    rows={3}
                                    rowsMax={30}
                                    as={Input}
                                    control={control}
                                    label="Objetivo da Cotação"
                                    name="purpose_bidding"
                                    defaultValue={ purpose_bidding ? purpose_bidding: ""}
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
    bindActionCreators({ updateCotacao, createCotacao }, dispatch);

export default connect( 
    null,
    mapDispatchToProps
)(FormCotacao);