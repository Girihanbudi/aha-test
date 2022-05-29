import {
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  Typography,
  Button
} from '@mui/material';

export const AppBar = () => {


  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           <b>GithHub</b> Jobs
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </MuiAppBar>
    </Box>
  )
}

export default AppBar
