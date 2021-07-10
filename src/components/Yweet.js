import React from 'react';

const Yweet = ({ yweetObj, isOwner }) => {
  return (
    <div>
      <h4>{yweetObj?.text}</h4>
      {isOwner && (
        <>
          <button>Delete Yweet</button>
          <button>Edit Yweet</button>
        </>
      )}
    </div>
  );
};

export default Yweet;
