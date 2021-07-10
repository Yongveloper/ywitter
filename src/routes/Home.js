import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
  const [yweet, setYweet] = useState('');
  const [yweets, setYweets] = useState([]);

  useEffect(() => {
    dbService.collection('yweets').onSnapshot((snapshot) => {
      const yweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setYweets(yweetArray);
      console.log(yweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('yweets').add({
      text: yweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
    });
    setYweet('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setYweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={yweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Yweet" />
      </form>
      <div>
        {yweets.map((yweet) => (
          <div key={yweet.id}>
            <h4>{yweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
