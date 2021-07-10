import { dbService } from 'fbase';
import React, { useState } from 'react';

const Home = () => {
  const [yweet, setYweet] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('nweets').add({
      yweet,
      createAt: Date.now(),
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
          maxlength={120}
        />
        <input type="submit" value="Yweet" />
      </form>
    </div>
  );
};

export default Home;
