import React, { useEffect, useState } from 'react';
import '../css/ChapterView.scss';

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);
  // HTTPでは使えないため一旦使わない
  // const handleCopy = (event) => {
  //   event.preventDefault();
  //   navigator.clipboard.writeText(code)
  //     .then(() => setCopied(true))
  //     .catch((error) => console.error('Failed to copy text: ', error));

  //   setTimeout(() => setCopied(false), 1500);
  // };

  return (
    <div>
      <pre>
        <code>{code}</code>
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

  const handleSearch = async () => {
    // 検索クエリを使ってAPIにリクエストを送信し、結果を取得するロジックを実装する
    // 例: const searchResults = await fetch(`${apiUrl}/search?q=${searchQuery}`).then(response => response.json());
    // 取得した結果を適切に処理してコンポーネントのステートに設定する
  };

  useEffect(() => {
    const applyHighlight = async () => {
      try {
        if (window.hljs) {
          document.querySelectorAll('pre code').forEach((block) => {
            window.hljs.highlightBlock(block);
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
        <h1>Please enter a chapter name!</h1>
      ) : (
        <h1>{chapterName}</h1>
      )}
      {sectionList.map((sec, index) => (
        <div className='sq-container' key={index}>
          <h2 onClick={() => toggleSection(index)}>{sec.sectionName}</h2>
          {expandedSections.includes(index) && (
            <div className='code-container'>
              {sec?.quizzes.map((sq, innerIndex) => (
                <div id={sq[2]} key={innerIndex}>
                  <h3>{innerIndex + 1}: {sq[0]}</h3>
                  <div className="code-toolbar">
                    <button className='delete-btn' onClick={() => handleDelete(sq[2])}></button>
                  </div>
                  <CodeBlock code={sq[1]} />
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
