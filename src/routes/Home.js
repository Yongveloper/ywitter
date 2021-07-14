import Yweet from 'components/Yweet';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import YweetFactory from 'components/YweetFactory';

const Home = ({ userObj }) => {
  const [yweets, setYweets] = useState([]);

  useEffect(() => {
    const fetchData = dbService
      .collection('yweets')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const yweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setYweets(yweetArray);
      });
    return () => fetchData();
  }, []);

  return (
    <div className="container">
      <YweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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
