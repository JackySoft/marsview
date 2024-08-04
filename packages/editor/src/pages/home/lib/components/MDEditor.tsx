import { forwardRef, useImperativeHandle, useState } from 'react';
import { Editor, Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import gemoji from '@bytemd/plugin-gemoji';
import highlight from '@bytemd/plugin-highlight';
import 'bytemd/dist/index.css';
import 'highlight.js/styles/vs.min.css';
import 'github-markdown-css';
import './index.less';
/**
 * Markdown 编辑器
 */
function MDEditor(_: any, ref: any) {
  const [code, setCode] = useState<string>(localStorage.getItem('md-code') || '');

  useImperativeHandle(ref, () => {
    return {
      getCode() {
        return code;
      },
    };
  });

  return (
    <div className="code-editor">
      <Editor
        value={code}
        plugins={[gfm(), gemoji(), highlight()]}
        onChange={(v) => {
          localStorage.setItem('md-code', v);
          setCode(v);
        }}
      />
    </div>
  );
}

export default forwardRef(MDEditor);
