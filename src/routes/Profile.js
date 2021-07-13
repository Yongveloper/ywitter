import { authService, dbService } from 'fbase';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  const getMyYweets = async () => {
    const yweets = await dbService
      .collection('yweets')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt')
      .get();
    console.log(yweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyYweets();
  }, []);

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
