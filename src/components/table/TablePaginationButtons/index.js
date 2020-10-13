import React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import useStyles from './styles';

const TablePaginationButtons = ({ onChangePage, currentPage, lastPage }) => {

  const handleFirstPageButtonClick = () => {
    onChangePage(1);
  };

  const handleBackButtonClick = () => {
    onChangePage(--currentPage);
  };

  const handleNextButtonClick = () => {
    onChangePage(++currentPage);
  };

  const handleLastPageButtonClick = () => {
    onChangePage(lastPage);
  };

  const classes = useStyles();
  
  return (
    <Box className={classes.root}>
      <Tooltip title="Primeira">
        <>
          <IconButton 
            arial-label="primeira página" 
            onClick={handleFirstPageButtonClick} 
            disabled={parseInt(currentPage) === 1}
          >
            <FirstPageIcon />
          </IconButton>
        </>
      </Tooltip>

      <Tooltip title="Anterior">
        <>
          <IconButton 
            arial-label="página anterior" 
            onClick={handleBackButtonClick}
            disabled={parseInt(currentPage) === 1}
          >
            <KeyboardArrowLeft />
          </IconButton>
        </>
      </Tooltip>

      <Tooltip title="Próxima">
        <>
          <IconButton 
            aria-label="próxima página" 
            onClick={handleNextButtonClick}
            disabled={parseInt(currentPage) === parseInt(lastPage)}
          >
              <KeyboardArrowRight />
          </IconButton>
        </>
      </Tooltip>

      <Tooltip title="Última">
        <>
          <IconButton 
            arial-label="última página" 
            onClick={handleLastPageButtonClick} 
            disabled={parseInt(currentPage) === parseInt(lastPage)}
          >
            <LastPageIcon />
          </IconButton>
        </>
      </Tooltip>
    </Box>
  );
  
};


const mapStateToProps = state => ({
  currentPage: state.table.currentPage,
  lastPage: state.table.lastPage
});

export default connect(mapStateToProps)(TablePaginationButtons);


//export default TablePaginationButtons;
