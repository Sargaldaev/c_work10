import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { Box, Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { deleteComment, fetchDataComments } from '../../store/comments/commentsThunk.ts';

const Comments = () => {
  const {id} = useParams();
  const {comments, fetchLoad, deleteLoad} = useSelector(
    (state: RootState) => state.comments,
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchDataComments(id));
    }
  }, [dispatch, id]);

  const deleteCommById = async (Id: string) => {
    await dispatch(deleteComment(Id));
    if (id) {
      await dispatch(fetchDataComments(id));
    }
  };

  return (
    <Box
      component="div"
      maxHeight="500px"
      border="2px solid #000"
      padding="20px"
      marginTop={'40px'}
    >
      <Typography>

        Comments
      </Typography>
      {fetchLoad
        ? 'Load...'
        : comments.map((item) => {
          return (
            <Box key={item.id} sx={{width: '500px', position: 'relative'}}>
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
                  <b> Author: </b>
                  {item.author}
                </Typography>

                <Typography>
                  <b> Desc: </b>
                  {item.description}
                </Typography>
                <Button
                  variant={'contained'}
                  sx={{
                    background: 'red',
                    color: 'white'
                  }}
                  onClick={() => deleteCommById(`/${item.id}`)}
                >
                  {deleteLoad ? 'load' : 'delete'}
                </Button>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};

export default Comments;
