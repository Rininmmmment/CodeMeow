import React, { useState } from 'react';

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
    <div>
      <label>
        Chapter Name:
        <input
          type="text"
          value={chapterName}
          onChange={handleChapterNameChange}
        />
      </label>
      <br />
      <label>
        File Upload (.py, .cpp, etc.):
        <input
          type="file"
          accept=".py,.cpp,text/plain"
          onChange={handleFileUpload}
          multiple
        />
      </label>
      <br />
      {isFilesUploaded && (
        <button type="button" onClick={handleButtonClick}>
          MAKE QUIZZES
        </button>
      )}
      <br />
    </div>
  );
};

export default Make;
