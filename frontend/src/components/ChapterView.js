import React, { useEffect, useState } from 'react';
import '../css/ChapterView.scss';
import ReactMarkdown from 'react-markdown';

const MarkdownBlock = ({ md, onEditMd, isEditingMd, onEditChangeMd, editedMd, quizId }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const updateMarkdown = async (quizId) => {
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
      const formData = new FormData();
      formData.append('text', editedMd);
      return fetch(`${apiUrl}/quizzes/${quizId}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'X-CSRF-Token': csrfToken,
        },
      })
      .then(async (response) => {
        const data = await response.json();
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    })
  };

  return (
    <div className='md-container'>
      {isEditingMd ? (
        <div>
          <button className='edit-btn tool-btn md-edit' onClick={() => updateMarkdown(quizId)}><i class="fa-regular fa-circle-check"></i></button>
          <textarea className='md-edit-form'
            value={editedMd} onChange={onEditChangeMd}
            style={{ height: "auto", minHeight: "300px", resize: "vertical"}}
            />
        </div>
        
      ) : (
        <div>
          <button className='edit-btn tool-btn md-edit' onClick={onEditMd}><i className="fa-solid fa-pen-to-square"></i></button>
          <ReactMarkdown>{md}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

const CodeBlock = ({ code, onEdit, isEditing, onEditChange, editedCode, quizId }) => {
  const [copied, setCopied] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const updateCode = async (quizId) => {
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
      const formData = new FormData();
      formData.append('answer', editedCode);
      return fetch(`${apiUrl}/quizzes/${quizId}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'X-CSRF-Token': csrfToken,
        },
      })
      .then(async (response) => {
        const data = await response.json();
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    })
  };

  return (
    <div>
      <pre className='highlight'>
        {isEditing ? (
          <div>
            <button className='edit-btn tool-btn code-edit' onClick={() => updateCode(quizId)}><i class="fa-regular fa-circle-check"></i></button>
            <textarea className='code-edit-form'
              value={editedCode} onChange={onEditChange}
              style={{ height: "auto", minHeight: "300px", resize: "vertical"}}
              />
          </div>
          
        ) : (
          <div>
            <button className='edit-btn tool-btn code-edit' onClick={onEdit}><i className="fa-solid fa-pen-to-square"></i></button>
            <code className='highlight language-cpp'>{code}</code>
          </div>
        )}
      </pre>
    </div>
  );
};

const ChapterView = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { chapterName, sectionList } = props;

  const [expandedSections, setExpandedSections] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedCode, setEditedCode] = useState("");
  const [editModeMd, setEditModeMd] = useState(null);
  const [editedMd, setEditedMd] = useState("");

  const handleEdit = (index, code) => {
    setEditMode(index);
    setEditedCode(code);
  };

  const handleEditChange = (value) => {
    setEditedCode(value);
  };

  const handleEditMd = (index, md) => {
    setEditModeMd(index);
    setEditedMd(md);
  };

  const handleEditChangeMd = (value) => {
    setEditedMd(value);
  };

  const handleDelete = async (quizId) => {
    try {
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
  }, [sectionList, expandedSections, editMode]);
  
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
                <div id={sq[3]} key={innerIndex} className='each-sq'>
                  <h3>{innerIndex + 1}: {sq[0]}</h3>
                  <div className="code-toolbar">
                      <button className='delete-btn tool-btn' onClick={() => handleDelete(sq[3])}><i class="fa-solid fa-circle-minus"></i></button>
                  </div>
                  <div className='code'>
                    {sq[1].length !== 0 &&
                      <MarkdownBlock
                        md={sq[1]}
                        onEditMd={() => handleEditMd(innerIndex, sq[1])}
                        isEditingMd={editModeMd === innerIndex}
                        onEditChangeMd={(e) => handleEditChangeMd(e.target.value)}
                        editedMd={editedMd}
                        quizId={sq[3]}
                      />
                    }
                    <CodeBlock
                      code={sq[2]}
                      onEdit={() => handleEdit(innerIndex, sq[2])}
                      isEditing={editMode === innerIndex}
                      onEditChange={(e) => handleEditChange(e.target.value)}
                      editedCode={editedCode}
                      quizId={sq[3]}
                    />
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
