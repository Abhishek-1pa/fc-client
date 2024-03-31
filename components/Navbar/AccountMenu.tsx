import { AuthState } from '@/models/states/authState';
import { logout } from '@/redux/authSlice';
import store, { RootState } from '@/redux/store';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const items = ['Profile', 'Logout'];
    const auth : AuthState = useSelector((state: RootState)=>state.auth);

    const handleClick = (event:any) =>{
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () =>{
        setAnchorEl(null);
    }

    const handleMenuItemClick = (item: any) => () =>{
        console.log(item);
        if(item==="Logout"){
            console.log("log out")
            store.dispatch(logout());
        }
        handleClose();
    }

    return (

        <>
            <Button
                aria-controls='dropdown-menu'
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ color: "white" }}

            >
                {auth.user?.username}
            </Button>
            <Menu
                id="dropdown-menu"
                anchorEl={anchorEl}
                open = {Boolean(anchorEl)}
                onClose={handleClose}
            >
                {items.map((item, index)=>(
                    <MenuItem key={index} onClick={handleMenuItemClick(item)}>
                    {item}
                    </MenuItem>
                ))}
            </Menu>

        </>

    )

   
}

export default AccountMenu;
