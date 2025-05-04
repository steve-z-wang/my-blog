import ReactMarkdown, { Components } from 'react-markdown';

const defaultComponents: Components = {
  h1: ({ node, ...props }) => <h1 className="markdown-h1" {...props} />,
  h2: ({ node, ...props }) => <h2 className="markdown-h2" {...props} />,
  p: ({ node, ...props }) => <p className="markdown-p" {...props} />,
  ul: ({ node, ...props }) => <ul className="markdown-ul" {...props} />,
  ol: ({ node, ...props }) => <ol className="markdown-ol" {...props} />,
  li: ({ node, ...props }) => <li className="markdown-li" {...props} />,
  a: ({ node, ...props }) => <a className="markdown-a" {...props} />,
  code: ({ node, ...props }) => <code className="markdown-code" {...props} />,
};

interface MarkdownRendererProps {
  content: string;
  components?: Components;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, components = {} }) => {
  return (
    <ReactMarkdown components={{ ...defaultComponents, ...components }}>
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;