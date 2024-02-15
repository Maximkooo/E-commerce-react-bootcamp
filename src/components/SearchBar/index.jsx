import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UNIQ_ID } from '../../common/constants';

const SearchBar = ({ options, searchHandle }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([])
  const loading = open && items.length === 0;
  const navigate = useNavigate()

  useEffect(() => {
    if (!options.length) {
      setOpen(false);
    }
    setItems(options)
  }, [options])

  const onTagsChange = (product) => {
    const id = product.shop === 1 ? product.id - UNIQ_ID : product.id
    navigate(`/product/${product.shop}/${id}`);
  }

  return (
    <div className='flex justify-center'>
      <Autocomplete
        id="asynchronous"
        sx={{ width: '85%' }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        getOptionLabel={(option) => option.title}
        options={options}
        loading={loading}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            setOpen(true);
            searchHandle(event)
          }
        }}
        name={'34'}
        onChange={(_, value) => onTagsChange(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </div>
  );
}

export default SearchBar