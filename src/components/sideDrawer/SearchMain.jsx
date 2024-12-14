import React from 'react'
import Fuse from "fuse.js";
import { Stack, Tooltip, IconButton, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { useSelector } from "react-redux";
import TodoDisplay from "../display/TodoDisplay";

export const Search = ({ setFilteredTasks }) => {
  const allTask = useSelector((state) => state.toDo.allTask);

  const [searchQuery, setSearchQuery] = React.useState("");

  const fuse = new Fuse(allTask, {
      keys: ["title"],
      threshold: 0.3,
      distance: 100, 
      ignoreLocation: true,
      useExtendedSearch: true, 
  });

  const handleSearch = (e) => {
      const query = e.target.value;
      setSearchQuery(query);

      if (query.trim()) {
          const results = fuse.search(query);
          const filteredResults = results.map((result) => result.item);
          setFilteredTasks(filteredResults);
      } else {
          setFilteredTasks(allTask);
      }
  };

  return (
      <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title="Search" enterDelay={1000}>
              <IconButton
                  type="button"
                  aria-label="search"
                  sx={{ display: { xs: "inline", md: "none" } }}
              >
                  <SearchIcon />
              </IconButton>
          </Tooltip>
          <TextField
              label="Search"
              variant="outlined"
              size="small"
              fullWidth
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                  endAdornment: (
                      <IconButton type="button" aria-label="search" size="small">
                          <SearchIcon />
                      </IconButton>
                  ),
              }}
              sx={{ display: { md: "inline-block" }, mr: 1 }}
          />
       
      </Stack>
  );
}

export const SearchDisplay = ({ filteredTasks }) => {
return (
    <div>
    { filteredTasks && (
                <div className='space-y-3'>
                {
                    filteredTasks.map((task) => (
                        <TodoDisplay todo={task} />
                    ))
                }
            </div>)
        }
        </div>
)
}

