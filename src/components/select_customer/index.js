import React, {useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Field } from "redux-form";
import { SelectInput }   from "../../form/select";
import Loading from "../../../shared/common/Loading";

import { withStyles } from "@material-ui/core/styles";
import styles from './styles';

import { getCustomers, setCustomer } from '../../../../store/ducks/customer';

let SelectCustomer = ({
    loading,
    unauthorized,
    customers,
    selectedCustomer,
    getCustomers, 
    setCustomer,
    handleChange
}) => {
    
    useEffect ( () => {
        getCustomers();
        setCustomer(selectedCustomer);
    }, 
    //eslint-disable-next-line
    [selectedCustomer]);
    
    const _handleChange =  (value) => {
        setCustomer(value);
        handleChange();
    }

    if(unauthorized)
        return null

    if(loading)
        return <Loading/>;

    return (
        <>
        { customers.length > 0 && ( 
            <Field 
                label="selecione um cliente"
                name="selected_customer" 
                data={customers}
                style={{minWidth:250,marginTop:"4%"}}
                component={SelectInput}
                value={selectedCustomer}
                onChange={ (event) => _handleChange(event.target.value)}
            />
        )}
        </>
    );
}


SelectCustomer = withStyles(styles)(SelectCustomer);

const mapStateToProps = (state) => ({ 
    unauthorized: state.customer.unauthorized,
    loading: state.customer.loading,
    customers: state.customer.data || [],
    selectedCustomer: state.customer.selectedCustomer || state.auth.data.user.customer_id
});

const mapDispatchToProps = dispatch => bindActionCreators({ 
    getCustomers, setCustomer
}, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(SelectCustomer);

