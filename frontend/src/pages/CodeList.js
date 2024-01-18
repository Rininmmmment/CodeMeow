import React, { useEffect, useState } from 'react';
import '../css/CodeList.scss';
import Navbar from '../components/Navbar.js';
import ChapterView from '../components/ChapterView';
import { useAuth } from '../components/AuthContext';

const CodeList = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { userInfo } = useAuth();
  const [userId, setUserId] = useState(userInfo);
  const [serverResponse, setServerResponse] = useState(null);
  const [chapterNameList, setChapterNameList] = useState([]);
  const [sectionNameList, setSectionNameList] = useState([]);
  const [convertedList, setConvertedList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchQuizzes = async () => {
    try {
      const response = await fetch(`${apiUrl}/quizzes?user_id=${encodeURIComponent(userId)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setServerResponse(data);

      // JSONをリストに変換
      const convertedList = Object.keys(data).map((chapter) => {
        const sections = Object.keys(data[chapter]).map((section) => {
          const quizzes = data[chapter][section].map((quiz) => [
            quiz.question,
            quiz.text,
            quiz.answer,
            quiz.id
          ]);

          return {
            sectionName: section,
            quizzes: quizzes,
          };
        });

        return {
          chapterName: chapter,
          sections: sections,
        };
      });

      // データをセット
      setChapterNameList(convertedList);
      setConvertedList(convertedList);

    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [userId]);

  const handleSearch = async () => {
    if (searchQuery.length==0) {
      fetchQuizzes();
    }
    else {
      try {
        console.log("Serch word: " + searchQuery);
        const response = await fetch(`${apiUrl}/serch/${encodeURIComponent(searchQuery)}/${encodeURIComponent(userId)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const searchData = await response.json();
        console.log(searchData);
        setServerResponse(searchData);
        // JSONをリストに変換
        const convertedList = Object.keys(searchData).map((chapter) => {
          const sections = Object.keys(searchData[chapter]).map((section) => {
            const quizzes = searchData[chapter][section].map((quiz) => [
              quiz.question,
              quiz.answer,
              quiz.id
            ]);

            return {
              sectionName: section,
              quizzes: quizzes,
            };
          });

          return {
            chapterName: chapter,
            sections: sections,
          };
        });

        // データをセット
        setChapterNameList(convertedList);
        setConvertedList(convertedList);

      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='code-list-container'>
      <Navbar />

      {/* 検索ボックスの追加 */}
      <div className='serch-container'>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className='view-container'>
        {convertedList.length > 0 && (
          <>
            {convertedList.map((item) => (
              <ChapterView
                key={item.chapterName} 
                chapterName={item.chapterName}
                sectionList={item.sections}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CodeList;
