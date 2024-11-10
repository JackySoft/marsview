import { isNotEmpty } from '@/packages/utils/util';
import { usePageStore } from '@/stores/pageStore';
import Editor, { loader, useMonaco } from '@monaco-editor/react';
import { useEffect, useRef } from 'react';
/**
 * 封装vscode编辑器
 */

export default function VsEditor({ height, language, value, onChange }: any) {
  const theme = usePageStore((state) => state.theme);
  const monaco = useMonaco();
  const editorRef = useRef<any>(null);
  useEffect(() => {
    monaco?.languages.registerCompletionItemProvider('javascript', {
      provideCompletionItems: function (model, position) {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
        return {
          suggestions: createDependencyProposals(range),
        };
      },
    });
  }, [monaco]);
  function createDependencyProposals(range: any) {
    if (!monaco) return [];
    // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
    // here you could do a server side lookup
    return [
      {
        label: 'context',
        kind: monaco.languages.CompletionItemKind.Function,
        documentation: 'context是一个全局上下文变量',
        insertText: 'context',
        range: range,
      },
      {
        label: 'variable',
        kind: monaco.languages.CompletionItemKind.Function,
        documentation: 'variable是一个系统变量',
        insertText: 'variable',
        range: range,
      },
      {
        label: 'eventParams',
        kind: monaco.languages.CompletionItemKind.Function,
        documentation: 'eventParams是事件流参数',
        insertText: 'eventParams',
        range: range,
      },
    ];
  }
  // 初始化monaco，默认为jsdelivery分发，由于网络原因改为本地cdn
  loader.config({
    paths: {
      vs: `${import.meta.env.VITE_CDN_URL}/static/monaco-editor/vs`,
    },
  });
  return (
    <Editor
      height={height || '150px'}
      language={language || 'javascript'}
      theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
      value={isNotEmpty(value) ? (typeof value === 'string' ? value : JSON.stringify(value, null, 2)) : ''}
      onChange={onChange}
      onMount={(editor, monaco) => {
        editorRef.current = { editor, monaco };
      }}
      options={{
        lineNumbers: 'on',
        minimap: {
          enabled: false,
        },
      }}
    />
  );
}
