import React, { useEffect, useState } from 'react';
import '../css/ChapterView.scss';
import ReactMarkdown from 'react-markdown';

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div>
      <pre className='highlight'>
        <code className='highlight language-cpp'>{code}</code>
      </pre>
    </div>
  );
};

const ChapterView = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { chapterName, sectionList } = props;

  const [expandedSections, setExpandedSections] = useState([]);

  const handleDelete = async (quizId) => {
    try {
      // CSRFトークン取得
      const csrfResponse = await fetch(`${apiUrl}/get_csrf_token`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!csrfResponse.ok) {
        throw new Error('ネットワーク応答が正常ではありませんでした');
      }
  
      const csrfToken = csrfResponse.headers.get('x-csrf-token');
      if (!csrfToken) {
        throw new Error('X-CSRF-Tokenが見つかりません');
      }
  
      // クイズ削除
      const deleteResponse = await fetch(`${apiUrl}/quizzes/${quizId}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': csrfToken,
        },
      });
  
      if (deleteResponse.ok) {
        console.log('Quiz deleted successfully');
  
        // 削除成功したらページを再読み込み
        window.location.reload();
      } else {
        console.error('Failed to delete quiz');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const toggleSection = (index) => {
    setExpandedSections((prevExpanded) => {
      const isExpanded = prevExpanded.includes(index);
      if (isExpanded) {
        return prevExpanded.filter((item) => item !== index);
      } else {
        return [...prevExpanded, index];
      }
    });
  };

  useEffect(() => {
    const applyHighlight = async () => {
      try {
        if (window.hljs) {
          document.querySelectorAll('pre.highlight code.highlight').forEach((block) => {
            window.hljs.highlightBlock(block, 'cpp');
          });
        }
      } catch (error) {
        console.error('Error applying highlight:', error);
      }
    };

    applyHighlight();
  }, [sectionList, expandedSections]);
  
  return (
    <div className='code-section-container'>
      {chapterName.length === 0 ? (
        <p className='chapter-name'>Please enter a chapter name!</p>
      ) : (
        <p className='chapter-name'>{chapterName}</p>
      )}
      {sectionList.map((sec, index) => (
        <div className='sq-container' key={index}>
          <p className='section-name' onClick={() => toggleSection(index)}>{sec.sectionName}</p>
          {expandedSections.includes(index) && (
            <div className='code-container'>
              {sec?.quizzes.map((sq, innerIndex) => (
                <div id={sq[2]} key={innerIndex} className='each-sq'>
                  <h3>{innerIndex + 1}: {sq[0]}</h3>
                  <div className='code'>
                    <div className="code-toolbar">
                      <button className='delete-btn' onClick={() => handleDelete(sq[2])}></button>
                    </div>
                    {sq[1].length !== 0 && <div className='md-container'><ReactMarkdown>{sq[1]}</ReactMarkdown></div>}
                    <CodeBlock code={sq[2]} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChapterView;
