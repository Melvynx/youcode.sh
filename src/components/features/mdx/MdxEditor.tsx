'use client';

import { cn } from '@/components/lib/utils';
import { Separator } from '@/components/ui/separator';
import {
  BoldItalicUnderlineToggles,
  Button,
  ChangeCodeMirrorLanguage,
  ConditionalContents,
  CreateLink,
  GenericJsxEditor,
  InsertCodeBlock,
  InsertSandpack,
  JsxComponentDescriptor,
  MDXEditor,
  MDXEditorMethods,
  SandpackConfig,
  ShowSandpackInfo,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  jsxPlugin,
  jsxPluginHooks,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  sandpackPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { FC } from 'react';

interface EditorProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent,
    },
    {
      label: 'Vanilla',
      name: 'vanilla',
      meta: 'live vanilla',
      sandpackTheme: 'auto',
      sandpackTemplate: 'vanilla',
      snippetFileName: '/index.js',
      snippetLanguage: 'js',
      initialSnippetContent: `console.log('Hello world')`,
    },
  ],
};

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
  {
    name: 'MyLeaf',
    kind: 'flow', // 'text' for inline, 'flow' for block
    // the source field is used to construct the import statement at the top of the markdown document.
    // it won't be actually sourced.
    // source: './components/Leaf.tsx',
    // Used to construct the property popover of the generic editor
    props: [{ name: 'title', type: 'string' }],
    // wether the component has children or not
    hasChildren: true,
    Editor: GenericJsxEditor,
  },
  {
    name: 'BlockNode',
    kind: 'flow',
    source: './external',
    props: [],
    hasChildren: true,
    Editor: GenericJsxEditor,
  },
];

// a toolbar button that will insert a JSX element into the editor.
const InsertMyLeaf = () => {
  const insertJsx = jsxPluginHooks.usePublisher('insertJsx');
  return (
    <Button
      onClick={() =>
        insertJsx({
          name: 'MyLeaf',
          kind: 'text',
          props: { title: 'Demo title' },
        })
      }
    >
      Leaf
    </Button>
  );
};

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const Editor: FC<EditorProps> = ({ markdown, editorRef }) => {
  return (
    <MDXEditor
      className={cn('prose dark:prose-invert')}
      ref={editorRef}
      markdown={markdown}
      onChange={console.log}
      plugins={[
        headingsPlugin(),
        linkDialogPlugin(),
        linkPlugin(),
        quotePlugin(),
        jsxPlugin({ jsxComponentDescriptors }),

        markdownShortcutPlugin(),

        listsPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),
        toolbarPlugin({
          toolbarContents: () => (
            <div className={cn('flex items-center gap-2')}>
              <UndoRedo />
              <Separator orientation="vertical" className="h-6" />
              <BoldItalicUnderlineToggles />
              <Separator orientation="vertical" className="h-6" />
              <CreateLink />
              <Separator orientation="vertical" className="h-6" />
              <InsertCodeBlock />
              <InsertSandpack />
              <Separator orientation="vertical" className="h-6" />
              <InsertMyLeaf />

              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === 'codeblock',
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    when: (editor) => editor?.editorType === 'sandpack',
                    contents: () => (
                      <>
                        <ShowSandpackInfo />
                      </>
                    ),
                  },
                  { fallback: () => <></> },
                ]}
              />
            </div>
          ),
        }),
      ]}
    />
  );
};

export default Editor;
