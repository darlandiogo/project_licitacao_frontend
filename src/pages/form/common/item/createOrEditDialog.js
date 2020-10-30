import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useForm, Controller } from "react-hook-form";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';

import { Input, PrimaryButton } from '../../../../components/form';
import Loading from "../../../../components/loading";
import { setDialog } from "../../../../store/ducks/dialog";
import { createItem, updateItem} from "../../../../store/ducks/item";

const CreateOrEditDialog = ({ setDialog, createItem, updateItem,  type, type_id, item,  dialog, loaded }) => {

    const { register, control, handleSubmit } = useForm();
    const onSubmit = data => data.id ? updateItem(data.id, data) : createItem(data);
    const handleOpenDialog = (value) => {
        setDialog(value);
    };

    let id, number, specification, quantity, unity, value ;
    if(item){
        id = item.id; 
        number = item.number;
        specification = item.specification
        quantity = item.quantity
        unity = item.unity
        value = item.value
    }

    if(!loaded){
        return <Loading/>;
    }

    return (
        <Dialog open={dialog} onClose={() => handleOpenDialog(false)} aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle id="form-dialog-title">Cadastro Item</DialogTitle>
                <DialogContent>
                <input type="hidden" name="type" value={type ? type: ""} ref={register} />
                <input type="hidden" name="type_id" value={type_id ? type_id: ""} ref={register} />
                <input type="hidden" name="id" value={id ? id: ""} ref={register} />
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Número do item"
                                    name="number"
                                    defaultValue={number ? number : ""}
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
                                    label="Especificação do Item"
                                    name="specification"
                                    defaultValue={specification ? specification: ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Unidade"
                                    name="unity"
                                    defaultValue={unity ?  unity: ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    type="number"
                                    label="Quantidade"
                                    name="quantity"
                                    defaultValue={quantity ? quantity : ""}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <Controller
                                    required
                                    as={Input}
                                    control={control}
                                    label="Valor unitário"
                                    name="value"
                                    defaultValue={value ? value: ""}
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>


                </DialogContent>
                <DialogActions>
                <Button onClick={() => handleOpenDialog(false)} color="primary">
                    Cancelar
                </Button>
                <PrimaryButton
                    type="submit"
                    variant="contained" 
                    color="primary"
                    label="Salvar"
                />
                </DialogActions>
            </form>
        </Dialog>
    );
}

const mapStateToProps = ( state ) => {
    return {
        dialog: state.dialog.data,
        item: state.item.elem,
        loaded: state.item.loaded,
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ setDialog, createItem, updateItem }, dispatch);

export default connect( mapStateToProps, mapDispatchToProps )(CreateOrEditDialog);
