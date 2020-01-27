import React from 'react';
import {GiCancel} from 'react-icons/gi'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import PresentationPersonnel from "./PresentationPersonnel";

function Dialogue(props) {
    const [open, setOpen] = React.useState(false);
    if (props.open && !open) {
        setOpen(true);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.handleClose();

    };
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"xl"}
            >
                <DialogTitle id="alert-dialog-title">{props.selection}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <h3> Martinique </h3>
                        <PresentationPersonnel/>
                        <PresentationPersonnel/>
                        <h3> Guadeloupe </h3>
                        <PresentationPersonnel/>
                        <PresentationPersonnel/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        <GiCancel/>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}

export default Dialogue