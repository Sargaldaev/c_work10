import { useEffect } from 'react';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CardMedia, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { deleteNews, fetchData } from '../../store/news/newsThunk.ts';
import * as dayjs from 'dayjs';

const News = () => {
  const {news, fetchLoad, deleteLoad} = useSelector((state: RootState) => state.news);
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
        <Button component={NavLink} to={`/addNews`} variant={'contained'}>
          Add News
        </Button>
        <Box
          component="div"
          maxHeight="500px"
          width="900px"
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
                      display: 'flex',
                      padding: '10px',
                      width: '820px',
                      marginBottom: '10px',
                      background: 'rgb(106, 90, 205)',
                      color: 'white',
                      borderRadius: '10px',
                    }}
                  >
                    <Box>
                      {!item.image ? (
                        ''
                      ) : (
                        <CardMedia
                          component="img"
                          height="150"
                          width={'150'}
                          image={`http://localhost:8000/${item.image}`}
                          alt="Paella dish"
                        />
                      )}
                    </Box>

                    <Box paddingLeft={'10px'}>
                      <Typography>
                        <b> Title: </b>
                        {item.title}
                      </Typography>
                      <Typography>
                        <b> Datetime: </b>
                        {dayjs(item.datetime).format('YYYY-MM-DD HH:mm:ss')}
                      </Typography>

                      <Button
                        component={NavLink}
                        to={`/fullNews/${item.id}`}
                        variant={'contained'}
                        sx={{marginRight: '10px', marginTop: '60px'}}
                      >
                        Read full post
                      </Button>

                      <Button
                        disabled={deleteLoad === item.id.toString()}
                        variant={'contained'}
                        onClick={() => deleteNewsById(`/${item.id}`)}
                        sx={{marginTop: '60px'}}
                      >
                        {

                          deleteLoad === item.id.toString() ? 'load' : 'delete'}
                      </Button>
                    </Box>
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
