import React from "react";
import Box from '@material-ui/core/Box';
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = ( ) => {
    return (
        <Box style={{ display: "flex", alignItems: "center", justifyContent: "center", width:"100%", height: "80vh" }}>
            <CircularProgress/>
        </Box>
    );
}

export default React.memo(Loading);