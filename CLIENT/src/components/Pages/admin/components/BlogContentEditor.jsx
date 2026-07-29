import React, { useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Button } from '@/components/ui/button';
import { Bold, Italic, List, ListOrdered, Link2, Image as ImageIcon, Heading1, Heading2, Heading3, Type, Code2, AlignLeft } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css'; // dark theme

/* ─────────────────────────────────────────
   Toolbar Button
───────────────────────────────────────── */
const ToolbarBtn = ({ onClick, active, disabled, title, children }) => (
    <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); onClick(); }}
        disabled={disabled}
        title={title}
        className={`p-1.5 rounded text-sm transition-colors ${
            active
                ? 'bg-[#118A43] text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        } ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
    >
        {children}
    </button>
);

const Divider = () => <div className="w-px h-5 bg-slate-200 mx-1" />;

/* ─────────────────────────────────────────
   TipTap Toolbar
───────────────────────────────────────── */
const TipTapToolbar = ({ editor }) => {
    if (!editor) return null;

    const insertLink = () => {
        const url = window.prompt('Enter URL:');
        if (url) {
            editor.chain().focus().extendMarkToLink({ url }).setLink({ href: url }).run();
        }
    };

    const insertImage = () => {
        const url = window.prompt('Enter image URL:');
        if (url) editor.chain().focus().setImage({ src: url }).run();
    };

    return (
        <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-slate-200 bg-slate-50 rounded-t-lg">
            {/* Headings */}
            <ToolbarBtn
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                active={editor.isActive('heading', { level: 1 })}
                title="Heading 1"
            ><Heading1 size={15} /></ToolbarBtn>
            <ToolbarBtn
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                active={editor.isActive('heading', { level: 2 })}
                title="Heading 2"
            ><Heading2 size={15} /></ToolbarBtn>
            <ToolbarBtn
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                active={editor.isActive('heading', { level: 3 })}
                title="Heading 3"
            ><Heading3 size={15} /></ToolbarBtn>
            <ToolbarBtn
                onClick={() => editor.chain().focus().setParagraph().run()}
                active={editor.isActive('paragraph')}
                title="Paragraph"
            ><Type size={15} /></ToolbarBtn>

            <Divider />

            {/* Inline formatting */}
            <ToolbarBtn
                onClick={() => editor.chain().focus().toggleBold().run()}
                active={editor.isActive('bold')}
                title="Bold"
            ><Bold size={15} /></ToolbarBtn>
            <ToolbarBtn
                onClick={() => editor.chain().focus().toggleItalic().run()}
                active={editor.isActive('italic')}
                title="Italic"
            ><Italic size={15} /></ToolbarBtn>

            <Divider />

            {/* Lists */}
            <ToolbarBtn
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                active={editor.isActive('bulletList')}
                title="Bullet list"
            ><List size={15} /></ToolbarBtn>
            <ToolbarBtn
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                active={editor.isActive('orderedList')}
                title="Numbered list"
            ><ListOrdered size={15} /></ToolbarBtn>

            <Divider />

            {/* Link + Image */}
            <ToolbarBtn
                onClick={insertLink}
                active={editor.isActive('link')}
                title="Insert link"
            ><Link2 size={15} /></ToolbarBtn>
            <ToolbarBtn
                onClick={insertImage}
                active={false}
                title="Insert image (URL)"
            ><ImageIcon size={15} /></ToolbarBtn>

            <Divider />

            {/* Code block */}
            <ToolbarBtn
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                active={editor.isActive('codeBlock')}
                title="Code block"
            ><Code2 size={15} /></ToolbarBtn>
        </div>
    );
};

/* ─────────────────────────────────────────
   BlogContentEditor
   Props:
     value      — current HTML string (controlled)
     onChange   — (htmlString) => void
───────────────────────────────────────── */
const BlogContentEditor = ({ value, onChange }) => {
    const [mode, setMode] = useState('text'); // 'text' | 'html'

    /* ── TipTap instance ── */
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({ openOnClick: false }),
            Image,
        ],
        content: value || '',
        onUpdate: ({ editor }) => {
            if (mode === 'text') onChange(editor.getHTML());
        },
    });

    /* ── Mode toggle handlers ── */
    const switchToHtml = useCallback(() => {
        // Text → HTML: sync TipTap HTML into textarea silently
        if (editor) onChange(editor.getHTML());
        setMode('html');
    }, [editor, onChange]);

    const switchToText = useCallback(() => {
        // HTML → Text: warn before overwriting TipTap content with raw HTML
        if (value && value.trim()) {
            const ok = window.confirm(
                'Switching to Text mode will load the current HTML into the editor. ' +
                'Raw <script> or complex HTML may not be preserved exactly. Continue?'
            );
            if (!ok) return;
        }
        if (editor) {
            editor.commands.setContent(value || '', false);
        }
        setMode('text');
    }, [editor, value]);

    /* ── HTML textarea change ── */
    const handleHtmlChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden">
            {/* Mode toggle tabs */}
            <div className="flex border-b border-slate-200 bg-white">
                <button
                    type="button"
                    onClick={mode === 'html' ? switchToText : undefined}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                        mode === 'text'
                            ? 'text-[#118A43] border-b-2 border-[#118A43] bg-white'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                >
                    ✏️ Text Mode
                </button>
                <button
                    type="button"
                    onClick={mode === 'text' ? switchToHtml : undefined}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                        mode === 'html'
                            ? 'text-[#118A43] border-b-2 border-[#118A43] bg-white'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                >
                    {'</>'}  HTML Mode
                </button>
            </div>

            {/* Text Mode — TipTap */}
            {mode === 'text' && (
                <>
                    <TipTapToolbar editor={editor} />
                    <EditorContent
                        editor={editor}
                        className="tiptap-editor"
                    />
                </>
            )}

            {/* HTML Mode — highlighted code editor */}
            {mode === 'html' && (
                <div className="bg-[#2d2d2d] min-h-[280px]">
                    <Editor
                        value={value || ''}
                        onValueChange={(code) => onChange(code)}
                        highlight={code => Prism.highlight(code, Prism.languages.markup, 'markup')}
                        padding={16}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 14,
                            minHeight: '280px',
                        }}
                        textareaClassName="focus:outline-none"
                    />
                </div>
            )}

            {/* TipTap editor styles */}
            <style>{`
                .tiptap-editor .ProseMirror {
                    min-height: 240px;
                    padding: 12px 16px;
                    outline: none;
                    font-size: 0.9rem;
                    line-height: 1.7;
                    color: #1e293b;
                }
                .tiptap-editor .ProseMirror p { margin-bottom: 0.75em; }
                .tiptap-editor .ProseMirror h1 { font-size: 1.6rem; font-weight: 700; margin-bottom: 0.5em; }
                .tiptap-editor .ProseMirror h2 { font-size: 1.35rem; font-weight: 700; margin-bottom: 0.5em; }
                .tiptap-editor .ProseMirror h3 { font-size: 1.15rem; font-weight: 600; margin-bottom: 0.5em; }
                .tiptap-editor .ProseMirror ul { list-style: disc; padding-left: 1.5em; margin-bottom: 0.75em; }
                .tiptap-editor .ProseMirror ol { list-style: decimal; padding-left: 1.5em; margin-bottom: 0.75em; }
                .tiptap-editor .ProseMirror a { color: #118A43; text-decoration: underline; }
                .tiptap-editor .ProseMirror img { max-width: 100%; border-radius: 6px; margin: 0.5em 0; }
                .tiptap-editor .ProseMirror pre { background: #1e293b; color: #e2e8f0; padding: 1em; border-radius: 6px; overflow-x: auto; }
                .tiptap-editor .ProseMirror code { font-family: monospace; background: #f1f5f9; padding: 0.1em 0.3em; border-radius: 3px; }
                .tiptap-editor .ProseMirror blockquote { border-left: 4px solid #118A43; padding-left: 1em; color: #475569; margin: 0.75em 0; }
                .tiptap-editor .ProseMirror p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    color: #94a3b8;
                    pointer-events: none;
                    float: left;
                    height: 0;
                }
            `}</style>
        </div>
    );
};

export default BlogContentEditor;
