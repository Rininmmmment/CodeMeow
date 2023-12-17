import React, { useState, useContext } from 'react';
import '../css/Make.scss';
import Navbar from '../components/Navbar';
import CodeSection from '../components/CodeSection';
import { useAuth } from '../components/AuthContext';

const Make = () => {
  const { userInfo } = useAuth();

  const [chapterName, setChapterName] = useState('');
  const [sectionName, setSectionName] = useState('');
  const [text, setText] = useState('');
  const [sqList, setSqList] = useState([[]]);
  const [userId, setUserId] = useState(userInfo);

  const [chapterId, setChapterId] = useState('');
  const [sectionId, setSectionId] = useState('');

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
          setServerResponse(data);
          setSectionName(data.section_name);
          setText(data.text);
          setSqList(data.sq_list);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.warn('No file selected.');
    }
  };
  
  const handleButtonClick = () => {
    // // chapter_nameを登録
    fetch('http://localhost:8000/chapters', {
      method: 'POST',
      body: JSON.stringify({
        chapter_name: chapterName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setChapterId(data.id);
      })
      .catch(error => {
        console.error('Error during POST:', error);
      });
    
    // // section_nameを登録
    fetch('http://localhost:8000/sections', {
      method: 'POST',
      body: JSON.stringify({
        section_name: sectionName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setSectionId(data.id);
      })
      .catch(error => {
        console.error('Error during POST:', error);
      });

    // クイズを登録
    sqList.forEach(function (sq) {
      const formData = new FormData();
      formData.append('question', sq[0]);
      formData.append('answer', sq[1]);
      formData.append('chapter_id', chapterId);
      formData.append('section_id', sectionId);
      formData.append('result', '0');
      formData.append('user_id', userId);
      formData.append('text', text);

      fetch('http://localhost:8000/quizzes', {
        method: 'POST',
        body: formData,
      })
    });
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
              <CodeSection
                chapterName={chapterName}
                sectionName={sectionName}
                sqList={sqList}
              />
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