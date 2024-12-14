import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const AuthButton = ({ isLogin, signinStatus, signupStatus }) => {
    if (isLogin) {
        return signinStatus === "loading" ? (
            <LoadingButton sx={{width:'max-content'}} loading loadingPosition="start" variant="outlined">
               <span className='px-6'>Signing in...</span> 
            </LoadingButton>
        ) : (
            <Button sx={{width:'max-content'}} type="submit" variant="contained" >
                Sign In
            </Button>
        );
    }

    return signupStatus === "loading" ? (
        <LoadingButton sx={{width:'max-content'}} loading loadingPosition="start" variant="outlined">
            <span className='px-6'>Signing up...</span> 
        </LoadingButton>
    ) : (
        <Button type="submit" variant="contained" >
            Sign Up
        </Button>
    );
};

export default AuthButton;
