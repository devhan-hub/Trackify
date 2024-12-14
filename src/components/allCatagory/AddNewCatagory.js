import { useEffect , useState } from "react";
import TextField from '@mui/material/TextField';
import { Dialog , DialogContent , DialogActions , DialogTitle , Button } from "@mui/material";
import useGroupManager from "../../hooks/useGroupManager";
import { toast } from "react-toastify";

 const AddNewCatagory =({ open, setOpen, userId='', catagory, isEdit })=> {
    const { edit, add } = useGroupManager(userId)
    const [catagoryName, setCatagoryName] = useState('');
    const [catagoryId, setCatagoryId] = useState('')


    useEffect(() => {
        if (!isEdit) {
            setCatagoryName('')
        }

        else {
            const { name, id, ...rest } = catagory
            setCatagoryName(name);
            setCatagoryId(id)
        }
    }, [catagory, isEdit])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCatagory = {
            name: catagoryName,
            task: [],
        }
        const success = isEdit
            ? await edit(catagory.id, { ...catagory, name: catagoryName })
            : await add(newCatagory);

    if(success){
        toast.success(isEdit ? 'Successfully edited' : 'Successfully added');
        setOpen(false);
        setCatagoryName('');
        setCatagoryId('');
    }
    else { 
        toast.error(isEdit?'Unable to edit':'unable to add')      
        setOpen(false)
        setCatagoryName('')
        setCatagoryId('')
    } }


    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    component: 'form',
                }}
            >
                <DialogTitle>{isEdit ? 'ADD' : 'Edit'} New Catagory</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="catagory"
                        value={catagoryName}
                        label="Catagory Name"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setCatagoryName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>CANCEL</Button>
                    <Button onClick={handleSubmit}>{isEdit ? 'EDIT' : "ADD"}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default  AddNewCatagory; 