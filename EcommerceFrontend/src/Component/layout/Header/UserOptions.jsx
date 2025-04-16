import React, { useEffect, useState } from 'react';
import './Header.css';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { logout } from '../../../Actions/userAction';

export default function UserOptions({ user }) {
    // console.log("running the function useroptions ",user);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    function dashboard() {
        navigate('/dashboard');
    }
    function orders() {
        navigate('/orders');
    }
    function account() {
        navigate('/account'); // <-- use correct path
    }
    function logoutUser() {
        dispatch(logout());
        alert.success("Successfully Logout")
    }

    const options = [
        { icon: <ListAltIcon />, name: 'Orders', func: orders },
        { icon: <PersonIcon />, name: 'Profile', func: account },
           
        { icon: <ExitToAppIcon />, name: 'Logout', func: logoutUser },
    ];

    if (user.role === 'admin') {
        options.unshift({ icon: <DashboardIcon />, name: 'Dashboard', func: dashboard });
    }

    return (
        <SpeedDial
            className='speedDial'
            ariaLabel="SpeedDial tooltip example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            icon={
                <img
                    className="speedDialIcon    "
                    src={user?.avatar?.url || '/vite.svg'}
                    alt="Profile"
                    onError={(e) => (e.target.src = '/vite.svg')}
                />
            }
            direction="down"
        >
            {options.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.func} // ✅ correct key
                />
            ))}
        </SpeedDial>
    );
}
