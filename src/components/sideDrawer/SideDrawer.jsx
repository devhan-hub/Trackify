import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Box from '@mui/material/Box';
import { CircularProgress, Typography } from '@mui/material';
import {  useSelector } from 'react-redux';
import { selectUserId } from '../../Redux/User.jsx'
import useGroupManager from '../../hooks/useGroupManager.jsx';
import Navigation from './Navigation.jsx';
import {SidebarFooter ,ToolbarActionsSearch} from './SideDrawerComp.jsx'

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 650,
      md: 800,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;

}

export default function SideDrawer() {
  const userId = useSelector(selectUserId)
  const router = useDemoRouter('/dashboard');
  const [path, setPath] = React.useState('dashboard')
  const { allGroup } = useGroupManager(userId)
  const NAVIGATION= Navigation(allGroup )
  const groupstatus= useSelector((state)=>state.toDo.groupstatus)
  const allTaskStatus= useSelector((state)=>state.toDo.allTaskStatus)

 
  React.useEffect(() => {
    const { pathname } = router;
    const path = pathname.split('/')[1];
    setPath(path)
  }, [router])

  const DynamicContent = ({ path }) => {
    const activeItem = NAVIGATION.find((item) => item.segment === path)
    return activeItem?.component || <div> Selecect ...</div>

  }

  if (groupstatus === 'loading' || allTaskStatus === 'loading') {
    return (
      <Box sx={{ display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <img src="/Images/logo.png" alt="" />
      </Box>
    );
  }
  
  if (groupstatus === 'failed' || allTaskStatus === 'failed') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <PriorityHighIcon color="error" />
        <Typography color="error" variant="h6">
          Failed to load data. Please try again later.
        </Typography>
      </Box>
    );
  }
  
  else {
  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{
        logo: <img src="/Images/logo.png" alt="logo image" />,
        title: ''
      }}

    >

      <DashboardLayout slots={{
        toolbarActions: ToolbarActionsSearch,
        sidebarFooter: SidebarFooter,
             }}>
        <div className='w-[96%] mx-auto py-4'>
        <DynamicContent path={path} />
        </div>
      </DashboardLayout>
    </AppProvider>
  );
}
}
