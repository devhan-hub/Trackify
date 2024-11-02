import { InputAdornment, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import { CircleOutlined } from "@mui/icons-material"
import { useState } from "react"
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { HouseOutlined } from "@mui/icons-material"
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'

const InputToDo = () => {
  const [focus, setFocus] = useState(false)
  const [blur, setBlur] = useState(true)
  const [anchorEl, setAnchorEl] = useState({})
  console.log(anchorEl)
  const handelClick = (event, menuId) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl((prevAnchorEl) => ({
      ...prevAnchorEl,
      [menuId]: event.currentTarget
    }))
  }

  const handelClose = (menuId) => {
    setAnchorEl((prevAnchorEl) => ({
      ...prevAnchorEl,
      [menuId]: null
    }))
  }
  return (
    <div className="-mb-6 ">
      <TextField sx={{ paddingBottom: '6px', paddingInline: 4, width: '100%' }}
        type="text"

        placeholder="go to mosque friday 12:00 pm"
        id='filled-required'
        variant="filled"
        fullWidth
        slotProps={{
          input: {

            startAdornment: (
              <InputAdornment position="start">
                {blur && <AddIcon />}
                {focus && <CircleOutlined />}

              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">

                {focus && (
                  <div className="cursor-pointer " onClick={(e) => handelClick(e, 'menu1')} onMouseDown={(e) => e.preventDefault()}>
                    <HouseOutlined />
                    <span className="mr-3">Taskes</span>
                  </div>
                )}
                {focus && (<div className="cursor-pointer" onClick={(e) => handelClick(e, 'menu2')} onMouseDown={(e) => e.preventDefault()}><CalendarMonthOutlinedIcon /></div>)}
              </InputAdornment>
            )
          }
        }}
        onFocus={(e) => { setFocus(true); setBlur(false) }}
        onBlur={() => {
          if (!anchorEl.menu1 && !anchorEl.menu2) {
            setBlur(true);
            setFocus(false);
          }
        }}
      />
      <Menu
        anchorEl={anchorEl['menu1']}
        open={Boolean(anchorEl['menu1'])}
        onClose={() => handelClose('menu1')}

      >
        <MenuItem onClick={() => handelClose('menu1')}>CatagoryOne</MenuItem>
        <MenuItem onClick={() => handelClose('menu1')}>Catagorytwo</MenuItem>
        <MenuItem onClick={() => handelClose('menu1')}>CatagoryThree</MenuItem>

      </Menu>

      <Menu
        anchorEl={anchorEl['menu2']}
        open={Boolean(anchorEl['menu2'])}
        onClose={() => handelClose('menu2')}

      >
        <MenuItem onClick={() => handelClose('menu2')}>Today</MenuItem>
        <MenuItem onClick={() => handelClose('menu2')}>Tomorow</MenuItem>
        <MenuItem onClick={() => handelClose('menu2')}>NextDay</MenuItem>
        <Divider />
        <MenuItem>Calander</MenuItem>
      </Menu>

    </div>
  )
}

export default InputToDo
