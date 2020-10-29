import React, { useState, useCallback} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useForm, Controller } from "react-hook-form";
import { 
    Grid, FormControl, FormGroup, Card, CardHeader, CardContent, 
    CardActions, InputLabel, Select, MenuItem 
} from '@material-ui/core';

import { Input, CheckBoxInput, PrimaryButton } from '../../../components/form';
import { updateLicitacao, createLicitacao } from "../../../store/ducks/licitacao";

const FormLicitacao =  (props) => {

    let { modalities, types, forms, regimes, status } = props.listSelectOptions;
    let { 
        id, process_number, process_date, bidding_number, 
        licitacao_modality,licitacao_type, licitacao_form, 
        licitacao_regime, bidding_objective, justification,
        purpose_contract, way_execution, validity_contract,
        deadline_contract, general_considerations, bidding_organ,
        emiter_name, emiter_office, disbursement_schedule, edital_date, 
        datetime_open, licitacao_status, sector_id, value,
    } = props.licitacao;

    const { register, control, handleSubmit } = useForm();
    const onSubmit = data => { 
        let result = { ...data, sector_id: check.join(",") }  
        result.id ? props.updateLicitacao(result.id, result) : props.createLicitacao(result); 
    }
    const [check, ] = useState(sector_id ? sector_id.split(",").map(Number) : []);
    
    const _handleChange = (e) => {
        if(e.checked)
        {   
            check.push(parseInt(e.value));
        }
        else
        {    
            let newList  = check.filter((value ,_index)  => value !== parseInt(e.value))
            check.splice(0, check.length);
            check.push(...newList)
        }
        console.log(check);
    }

    const SetoresInteresados = useCallback(() => {
        return (
            <>
                { props.listSecretaria && props.listSecretaria.map((elem, index) => (
                    <FormGroup key={index}>
                        <Controller
                        key={index}
                        name={"sector["+index+"]"}
                        label={elem.nome_fantasia}
                        as={CheckBoxInput}
                        control={control}
                        defaultValue={elem.id}
                        value={elem.id}
                        checked={Array.isArray(check) ? check.includes(elem.id): false}
                        handleChange={ (e) =>_handleChange(e.target)}
                        />
                    </FormGroup>
                ))}
            </>
        );
    }, [check]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
             <Card>
                <CardHeader title="Licitação"/>
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
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Numero da licitação"
                                    name="bidding_number"
                                    defaultValue={ bidding_number ? bidding_number: ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl style={{width: "100%"}}>
                                <InputLabel >Modalidade</InputLabel>
                                <Controller
                                    required
                                    as={<Select>
                                        { modalities && modalities.map((elem, index)=>(
                                            <MenuItem key={index} value={elem.id}>{elem.name}</MenuItem>
                                        ))}
                                        </Select>
                                    }
                                    name={"modality"}
                                    control={control}
                                    defaultValue={licitacao_modality? licitacao_modality.id: ""}
                                />
                            </FormControl>
  
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl style={{width: "100%"}}>
                                <InputLabel >Tipo</InputLabel>
                                <Controller
                                    required
                                    as={<Select>
                                        { types && types.map((elem, index)=>(
                                            <MenuItem key={index} value={elem.id}>{elem.name}</MenuItem>
                                        ))}
                                        </Select>
                                    }
                                    name={"type"}
                                    control={control}
                                    defaultValue={licitacao_type? licitacao_type.id: ""}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl style={{width: "100%"}}>
                                    <InputLabel >Forma</InputLabel>
                                    <Controller
                                        required
                                        as={<Select>
                                            { forms && forms.map((elem, index)=>(
                                                <MenuItem key={index} value={elem.id}>{elem.name}</MenuItem>
                                            ))}
                                            </Select>
                                        }
                                        name={"form"}
                                        control={control}
                                        defaultValue={licitacao_form? licitacao_form.id: ""}
                                    />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                        <FormControl style={{width: "100%"}}>
                                <InputLabel >Tipo</InputLabel>
                                <Controller
                                    required
                                    as={<Select>
                                        { regimes && regimes.map((elem, index)=>(
                                            <MenuItem key={index} value={elem.id}>{elem.name}</MenuItem>
                                        ))}
                                        </Select>
                                    }
                                    name={"regime"}
                                    control={control}
                                    defaultValue={licitacao_regime? licitacao_regime.id: ""}
                                />
                            </FormControl>
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
                                    label="Objetivo da licitação"
                                    name="bidding_objective"
                                    defaultValue={bidding_objective ? bidding_objective: ""}
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
                                    label="Justificativa"
                                    name="justification"
                                    defaultValue={ justification ? justification: ""}
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
                                    label="Objeto do contrato"
                                    name="purpose_contract"
                                    defaultValue={purpose_contract ? purpose_contract: ""}
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
                                    label="Forma de execução"
                                    name="way_execution"
                                    defaultValue={ way_execution ? way_execution: ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Prazo de vigência do contrato"
                                    name="validity_contract"
                                    defaultValue={validity_contract ? validity_contract: ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Prazo de entrega/execução"
                                    name="deadline_contract"
                                    defaultValue={ deadline_contract ? deadline_contract: ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Considerações gerais"
                                    name="general_considerations"
                                    defaultValue={ general_considerations ? general_considerations: ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Orgão realizador desta licitação"
                                    name="bidding_organ"
                                    defaultValue={ bidding_organ ? bidding_organ: ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Nome do emitente do edital"
                                    name="emiter_name"
                                    defaultValue={emiter_name ? emiter_name: ""}
                                />
                            </FormGroup>
                        </Grid> 

                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Cargo do emitente"
                                    name="emiter_office"
                                    defaultValue={ emiter_office ? emiter_office: ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Cronograma de desembolso"
                                    name="disbursement_schedule"
                                    defaultValue={disbursement_schedule ? disbursement_schedule: ""}
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
                                    label="Data do edital"
                                    name="edital_date"
                                    defaultValue={ edital_date ? edital_date: ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    type="datetime-local"
                                    as={Input}
                                    control={control}
                                    label="Date e hora de abertura"
                                    name="datetime_open"
                                    defaultValue={datetime_open ? datetime_open: ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <FormControl style={{width: "100%"}}>
                                <InputLabel >Status do processo</InputLabel>
                                <Controller
                                    required
                                    as={<Select>
                                        { status && status.map((elem, index)=>(
                                            <MenuItem key={index} value={elem.id}>{elem.name}</MenuItem>
                                        ))}
                                        </Select>
                                    }
                                    name="status"
                                    control={control}
                                    defaultValue={licitacao_status? licitacao_status.id: ""}
                                />
                            </FormControl>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <InputLabel>Setores interesados</InputLabel>
                            <FormGroup>   
                                {SetoresInteresados()}
                            </FormGroup>
                            
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Valor global"
                                    name="value"
                                    defaultValue={ value ? value: ""}
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
    bindActionCreators({ updateLicitacao, createLicitacao }, dispatch);

export default connect( 
    null,
    mapDispatchToProps
)(FormLicitacao);