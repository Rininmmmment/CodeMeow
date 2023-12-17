import React, { useEffect, useState } from 'react';
import '../css/CodeSection.scss';

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
      <pre>
        <code onClick={handleCopy}>{code}</code>
      </pre>
      {copied && <div className="copy-message">Copied!</div>}
    </div>
  );
};

const SectionView = (props) => {
    const { sectionList } = props;
    console.log(sectionList);
    useEffect(() => {
        if (window.hljs) {
        document.querySelectorAll('pre code').forEach((block) => {
            window.hljs.highlightBlock(block);
        });
        }
    }, []);

  return (
    <div className='sq-container'>
        {sectionList.map((sec) => (
        <h2>{sec.sectionName}</h2>

        ))}
        
    </div>
  );
};

export default SectionView;
        {/* {sqList.map((sq, index) => (
            <div key={index}>
            <h3>{index + 1}: {sq[0]}</h3>
            <CodeBlock code={sq[1]} />
            </div>
        ))} */}