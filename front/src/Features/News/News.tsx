import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CardMedia, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { deleteNews, fetchData } from '../../store/news/newsThunk.ts';

const News = () => {
  const {news, fetchLoad} = useSelector((state: RootState) => state.news);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const deleteNewsById = async (id: string) => {
    await dispatch(deleteNews(id));
    await dispatch(fetchData());
  };

  return (
    <>
      <Box
        component="div"
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          marginTop: '40px',
        }}
      >
        <Button
          component={NavLink}
          to={`/addNews`}
          variant={'contained'}
        >
          Add News
        </Button>
        <Box
          component="div"
          maxHeight="500px"
          sx={{
            overflowY: 'scroll',
            borderRadius: '10px',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '12px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'lightgray',
              borderRadius: '6px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            marginTop: '10px',
          }}
          border="4px solid #000"
          padding="20px"
        >
          {fetchLoad
            ? 'Load...'
            : news.map((item) => {
              return (
                <Box
                  key={item.id}
                  sx={{width: '500px', position: 'relative'}}
                >
                  <Box
                    component="div"
                    sx={{
                      padding: '30px',
                      marginBottom: '10px',
                      background: 'rgb(106, 90, 205)',
                      color: 'white',
                      borderRadius: '10px',
                    }}
                  >
                    <Typography>
                      <b> Title: </b>
                      {item.title}
                    </Typography>
                    <Typography>
                      <b> Datetime: </b>
                      {item.datetime}
                    </Typography>

                    {!item.image ? (
                      ''
                    ) : (
                      <CardMedia
                        component="img"
                        height="200"
                        width={'200'}
                        image={`http://localhost:8000/${item.image}`}
                        alt="Paella dish"
                      />
                    )}

                    <Button
                      component={NavLink}
                      to={`/fullNews/${item.id}`}
                      variant={'contained'}
                    >
                      Read full post
                    </Button>
                    <Button
                      variant={'contained'}
                      onClick={() => deleteNewsById(`/${item.id}`)}
                    >
                      delete
                    </Button>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>
    </>
  );
};

export default News;
