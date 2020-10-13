import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import Switch from '@material-ui/core/Switch';

import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import MenuItem from '@material-ui/core/MenuItem';

import Select from "@material-ui/core/Select";

import Button from "@material-ui/core/Button";

export const Input = React.memo( ({ input, secureTextEntry = false, error, ...custom }) => {
    
    const hasError = (error || false) !== false;
    return <TextField {...input} {...custom} type={secureTextEntry? "password" : "text"} error={hasError} />;

});

export const InputWithIcon = React.memo(
  ({
    inputLabel,
    input,
    label,
    margin = "normal",
    meta: { touched, error },
    controlStyle = {},
    withFormControl = true,
    ...custom
  }) => {
    const hasError = (error || false) !== false;

    if (withFormControl) {
      return (
        <FormControl margin={margin} error={touched && hasError} fullWidth style={controlStyle}>
          <TextField
            {...input}
            {...custom}
            label={inputLabel}
            error={hasError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>
              )
            }}
          />
        </FormControl>
      );
    }

    return <TextField {...input} {...custom} error={hasError} />;
  }
);

export const SelectOutlined = React.memo(({
  inputLabel,
  input,
  label,
  variant="outlined",
  meta: { touched, error },
  withFormControl = true,
  ...custom
}) => {

  const hasError = (error || false) !== false;

  return (
    <FormControl variant={variant} margin="normal" error={touched && hasError} fullWidth>
      <InputLabel >
        {inputLabel}
      </InputLabel>
      <Select
        // value={values.age}
        // onChange={handleChange}
        input={<OutlinedInput name="age" id="outlined-age-simple" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  )
})

export const PrimaryButton = React.memo(
  ({
    fullWidth = true,
    variant = "contained",
    color = "primary",
    className = null,
    loading = false,
    label,
    type = "button",
    ...custom
  }) => {
    return (
      <div className={className}>
        <Button
          type={type === 'submit' ? 'submit' : 'button'}
          fullWidth={fullWidth}
          variant={variant}
          color={color}
          disabled={loading}
          {...custom}
        >
          {loading ? <CircularProgress size={26} /> : label}
        </Button>
      </div>
    );
  }
);


export const checkBoxInput = React.memo(
  ({

    label,
    style,
    margin = "normal",
    fontSize = {fontSize:14},
    size="small",
    color="primary",
    labelPlacement="end",
    className,
    meta: { touched, error },
    withFormControl = true,
    checked = false,
    input,

  }) => {

    const hasError = (error || false) !== false;

    if (withFormControl) {
      return (
        <FormControlLabel 
        margin={margin} 
        size={size} 
        label={<span style={fontSize}>{label}</span>}
        //error={touched && hasError} 
        labelPlacement={labelPlacement}
          control={<Checkbox
            {...input}
            size={size}
            color={color}
            className={className}
            //error={hasError}
            value={input.value}
            //defaultValue={ checked || (input.value ? true : false ) }
            defaultChecked={checked}
            onChange={input.onChange}
          />}>
        </FormControlLabel>
      );
    }

   return <Checkbox {...input} error={hasError} />;

  }
);

export const RadioRedux =  React.memo( 
  ({
    input: { onChange, ...restInput },
    //meta: { touched, error },
    label = null,
    valueCheck = null
  }) => {
  return (
    <div onChange={() => onChange(valueCheck)}>
      <div style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 8,
        paddingHorizontal: 8
      }}>
        <div pointerEvents="none">
       <FormControlLabel
          value="start"
          control={
            <Radio
              color="default"
              value={valueCheck}
              checked={restInput.value === valueCheck ? true : false}
            />
          }
          label={label}
          labelPlacement="end"
        />
        </div>
      </div>
    </div>
  );
});


export const SwitchRedux = React.memo(
  ({  
    label,
    meta: { touched, error },
    input 
  }) => {
  const hasError = (error || false) !== false;
  return (<>
      <div 
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 8,
          paddingHorizontal: 26
      }}>
        <Typography style={{fontSize:12}}>{label}</Typography>
        <div pointerEvents="none">
          <Switch 
            value={input.value} 
            checked={input.value}
            onChange={input.onChange}
            color="primary"
            {...input}
          />
        </div>
      </div>
      <div type="error" visible={hasError} style={{ color: "red", textAlign: `center`}}>
        {error}
      </div> 
    </>
  );
});