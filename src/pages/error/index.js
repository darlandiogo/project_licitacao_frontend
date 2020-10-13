import React from  'react';
import { Container, Typography } from '@material-ui/core';

import './style.css';

const Error= () =>{
    return (
        <div className="error_404">
            <Typography variant="h5">
                Error 404 | Page not found!
            </Typography>
        </div>
    )
}

export default Error;