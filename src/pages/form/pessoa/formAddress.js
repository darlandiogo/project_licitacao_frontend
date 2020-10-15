import React from 'react';
import { Button, FormGroup, Card, CardHeader, CardContent, CardActions, Typography } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { Input, PrimaryButton } from '../../../components/form';

const FormAddress =  (props) => {

    let { pessoa_id, address, number, complement, postal_code, neighborhood, city, state } = props.address;
    
    const { register, control, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader title="Endereço"/>
                <CardContent>
                    
                <input type="hidden" name="pessoa_id" defaultValue={pessoa_id} ref={register} />

                    <FormGroup>
                        <Controller
                            as={Input}
                            control={control}
                            label="Logradouro"
                            name="address"
                            defaultValue={address}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Controller
                            as={Input}
                            control={control}
                            label="Numero"
                            name="number"
                            defaultValue={number}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Controller
                            as={Input}
                            control={control}
                            label="complemento"
                            name="complement"
                            defaultValue={complement}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Controller
                            as={Input}
                            control={control}
                            label="CEP"
                            name="postal_code"
                            defaultValue={postal_code}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Controller
                            as={Input}
                            control={control}
                            label="Bairro"
                            name="neighborhood"
                            defaultValue={neighborhood}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Controller
                            as={Input}
                            control={control}
                            label="Cidade"
                            name="city"
                            defaultValue={city}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Controller
                            as={Input}
                            control={control}
                            label="Estado"
                            name="state"
                            defaultValue={state}
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

export default FormAddress;