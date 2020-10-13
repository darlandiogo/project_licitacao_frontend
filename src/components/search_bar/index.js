import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { InputOutlined } from "../../form";

const SearchBar = ({name, label, handleSearch, style}) => {
    return (
        <>
            <Field
                name={name}
                component={InputOutlined}
                variant="standard"
                style={style}
                type="text"
                size="small"
                autoComplete="text"
                inputLabel={label}
                onChange={ (e) => handleSearch(e.target.value)}
            />
        </>
    );
}

export default SearchBar;