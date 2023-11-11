import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function MyQuillEditor () {
    const [content, setContent] = useState('');
    console.log(content);

    const handleChange = (value) => {
      setContent(value);
    };
  
    return (
      <div>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleChange}
        />
      </div>
    );
}

export default MyQuillEditor 