import Yweet from 'components/Yweet';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import YweetFactory from 'components/YweetFactory';

const Home = ({ userObj }) => {
  const [yweets, setYweets] = useState([]);

  useEffect(() => {
    dbService
      .collection('yweets')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const yweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setYweets(yweetArray);
      });
  }, []);

  return (
    <div>
      <YweetFactory userObj={userObj} />
      <div>
        {yweets.map((yweet) => (
          <Yweet
            key={yweet.id}
            yweetObj={yweet}
            isOwner={yweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
