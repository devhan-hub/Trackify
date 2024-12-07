import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const AuthButton = ({ isLogin, signinStatus, signupStatus }) => {
    if (isLogin) {
        return signinStatus === "loading" ? (
            <LoadingButton loading loadingPosition="start" variant="outlined">
                Signing in...
            </LoadingButton>
        ) : (
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#ff6867', color: 'white' }}>
                Sign In
            </Button>
        );
    }

    return signupStatus === "loading" ? (
        <LoadingButton loading loadingPosition="start" variant="outlined">
            Signing up...
        </LoadingButton>
    ) : (
        <Button type="submit" variant="contained" sx={{ backgroundColor: '#ff6867', color: 'white' }}>
            Sign Up
        </Button>
    );
};

export default AuthButton;
