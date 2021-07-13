import Yweet from 'components/Yweet';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
  const [yweet, setYweet] = useState('');
  const [yweets, setYweets] = useState([]);
  const [attachment, setAttachment] = useState(null);

  useEffect(() => {
    dbService
      .collection('yweets')
      .orderBy('createAt', 'desc')
      .onSnapshot((snapshot) => {
        const yweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setYweets(yweetArray);
      });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!yweet && !attachment) {
      alert('Please input the contents!');
      return;
    }

    const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    const response = await fileRef.putString(attachment, 'data_url');
    console.log(response);
    // await dbService.collection('yweets').add({
    //   text: yweet,
    //   createAt: Date.now(),
    //   creatorId: userObj.uid,
    // });
    // setYweet('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setYweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachmentClick = () => setAttachment(null);

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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Yweet" />
        {attachment && (
          <div>
            <img src={attachment} alt="thumb" width="50px" heigth="50px" />
            <button onClick={onClearAttachmentClick}>Clear</button>
          </div>
        )}
      </form>
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
