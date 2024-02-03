import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { INewsCreate } from '../../type';
import { Box, Button, TextField } from '@mui/material';
import InputFile from '../../Components/InputFile/InputFile.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData, postData } from '../../store/news/newsThunk.ts';

const Form = () => {
  const [state, setState] = useState<INewsCreate>({
    title: '',
    description: '',
    image: null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {postLoad} = useSelector((state: RootState) => state.news);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState((prevState) => ({...prevState, [name]: value}));
  };
  const onChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setState((prevState) => ({...prevState, [name]: files[0]}));
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(postData(state));
    await dispatch(fetchData());
    navigate('/');
    setState({title: '', description: '', image: null});
  };
  return (
    <>
      <Button
        component={Link}
        to={'/'}
        variant={'contained'}
        sx={{marginLeft: '10px', display: 'block', width: '20px', margin: 'auto'}}
      >
        Main
      </Button>
      <Box
        component="form"
        onSubmit={onSubmit}
        display="flex"
        sx={{'& > :not(style)': {m: 1, margin: 'auto',marginTop:'20px'}}}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <TextField
            id="input-with-sx"
            label="Title"
            name="title"
            required
            sx={{width: '100%'}}
            onChange={onChange}
            value={state.title}
          />

          <TextField
            id="filled-multiline-static"
            label="Description"
            multiline
            required
            rows={2}
            sx={{width: '100%', marginTop: '5px', marginBottom: '5px'}}
            name="description"
            onChange={onChange}
            value={state.description}
          />

          <InputFile onChange={onChangeFiles} name={'image'} label={'image'}/>
          <Button
            type={'submit'}
            sx={{
              width: '100%',
              marginTop: '5px',
              background: 'green',
            }}
            variant={'contained'}
          >
            {postLoad ? 'load' : 'Send'}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Form;
