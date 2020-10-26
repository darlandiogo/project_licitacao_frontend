import React, {useState} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useForm, Controller } from "react-hook-form";
import { Grid, FormGroup, Card, CardHeader, CardContent, CardActions} from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { Input, PrimaryButton } from '../../../components/form';
import { updateFuncionario, createFuncionario } from "../../../store/ducks/funcionario";

const FormFuncionario = (props) => {
    
    let { listPessoa, funcionario, updateFuncionario, createFuncionario } = props;
    
    const { register, control, handleSubmit } = useForm();
    const onSubmit = data => data.id ? updateFuncionario(data.id, data) : createFuncionario(data);
    
    const [value, setValue] = useState( funcionario.pessoa_fisica_id ? funcionario.pessoa_fisica_id : "");
    const onChangeValue = (event, values) => {
        event.preventDefault();
        if(values){
            setValue(values.id);
        }
    }

    const getPessoa = (id) => { 
        let _value = listPessoa.find( elem => elem.id === id);
        if(_value !== 'undefined')
            return _value;
        return '';
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader title="Funcionário"/>
                <CardContent>
                <input type="hidden" name="id" value={funcionario.id ? funcionario.id : ""} ref={register} />
                    <input type="hidden" name="pessoa_fisica_id" value={value} ref={register} />
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Autocomplete
                                id="combo-box-demo"
                                options={listPessoa}
                                value={listPessoa && getPessoa(value)}
                                onChange={onChangeValue}
                                getOptionLabel={(elem) => `${elem.name} (${elem.cpf})`}
                                style={{ width: "100%" }}
                                renderInput={(params) => <TextField {...params} label="Funcionario" />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Matricula"
                                    name="matricula"
                                    defaultValue={funcionario.matricula ? funcionario.matricula : ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Portaria"
                                    name="portaria"
                                    defaultValue={funcionario.portaria ? funcionario.portaria :""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    as={Input}
                                    control={control}
                                    label="Cargo"
                                    name="role"
                                    defaultValue={funcionario.role ? funcionario.role : ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Setor"
                                    name="sector"
                                    defaultValue={funcionario.sector ? funcionario.sector : ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <FormGroup>
                                <Controller
                                    as={Input}
                                    control={control}
                                    label="Vínculo Enpregatício"
                                    name="type_contract"
                                    defaultValue={funcionario.type_contract ? funcionario.type_contract : ""}
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
    bindActionCreators({ updateFuncionario, createFuncionario  }, dispatch);

export default connect( 
    null,
    mapDispatchToProps
)(FormFuncionario);
