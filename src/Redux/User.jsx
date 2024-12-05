import { createSlice  , createAsyncThunk} from '@reduxjs/toolkit';
import { auth , db } from '../Utiles/firebaseConfig'
import { setDoc, doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
export const signUpUser = createAsyncThunk('task/signUpUser', async ({  firstName, email, password }) => {
 

  await createUserWithEmailAndPassword(auth, email, password)
  const user = auth.currentUser
  if (user) {
   const colRef =  collection(db, `users/${user.uid}/groups`)
   const docRef = doc(colRef , '4task')
    await setDoc(docRef , {name:'task'})
    await setDoc(doc(db, 'users', user.uid), {
      firstName: firstName,
      email
    })

    return user.uid
  }
})

export const signInUser = createAsyncThunk('task/signInUser', async ({ email, password },{rejectWithValue}) => {
  const userCredintial = await signInWithEmailAndPassword(auth, email, password)
  const user =userCredintial.user;
   return user.uid
})

export const getDetailUser = createAsyncThunk('task/getDetailUser', async (uid) => {
  
    const docREf = doc(db, 'users', uid)
    const snapData = await getDoc(docREf)
   
    if (snapData.exists()) {
        return {id:snapData.id , ...snapData.data()}
        
      
    }
   })

   
  
 const initialState ={
    userDetail:{},
    signinStatus:'idle',
    signupStatus:'idle',
    loading:true,
    error:''
  
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logoutUser:(state) => {
            state.userDetail={};
            state.status= 'idle';
            state.signinStatus="idle";
            state.signupStatus="idle";
            state.error=''
        }
    },
    extraReducers:(builder)=> {
        builder
        .addCase(signUpUser.pending, (state) => {
            state.signupStatus = 'loading'
          ;
          })
          .addCase(signUpUser.fulfilled, (state, action) => {
              state.signupStatus = 'succeeded';
                state.error=''
              toast.success("sign up successfully")
          })
          .addCase(signUpUser.rejected, (state , action) => {
            state.signupStatus = 'failed'
            state.error= action.error.message
            toast.error(`fail to sign up ${action.payload}`)
          })
    
          .addCase(signInUser.pending, (state) => {
            state.signinStatus = 'loading'
            
          })
          .addCase(signInUser.fulfilled, (state, action) => {
               state.signinStatus = 'succeeded'
               state.error=''
               toast.success("sign in successfully")
          })
          .addCase(signInUser.rejected, (state ,action) => {
            state.signinStatus = 'failed'
            state.error= action.error.message
            toast.error(`fail to sign in ${action.payload}`)
          })
          .addCase(getDetailUser.pending , (state , action ) => {
            state.loading= true;
})
          .addCase(getDetailUser.fulfilled , (state , action ) => {
                   state.loading= false;
                     state.error=''
                     state.userDetail = action.payload
          })
          .addCase(getDetailUser.rejected , (state , action ) => {
            state.loading= false;
})
    }
})

export const {logoutUser} =userSlice.actions 
export const selectUserId = (state => state.user?.userDetail?.id)
export const isLoading = (state => state.user?.userDetail?.loading)

export default userSlice.reducer;



