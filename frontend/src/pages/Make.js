import React, { useState, useEffect } from 'react';
import '../css/Make.scss';
import Navbar from '../components/Navbar';
import CodePreview from '../components/CodePreview';
import { useAuth } from '../components/AuthContext';

const Make = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { userInfo } = useAuth();

  const [chapterList, setChapterList] = useState([]);
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
  const [loading, setLoading] = useState(false);
  const [registrationCompleted, setRegistrationCompleted] = useState(false);

  const filteredChapterNameList = chapterList.filter(chapter =>
    chapter.includes(chapterName.toLowerCase())
  );

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

      fetch(`${apiUrl}/get_csrf_token`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('ネットワーク応答が正常ではありませんでした');
          }
          const csrfToken = response.headers.get('x-csrf-token');
          if (!csrfToken) {
            throw new Error('X-CSRF-Tokenが見つかりません');
          }
          return fetch(`${apiUrl}/read-file`, {
            method: 'POST',
            body: formData,
            headers: {
              'X-CSRF-Token': csrfToken,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setServerResponse(data);
              setSectionName(data.section_name);
              setText(data.text);
              setSqList(data.sq_list);
              console.log(data.chapterName);
              console.log(data.sq_list);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        })

    } else {
      console.warn('No file selected.');
    }
  };
  
  const handleButtonClick = async () => {
    try {
      setLoading(true);

      // chapter_nameを登録
      const chapterResponse = await fetch(`${apiUrl}/chapters`, {
        method: 'POST',
        body: JSON.stringify({
          chapter_name: chapterName,
        }),
        headers: {
          'Content-Type': 'application/json',
          
        },
      });
      if (!chapterResponse.ok) {
        throw new Error(`HTTP error! Status: ${chapterResponse.status}`);
      }
      const chapterData = await chapterResponse.json();
      setChapterId(chapterData.id);

      // section_nameを登録
      const sectionResponse = await fetch(`${apiUrl}/sections`, {
        method: 'POST',
        body: JSON.stringify({
          section_name: sectionName,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!sectionResponse.ok) {
        throw new Error(`HTTP error! Status: ${sectionResponse.status}`);
      }
      const sectionData = await sectionResponse.json();
      setSectionId(sectionData.id);

      // クイズを登録
      const quizRequests = sqList.map(async (sq) => {
        const formData = new FormData();
        formData.append('question', sq[0]);
        formData.append('answer', sq[2]);
        formData.append('chapter_id', chapterId);
        formData.append('section_id', sectionId);
        formData.append('result', '0');
        formData.append('user_id', userId);
        formData.append('text', sq[1]);

        const quizResponse = await fetch(`${apiUrl}/quizzes`, {
          method: 'POST',
          body: formData,
        });

        if (!quizResponse.ok) {
          throw new Error(`HTTP error! Status: ${quizResponse.status}`);
        }
      });

      // すべてのクイズが完了するのを待つ
      await Promise.all(quizRequests);
      setRegistrationCompleted(true);
      setTimeout(() => {
        setRegistrationCompleted(false);
      }, 2000);

    } catch (error) {
      console.error('Error during POST:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch(`${apiUrl}/chapters`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setChapterList(data.chapters.map(chapter => chapter.chapter_name));
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchChapters();
  }, [chapterList]);

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
              <CodePreview
                chapterName={chapterName}
                sectionName={sectionName}
                sqList={sqList}
              />
            </div>
          )}
        </label>
        <br />
        <label className='file-upload'>
          <span className='btn-title'>File Upload (.cpp)<br /></span>
          <input
            type="file"
            accept=".cpp"
            onChange={handleFileUpload}
            multiple
          />
        </label>
        <br />
        {isFilesUploaded && (
          <button className='make-btn' type="button" onClick={handleButtonClick}>
            {loading ? 'Making...' : 'MAKE QUIZZES'}
          </button>
        )}
        {registrationCompleted && (
          <div className='registration-completed'>
            Registration Completed!
          </div>
        )}
        <br />
      </div>
    </div>
  );
};

export default Make;