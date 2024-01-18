import React, { useEffect, useState } from 'react';
import '../css/CodePreview.scss';
import ReactMarkdown from 'react-markdown';

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(code)
      .then(() => setCopied(true))
      .catch((error) => console.error('Failed to copy text: ', error));

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <pre className='highlight'>
        <code className='highlight' onClick={handleCopy}>{code}</code>
      </pre>
      {copied && <div className="copy-message">Copied!</div>}
    </div>
  );
};

const CodePreview = (props) => {
  const { chapterName, sectionName, sqList } = props;

  useEffect(() => {
    if (window.hljs) {
      document.querySelectorAll('pre code').forEach((block) => {
        window.hljs.highlightBlock(block);
      });
    }
  }, []);

  return (
    <div className='code-section-container'>
      {chapterName.length === 0 ? (
        <p className='chapter-name'>Please enter a chapter name!</p>
      ) : (
        <p className='chapter-name'>{chapterName}</p>
      )}
      <div className='sq-container'>
        <p className='section-name'>{sectionName}</p>
        {sqList.map((sq, index) => (
          <div key={index}>
            <h3>{index + 1}: {sq[0]}</h3>
            {sq[1].length !== 0 && <div className='md-container'><ReactMarkdown>{sq[1]}</ReactMarkdown></div>}
            <CodeBlock code={sq[2]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodePreview;