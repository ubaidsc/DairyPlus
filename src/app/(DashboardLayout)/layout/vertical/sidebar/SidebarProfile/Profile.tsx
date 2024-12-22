import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from '@/store/hooks';
import { IconPower } from '@tabler/icons-react';
import { AppState } from '@/store/store';
import { LogOut } from '@/utils/signOut';
// import { redirect } from 'next/navigation';
import checkUser from '@/utils/checkUser';
import { useEffect, useState } from 'react';

export const Profile = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  
  // const handleSignOut = async () => {

  //   await signOut("credentials");
  //   // redirect('/login');
  // };

  const [user, setUser] = useState<any>(null); // State to store the user information

  useEffect(() => {
    const fetchUser = async () => {
      const result = await checkUser();
      setUser(result);
    };

    fetchUser();
  }, []);
  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={"/images/profile/user-1.jpg"} sx={{height: 40, width: 40}} />

          <Box>
            <Typography variant="h6">{user && user.username ? user.username : " "}</Typography>
            <Typography variant="caption">{user && user.role ? user.role : " "}</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                onClick={() => LogOut()}
                aria-label="logout"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
