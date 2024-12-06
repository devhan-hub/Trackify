import { Dialog , DialogContent , DialogActions , DialogTitle , Button} from "@mui/material";

const DeleteDialog = ({content ,handelDelete , open, setOpen }) => {
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}>
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>Do you want to delete the  '{content}'?</DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>CANCEL</Button>
                <Button onClick={handelDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog
