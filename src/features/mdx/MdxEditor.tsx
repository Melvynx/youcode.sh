"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type {
  JsxComponentDescriptor,
  MDXEditorMethods,
  SandpackConfig,
} from "@mdxeditor/editor";
import {
  BoldItalicUnderlineToggles,
  Button,
  ChangeCodeMirrorLanguage,
  ConditionalContents,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertCodeBlock,
  InsertSandpack,
  MDXEditor,
  ShowSandpackInfo,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
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
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useTheme } from "next-themes";
import type { FC } from "react";
import { MuxVideoEditor } from "./video-editor/VideoEditor";

type EditorProps = {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
};

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
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
    {
      label: "Vanilla",
      name: "vanilla",
      meta: "live vanilla",
      sandpackTheme: "auto",
      sandpackTemplate: "vanilla",
      snippetFileName: "/index.js",
      snippetLanguage: "js",
      initialSnippetContent: `console.log('Hello world')`,
    },
  ],
};

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
  {
    name: "MuxVideo",
    kind: "flow",
    props: [{ name: "id", type: "string" }],
    hasChildren: false,
    Editor: MuxVideoEditor,
  },
];

const InsertVideo = () => {
  const insertJsx = jsxPluginHooks.usePublisher("insertJsx");
  return (
    <Button
      onClick={() =>
        insertJsx({
          name: "MuxVideo",
          kind: "flow",
          props: { url: "" },
        })
      }
    >
      Video
    </Button>
  );
};

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const Editor: FC<
  EditorProps & {
    onChange: (markdown: string) => void;
    className?: string;
  }
> = ({ markdown, editorRef, onChange, className }) => {
  const theme = useTheme();
  return (
    <MDXEditor
      className={cn(
        "border-dashed border-2 border-muted max-w-none ",
        className
      )}
      contentEditableClassName={cn(
        `prose bg-red-500 ${theme.theme}`,
        theme.theme === "dark" ? "prose-invert" : ""
      )}
      ref={editorRef}
      markdown={markdown}
      onChange={(s) => {
        console.log("ON change !!!");
        onChange(s);
      }}
      // readOnly={true}
      plugins={[
        headingsPlugin(),
        linkDialogPlugin(),
        linkPlugin(),
        quotePlugin(),
        jsxPlugin({ jsxComponentDescriptors }),
        markdownShortcutPlugin(),
        listsPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: "JavaScript", css: "CSS" },
        }),
        diffSourcePlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <div className={cn("flex items-center gap-2")}>
              <UndoRedo />
              <Separator orientation="vertical" className="h-6" />
              <BoldItalicUnderlineToggles />
              <Separator orientation="vertical" className="h-6" />
              <CreateLink />
              <Separator orientation="vertical" className="h-6" />
              <InsertCodeBlock />
              <InsertSandpack />
              <Separator orientation="vertical" className="h-6" />
              <InsertVideo />

              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    when: (editor) => editor?.editorType === "sandpack",
                    contents: () => (
                      <>
                        <ShowSandpackInfo />
                      </>
                    ),
                  },
                  { fallback: () => <></> },
                ]}
              />
              <DiffSourceToggleWrapper>
                <button>Test</button>
              </DiffSourceToggleWrapper>
            </div>
          ),
        }),
      ]}
    />
  );
};

export default Editor;
