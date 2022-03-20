import axios from "axios";

import React, { Component, useState } from "react";
// import {storage} from '../../../firebase'

import storage from '../../../firebase';

const UploadFile = () => {
  const [file, setFile] = useState('');
  const [url, setUrl] = useState('');

  function handleUpload(e) {
    setFile(e.target.files[0]);
  }

  // uploads file to firebase
  const upload = (e) => {
    e.preventDefault();
    if(file == null){
      return;
    }

    const ref = storage.ref(`/images/${file.name}`);
    const uploadTask = ref.put(file);
    uploadTask.on("stage_changed", alert("success"), alert, () => {
      ref.getDownloadURL().then((url) => {
        setFile(null);
        setUrl(url);
      })
    })

    // storage.ref(`/images/${file.name}`).put(file).on("state_changed", alert("success"), alert);
  }



    return (
      <div>
        <h1>Miguel's uploading</h1>
        <h3>File Upload using React!</h3>
        <div>
          <input type="file" onChange={handleUpload} />
          <button onClick={upload}>Upload!</button>
        </div>
        <img src={url} alt="upload" width={150} height={150}/>
        {/* {this.fileData()} */}
      </div>
    );
  
}

export default UploadFile;
