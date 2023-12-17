import React, { useEffect, useState } from 'react';
import '../css/CodeList.scss';
import Navbar from '../components/Navbar.js';
import CodeSection from '../components/CodeSection';
import { useAuth } from '../components/AuthContext';


const Menu = () => {
    const { userInfo } = useAuth();
    const [userId, setUserId] = useState(userInfo);
    const [quizzes, setQuizzes] = useState([]);
    const [chapterName, setChapterName] = useState('');
    const [sectionName, setSectionName] = useState('');

    useEffect(() => {
        const fetchQuizzes = async () => {
          try {
            const response = await fetch(`http://localhost:8000/quizzes?user_id=${encodeURIComponent(userId)}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            setQuizzes(data);
            setChapterName(data)
          } catch (error) {
            console.error('Error fetching quizzes:', error);
          }
        };
    
        fetchQuizzes();
      }, [userId]);

  return (
    <div>
      <Navbar />
                    {/* <CodeSection
                chapterName={chapterName}
                sectionName={sectionName}
                sqList={sqList}
              /> */}
    </div>
  );
};

export default Menu;
