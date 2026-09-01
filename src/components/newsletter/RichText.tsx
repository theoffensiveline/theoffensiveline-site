/**
 * Tiptap wrappers (#84): RichTextEditor for the builder, RichTextView for
 * rendering published content. Content is stored as Tiptap JSON on the issue
 * doc — never HTML, so nothing is ever dangerouslySetInnerHTML'd.
 */
import React from "react";
import styled from "styled-components";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

type TiptapDoc = Record<string, unknown>;

const EMPTY_DOC: TiptapDoc = { type: "doc", content: [{ type: "paragraph" }] };

const EditorFrame = styled.div`
  border: 1px solid ${({ theme }: any) => theme.neutral3}66;
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme.background};

  .ProseMirror {
    min-height: 90px;
    padding: 10px 14px;
    outline: none;
    color: ${({ theme }: any) => theme.text};
    font-size: 15px;
    line-height: 1.5;

    p {
      margin: 0 0 0.6em;
    }

    a {
      color: ${({ theme }: any) => theme.newsBlue};
    }
  }
`;

const Toolbar = styled.div`
  display: flex;
  gap: 4px;
  padding: 6px 8px;
  border-bottom: 1px solid ${({ theme }: any) => theme.neutral3}44;
`;

const ToolButton = styled.button<{ $active?: boolean }>`
  background: ${({ theme, $active }: any) => ($active ? `${theme.newsBlue}22` : "none")};
  border: none;
  border-radius: 4px;
  color: ${({ theme }: any) => theme.text};
  font-size: 13px;
  padding: 4px 8px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }: any) => theme.newsBlue}22;
  }
`;

const ViewBody = styled.div`
  text-align: left;
  color: ${({ theme }: any) => theme.text};
  font-size: 15px;
  line-height: 1.55;

  .ProseMirror {
    outline: none;

    p {
      margin: 0 0 0.6em;
    }

    a {
      color: ${({ theme }: any) => theme.newsBlue};
    }
  }
`;

const extensions = [StarterKit, Link.configure({ openOnClick: false })];

interface RichTextEditorProps {
  content: TiptapDoc | undefined;
  onChange: (doc: TiptapDoc) => void;
  disabled?: boolean;
}

export function RichTextEditor({
  content,
  onChange,
  disabled = false,
}: RichTextEditorProps): React.ReactElement {
  const editor = useEditor({
    extensions,
    content: content ?? EMPTY_DOC,
    editable: !disabled,
    onUpdate: ({ editor: e }) => onChange(e.getJSON() as TiptapDoc),
  });

  // useEditor only reads `editable` at mount, so publish → revert-to-draft
  // left the content permanently read-only (the toolbar and title input
  // recovered, the ProseMirror body didn't). Keep it in sync.
  React.useEffect(() => {
    if (editor) editor.setEditable(!disabled);
  }, [editor, disabled]);

  const setLink = () => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <EditorFrame>
      {!disabled && editor && (
        <Toolbar>
          <ToolButton
            type="button"
            $active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <b>B</b>
          </ToolButton>
          <ToolButton
            type="button"
            $active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <i>I</i>
          </ToolButton>
          <ToolButton type="button" $active={editor.isActive("link")} onClick={setLink}>
            Link
          </ToolButton>
        </Toolbar>
      )}
      <EditorContent editor={editor} />
    </EditorFrame>
  );
}

/** Read-only render of stored Tiptap JSON. */
export function RichTextView({ content }: { content: TiptapDoc | undefined }): React.ReactElement {
  const editor = useEditor({
    extensions,
    content: content ?? EMPTY_DOC,
    editable: false,
  });
  // useEditor only reads `content` at mount — re-sync when a refetch (e.g.
  // window refocus past staleTime) delivers updated commentary, or the view
  // keeps showing the old text until a full reload (#84 swarm review).
  React.useEffect(() => {
    if (editor) editor.commands.setContent(content ?? EMPTY_DOC);
  }, [editor, content]);
  return (
    <ViewBody>
      <EditorContent editor={editor} />
    </ViewBody>
  );
}
