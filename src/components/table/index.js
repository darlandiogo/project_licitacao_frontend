import React, { useEffect } from "react";
import { connect } from 'react-redux';
//import { Field } from "redux-form";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Typography from "@material-ui/core/Typography";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import TablePaginationButtons from './TablePaginationButtons';
//import { checkBoxInput } from "../../form";

import { resetTableState } from "../../store/ducks/table"

import { withStyles, } from '@material-ui/core';
import styles from "./styles";
/*
interface Table{
    classes: any,
    headers: any,
    showDelete:any,
    showEdit: any,
    handleDelete: any,
    handleEdit: any,
    showCheckbox:any,
    //handleCheckbox, 
    data: any,
    initialValues: any,
    resetTableState: any, 
    currentPage: any, 
    perPage: any, 
    totalRows: any, 
    parentHandlePagination: any  
}
*/
const CustomTable = ({ 
    classes,
    headers,
    showDelete,
    showEdit,
    handleDelete,
    handleEdit,
    showCheckbox,
    //handleCheckbox, 
    data,
    initialValues,
    resetTableState, 
    currentPage, 
    perPage, 
    totalRows, 
    parentHandlePagination  
}) => {

    useEffect(() => 
    () => 
      resetTableState(), 
      [resetTableState]
    );

    const renderData = (data) => {
        if(Array.isArray(data)){
           return data.map (elem => {
                return elem.name
                
            }).join(", ");
        }
        
        return data;
    }

    //let [ checked, setChecked ] = useState(false)


    const verifyCheck = (value) => {
        let array = Object.keys(Object.assign({}, initialValues));
        for(let i = 0; i < array.length; i++) {
            //eslint-disable-next-line
            if(array[i] == value) {
                return true
            }
        }
        return false;
    }

    const emptyData = () => {
        return (
        <Box style={{flex:1, textAlign: 'center'}}>
            <Typography variant="h5"> Não há dados a serem exibidos!  </Typography>
        </Box>
        );
    }



    if(data.length === 0)
        return emptyData();
        

    return (
        <Box className={classes.root}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead className={classes.head}>
                <TableRow>
                    {showCheckbox && ( 
                        <TableCell className={classes.cell}>
                           {/* <Field
                                key="1245657"
                                component={checkBoxInput}
                                name={"select_all"}
                                onChange={ () => setChecked(!checked)}
                            /> */}                           
                        </TableCell> 
                    )} 
                    {
                        headers && headers.map ( (item, index) => (
                            <TableCell key={index} className={classes.cell}>
                                <Typography variant="h6">{item.header}</Typography>
                            </TableCell>
                        ))
                    }  
                    {(showEdit || showDelete)  && ( <TableCell className={classes.cell}>
                        <Typography variant="h6"></Typography>
                    </TableCell> )} 
                    

                </TableRow>
                </TableHead>
                <TableBody className={classes.body}>
                {data.map( (elem, index) => (
                    <TableRow key={index}>
                        
                        { headers && headers.map ( (item, index) => (
                          <TableCell key={index} className={classes.cell}>
                            <Typography variant="inherit">
                                {renderData(elem[item.field]) || ` Não há ${item.header.toLowerCase()} cadastrado` }
                            </Typography>
                          </TableCell>
                        ))}
                            <TableCell className={classes.cell}>
                            { showEdit && (
                                <Tooltip title="Editar" placement="left-start">
                                    <IconButton onClick={ () => { handleEdit(elem.id) }} >
                                        <EditIcon fontSize="small"/>
                                    </IconButton>
                                </Tooltip> 
                            )}
                            { showDelete && (
                                <Tooltip title="Deletar" placement="right-start">
                                    <IconButton onClick={ () => { handleDelete(elem.id) }} >
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton> 
                                </Tooltip>
                            )}
                            </TableCell> 
                    </TableRow>
                ))}
                </TableBody>
                {(parentHandlePagination && perPage > 0) &&
                    <TableFooter>
                        <TableRow>
                            <TablePagination 
                            rowsPerPageOptions={[5, 10, 20]}
                            count={totalRows}
                            page={currentPage ? currentPage - 1 : currentPage}
                            rowsPerPage={parseInt(perPage)}
                            onChangeRowsPerPage={({ target: { value } }) => parentHandlePagination(currentPage, value)}
                            onChangePage={page => parentHandlePagination(page, perPage, parentHandlePagination)}
                            labelDisplayedRows={({ from, to, count }) => `${from} - ${to} de ${count}`}
                            labelRowsPerPage="Itens por página"
                            ActionsComponent={TablePaginationButtons}
                            />
                        </TableRow>
                    </TableFooter>
                }
                
            </Table>
        </Box>
    );
}

const mapStateToProps = state => ({
    currentPage: state.table.currentPage,
    perPage: state.table.perPage,
    totalRows: state.table.totalRows
  });
  
  const mapDispatchToProps = {
    resetTableState
  };

export default connect(mapStateToProps, mapDispatchToProps )((withStyles(styles)(CustomTable)));