import { useEffect } from 'react';
import { Box, Button, CardMedia, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { Link, useParams } from 'react-router-dom';
import { fetchDataById } from '../../store/news/newsThunk.ts';
import FormComment from '../FormComment/FormComment.tsx';
import Comments from '../Comments/Comments.tsx';

const FullNews = () => {
  const {id} = useParams();
  const {fullNews, fullNewsLoad} = useSelector(
    (state: RootState) => state.news,
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchDataById(id));
    }
  }, [dispatch, id]);
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
        <Typography
          sx={{fontSize: '20px',fontWeight:'bold'}}
        >
          Full News
        </Typography>
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
          {fullNewsLoad ? (
            'Load...'
          ) : (
            <Box
              key={fullNews?.id}
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
                  {fullNews?.title}
                </Typography>

                <Typography>
                  <b> Description: </b>
                  {fullNews?.description}
                </Typography>
                <Typography>
                  <b> Datetime: </b>
                  {fullNews?.datetime}
                </Typography>

                {!fullNews?.image ? (
                  ''
                ) : (
                  <CardMedia
                    component="img"
                    height="200"
                    width={'200'}
                    image={`http://localhost:8000/${fullNews.image}`}
                    alt="Paella dish"
                  />
                )}
              </Box>

              <FormComment/>
              <Button
                component={Link}
                to={'/'}
                variant={'contained'}
                sx={{marginLeft: '10px'}}
              >
                Main
              </Button>
            </Box>
          )}
          <Comments/>
        </Box>
      </Box>
    </>
  );
};

export default FullNews;
