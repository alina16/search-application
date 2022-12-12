import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Button from '@mui/material/Button';

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.down ('sm')]: {
      marginBottom: theme.spacing(2),
    },
  }));

  export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    [theme.breakpoints.down ('sm')]: {
      width: '100%',
    },
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },

    '> svg': {
      cursor: 'pointer',
      marginRight: theme.spacing(2),
    }
  }));

  export const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    [theme.breakpoints.down ('sm')]: {
      flexDirection: 'column',
    },
  }));

  export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  export const SearchButton = styled(Button)(({ theme }) => ({
    marginRight: '24px',
    [theme.breakpoints.down ('sm')]: {
      marginBottom: theme.spacing(2),
    },
  }))