import React, { useState } from 'react';
import '../css/Make.scss';
import Navbar from '../components/Navbar.js';

const Make = () => {
  const [chapterName, setChapterName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isFilesUploaded, setFilesUploaded] = useState(false);

  const handleChapterNameChange = (e) => {
    setChapterName(e.target.value);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setFilesUploaded(true);
    // ファイルをアップロードするための処理を実装
    console.log('Files uploaded:', files);
  };

  const handleButtonClick = () => {
    // ボタンがクリックされたときの処理をここに追加
    console.log('Button clicked!');
  };

  return (
    <div className='make-container'>
      <Navbar />
      <div className='form-container'>
        <label className='chapter-name'>
          <span className='btn-title'>Chapter Name:<br /></span>
          <input
            type="text"
            value={chapterName}
            onChange={handleChapterNameChange}
          />
        </label>
        <br />
        <label className='file-upload'>
          <span className='btn-title'>File Upload (.py, .cpp):<br /></span>
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
