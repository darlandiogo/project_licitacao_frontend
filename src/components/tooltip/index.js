import React from 'react'
import clsx from "clsx";

import MaterialTooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import styles from './styles'

function Tooltip({ children, title, placement }) {
    const classes = styles();

    let toolTipClasses = clsx(classes.tooltip)

    if(placement === 'bottom') {
        toolTipClasses = clsx(toolTipClasses, classes.placementBottom)
    }

    return <MaterialTooltip TransitionComponent={Zoom} placement={placement}
        title={title} classes={{ tooltip: toolTipClasses }}>
        {children}
    </MaterialTooltip>
}

export default React.memo(Tooltip);