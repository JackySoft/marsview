import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useDebounceFn } from 'ahooks';
import { Splitter } from 'antd';
import ComPreview from './ComPreview';
import less from 'less';
import { usePageStore } from '@/stores/pageStore';

/**
 * 组件代码编辑
 */
export default forwardRef((_: any, ref: React.ForwardedRef<{ getCode: () => void }>) => {
  const [code, setCode] = useState('');
  const [css, setCss] = useState('');
  const [refreshTag, setRefreshTag] = useState(0);
  const editorRef = useRef<any>(null);

  const theme = usePageStore((state) => state.theme);

  useImperativeHandle(ref, () => {
    return {
      getCode() {
        return code;
      },
      getCompileCode() {
        return css;
      },
      refresh() {
        setRefreshTag(refreshTag + 1);
      },
    };
  });

  useEffect(() => {
    const code = localStorage.getItem('less-code');
    setCode(code || '');
  }, []);

  useEffect(() => {
    compileLess(code);
  }, [code]);

  // 编译less
  const compileLess = async (value: string) => {
    try {
      if (!value) return;
      localStorage.setItem('less-code', value);
      const result = await less.render(value);
      setCss(result.css);
      localStorage.setItem('less-compile', result.css);
      const target = document.getElementById('less-style');
      if (target) {
        target.innerHTML = result.css;
      } else {
        const style = document.createElement('style');
        style.id = 'less-style';
        style.innerHTML = result.css;
        document.head.appendChild(style);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 监听内容变化
  const onChange = async (value: string = '') => {
    setCode(value);
  };

  const { run } = useDebounceFn(onChange, { wait: 300 });

  return (
    <div className="code-editor">
      <Splitter>
        <Splitter.Panel defaultSize="50%">
          <Editor
            language={'less'}
            theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
            value={code}
            onChange={run}
            options={{
              lineNumbers: 'on',
              minimap: {
                enabled: false,
              },
            }}
            onMount={(editor) => (editorRef.current = editor)}
          />
        </Splitter.Panel>
        <Splitter.Panel defaultSize="50%">
          <ComPreview refreshTag={refreshTag} />
        </Splitter.Panel>
      </Splitter>
    </div>
  );
});
