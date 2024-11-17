import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import * as prettier from 'prettier';
import parserJavaScript from 'prettier/parser-babel';
import { useDebounceFn } from 'ahooks';
import * as antd from 'antd';
import * as Plots from '@ant-design/plots';
import { Spin, Splitter } from 'antd';
import dayjs from 'dayjs';
import { useKeyPress } from 'ahooks';
import ComPreview from './ComPreview';
import { usePageStore } from '@/stores/pageStore';
import './index.less';

/**
 * 组件代码编辑
 */
export default forwardRef((_: any, ref: any) => {
  const [code, setCode] = useState('');
  const [compileCode, setCompileCode] = useState('');
  const [refreshTag, setRefreshTag] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const editorRef = useRef<any>(null);

  const theme = usePageStore((state) => state.theme);

  /**
   * 把React、dayjs、antd挂载到window上，否则esbuild无法编译
   * 此处初始化只是为了解决本地热更新问题。
   * 由于屏蔽了external，所以本地需要通过import获取，线上通过cdn加载。
   */
  function initContext() {
    window.React = window.React || React;
    window.dayjs = window.dayjs || dayjs;
    window.antd = window.antd || antd;
    window.Plots = window.Plots || Plots;
  }

  // 初始化代码
  async function initCode() {
    try {
      setLoading(true);
      const reactCode = localStorage.getItem('react-code');
      setCode(reactCode || '');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    initContext();
    initCode();
  }, []);

  // 对外提供控制方法
  useImperativeHandle(ref, () => {
    return {
      // 源码
      getCode() {
        return code;
      },
      // 编译后代码
      getCompileCode() {
        return compileCode;
      },
      refresh() {
        setRefreshTag(refreshTag + 1);
      },
      // 打印流写入代码
      async writeCode(newCode: string): Promise<boolean> {
        return new Promise((resolve) => {
          let index = 0;
          const codeInterval = setInterval(() => {
            setCode((prev) => prev + newCode[index++]);
            if (index > newCode.length - 2) {
              clearInterval(codeInterval);
              setRefreshTag(refreshTag + 1);
              resolve(true);
            }
          }, 30);
        });
      },
      // 清空代码
      async clearCode() {
        setCode('');
        setRefreshTag(refreshTag + 1);
      },
      // 取消加载
      async cancelLoading() {
        setLoading(false);
      },
    };
  });

  // 保存后，格式化代码
  useKeyPress(['meta.s', 'ctrl.s'], (event) => {
    try {
      event.stopPropagation();
      event.preventDefault();
      const formatted = prettier.format(code, {
        parser: 'babel',
        plugins: [parserJavaScript],
        useTabs: false,
        tabWidth: 2, // tab对应空格数
        printWidth: 80,
        semi: true,
        singleQuote: true,
        trailingComma: 'es5', // 尾随逗号
        bracketSpacing: true, // 在对象文字中的括号之间打印空格，如{ foo: bar }
        bracketSameLine: false, // 多行 HTML 标签开头的 > 放在最后一行的末尾而不是单独放在下一行
        arrowParens: 'always', // 在唯一的箭头函数参数周围包含括号
        endOfLine: 'auto', // 行尾风格
      });
      setCode(formatted);
      setError('');
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  });

  // 实时保存代码
  const onChange = (value: string = '') => {
    setCode(value);
  };

  // 编译代码
  const handleCompile = async () => {
    if (!code) return;
    try {
      localStorage.setItem('react-code', code);
      const result = await window.esbuild.build({
        bundle: true,
        format: 'esm',
        platform: 'browser',
        minify: true,
        outfile: 'out.js',
        // jsx: 'automatic',// 浏览器不支持jsx-runtime
        stdin: {
          contents: code,
          loader: 'tsx',
        },
      });
      setLoading(false);
      const output = result.outputFiles?.[0] || {};
      setCompileCode(output.text);
      setError('');
      localStorage.setItem('react-compile', output.text);
      setRefreshTag(refreshTag + 1);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    handleCompile();
  }, [code]);

  const { run } = useDebounceFn(onChange, { wait: 500 });

  return (
    <div className="code-editor">
      <Splitter>
        <Splitter.Panel defaultSize="50%">
          <Editor
            language={'javascript'}
            theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
            value={code}
            onChange={(value) => {
              setLoading(true);
              run(value);
            }}
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
          <Spin spinning={loading} tip="正在编译中...">
            <ComPreview refreshTag={refreshTag} />
            {error && <p style={{ color: 'red', lineHeight: '30px', padding: 30 }}>{error}</p>}
          </Spin>
        </Splitter.Panel>
      </Splitter>
    </div>
  );
});
