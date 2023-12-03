import React, { useState } from 'react';
import '../css/Make.scss';
import Navbar from '../components/Navbar.js';

const Make = () => {
  const [chapterName, setChapterName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isFilesUploaded, setFilesUploaded] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);

  const handleChapterNameChange = (e) => {
    setChapterName(e.target.value);
  };

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setSelectedFiles(selectedFiles);
    setFilesUploaded(true);

    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        formData.append(`file`, file);
      });

      fetch('http://localhost:8000/read-file', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setServerResponse(data); // レスポンスをステートにセット
          console.log('Server response:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.warn('No file selected.');
    }
  };

  const handleButtonClick = () => {
    // quiz情報を整形し、user_idを取得し、forでpostする
    fetch('http://localhost:8000/read-file', {
        method: 'POST',
        body: JSON.stringify({
          question: sq,
          answer: sq_ans,
          chapter_id: chapter_id,
          section_id: section_id,
          result: 0,
          user_id: user_id,
          text: mq,
        }),
      })
  };

  return (
    <div className='make-container'>
      <Navbar />
      <div className='form-container'>
        <label className='chapter-name'>
          <span className='btn-title'>Chapter Name<br /></span>
          <input
            type="text"
            value={chapterName}
            onChange={handleChapterNameChange}
          />
          {/* サーバーからの応答を表示 */}
          {serverResponse && (
            <div className='server-response'>
              <pre>{JSON.stringify(serverResponse, null, 2)}</pre>
            </div>
          )}
        </label>
        <br />
        <label className='file-upload'>
          <span className='btn-title'>File Upload (.py, .cpp)<br /></span>
          <span className='btn-comment'>You can upload files at once if they are from the same chapter.</span>
          <input
            type="file"
            accept=".py,.cpp"
            onChange={handleFileUpload}
            multiple
          />
        </label>
        <br />
        {isFilesUploaded && (
          <button className='make-btn' type="button" onClick={handleButtonClick}>
            MAKE QUIZZES
          </button>
        )}
        <br />
      </div>
    </div>
  );
};

export default Make;
