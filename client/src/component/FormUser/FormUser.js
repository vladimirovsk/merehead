import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {editRecordUser, insertRecordUser, deleteRecordUser} from "../../store/action/usersAction";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    inputText: {
        padding: theme.spacing(1)

    },
    buttonDelete:{color: "red", margin: theme.spacing(2)},
    buttonSave:{color: "green", margin: theme.spacing(2), borderColor:"green"},
    buttonCancel:{color: "black",margin: theme.spacing(2)},

    title: {
        flexGrow: 1,
    },
    dialog:{
        width:'100vw',
        height: '100vh'
    }
}));

function FormUser(props){
    const {openFormDialog, setOpenFormDialog, newRecord, setNewRecord} = props
    const dispatch = useDispatch();
    const classes = useStyles();
    const [valueId, setValueId] = useState(0);
    const [valueName, setValueName] = useState('');
    const [valueSurname, setValueSurname] = useState('');
    const [valueDescription, setValueDescription] = useState('');
    const [titleDialog, setTitleDialog] = useState('EDIT');
    const [modifyData, setModifyData] = useState(false)

    const user = useSelector(state => state.users.item);

    useEffect(()=>{
        console.log(newRecord)
        if (newRecord){
            setTitleDialog('NEW')
            setValueName("");
            setValueSurname("");
            setValueDescription("");
        }else if (openFormDialog) {
            console.log(user)
            setValueId(user.id)
            setTitleDialog('EDIT')
            setValueName(user.name);
            setValueSurname(user.surname);
            setValueDescription(user.description);
        }
    },[user, newRecord])

    const handleClose = () => {
        setOpenFormDialog(false);
    }

    const handleChangeName= (event) => {
        setValueName(event.target.value);
        setModifyData(true);
    };

    const handleChangeSurname= (event) => {
        setValueSurname(event.target.value);
        setModifyData(true);
    };


    const handleChangeDescription= (event) => {
        setValueDescription(event.target.value);
        setModifyData(true);
    };

    const handleDeleteRecordUser = async () =>{
        dispatch(await deleteRecordUser(user.id))
    }

    const handleDelete=()=>{
        handleDeleteRecordUser()
        handleClose()
    }

    const handleEditRecordUser = async () => {
        const user = {
            id: valueId,
            name: valueName,
            surname: valueSurname,
            description: valueDescription
        }
        dispatch(await editRecordUser(user))
    }

    const handleInsertRecordUser = async () => {
        const user = {
            id: valueId,
            name: valueName,
            surname: valueSurname,
            description: valueDescription
        }
        dispatch(await insertRecordUser(user))
    }

    const handleSave = async () =>{
        if (newRecord){
            await handleInsertRecordUser()
        }
        else{
            await handleEditRecordUser()
        }
        handleClose();
    }


    return (
        <React.Fragment>
            <Dialog id="form-dialog-record-users"
                    className={classes.dialog}
                    open={openFormDialog}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">USER: {titleDialog}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       ID:   : {valueId}
                    </DialogContentText>

                    <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        type="text"
                        variant="outlined"
                        className ={classes.inputText}
                        id="name"
                        label="NAME"
                        fullWidth
                        value= {valueName}
                        onChange={handleChangeName}
                    />
                    <TextField
                        type="text"
                        variant="outlined"
                        className={classes.inputText}
                        id="surname"
                        label="SURNAME"
                        fullWidth
                        value={valueSurname}
                        onChange={handleChangeSurname}
                    />
                    <TextField
                        type="text"
                        className={classes.inputText}
                        id="description"
                        label="DESCRIPTION"
                        fullWidth
                        variant="outlined"
                        value={valueDescription}
                        onChange={handleChangeDescription}
                    />
                   </form>
                 </DialogContent>
                 <DialogActions>
                     <Grid container alignItems="flex-start" justify="flex-start" direction="row">
                     <Button disabled={newRecord} className={classes.buttonDelete} variant="outlined" onClick={handleDelete} color="secondary">
                         Delete
                     </Button>
                     </Grid>
                     <Grid container alignItems="flex-end" justify="flex-end" direction="row">
                    <Button disabled={!modifyData} className={classes.buttonSave} variant="outlined" onClick={handleSave} color="secondary">
                         Save
                     </Button>
                     <Button className={classes.buttonCancel} variant="outlined" onClick={handleClose} color="primary">
                         Cancel
                     </Button>
                     </Grid>
                 </DialogActions>
             </Dialog>

        </React.Fragment>
    )
}

export default FormUser;