import React, { useEffect, useState } from 'react';
import '../css/ChapterView.scss';

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(code)
      .then(() => setCopied(true))
      .catch((error) => console.error('Failed to copy text: ', error));

    setTimeout(() => setCopied(false), 1500);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    console.log("削除ボタン");
  }

  return (
    <div>
      <div className="code-toolbar">
        <button onClick={handleDelete}>削除</button>
      </div>
      <pre>
        <code onClick={handleCopy}>{code}</code>
      </pre>
      {copied && <div className="copy-message">Copied!</div>}
    </div>
  );
};

const ChapterView = (props) => {
  const { chapterName, sectionList } = props;

  const [expandedSections, setExpandedSections] = useState([]);

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
                <div key={innerIndex}>
                  <h3>{innerIndex + 1}: {sq[0]}</h3>
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
