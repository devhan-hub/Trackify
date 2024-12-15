import { Dialog , DialogContent , DialogActions , DialogTitle , Button} from "@mui/material";
import { useSelector } from "react-redux";

const DeleteDialog = ({content ,handelDelete , open, setOpen }) => {
    const deleteStatus= useSelector((state)=>state.toDo.todoStatus)
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}>
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>Do you want to delete the  '{content}'?</DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>CANCEL</Button>
                <Button onClick={handelDelete} disabled={deleteStatus === 'loading'}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog
