"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TypographyH1, TypographyH2 } from '@/components/ui/typography';

interface BlogPostLayoutProps {
  content: string;
  post_name: string;
}

const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({ content, post_name }) => {
  const [interactiveBlocksState, setInteractiveBlocksState] = useState<{ [id: string] : JSX.Element; }>({});

  const parseMarkdown = (markdown: string) => {
    const codeBlocks: string[] = [];
    let processedContent = markdown.replace(/```[\s\S]*?```/g, (match) => {
      codeBlocks.push(match);
      return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
    });

    const interactiveBlocks: string[] = [];
    processedContent = processedContent.replace(/<[\s\S]*?\/>/g, (match) => {
      interactiveBlocks.push(match);
      return `__INTERACTIVE_BLOCK_${interactiveBlocks.length - 1}__`;
    });

    const blocks = processedContent.split(/\n{2,}/);

    return blocks.map((block, index) => {
      if (block.startsWith('__CODE_BLOCK_')) {
        const codeBlockIndex = parseInt(block.match(/__CODE_BLOCK_(\d+)__/)?.[1] || '0', 10);
        return renderCodeBlock(codeBlocks[codeBlockIndex], index);
      } else if (block.startsWith('__INTERACTIVE_BLOCK_')) {
        const interactiveBlockIndex = parseInt(block.match(/__INTERACTIVE_BLOCK_(\d+)__/)?.[1] || '0', 10);
        const blockName = interactiveBlocks[interactiveBlockIndex].replace('<', '').replace('/>', '').replace(' ', '');
        void createInteractiveBlock(blockName);
        return renderInteractiveBlock(blockName, index);
      }
      return renderBlock(block, index);
    });
  };

  const renderBlock = (block: string, index: number): JSX.Element => {
    if (block.startsWith('# ')) {
      return <TypographyH1 key={index} className="text-3xl font-bold mb-6 mt-8">{block.slice(2)}</TypographyH1>;
    } else if (block.startsWith('## ')) {
      return <TypographyH2 key={index} className="text-2xl font-semibold mb-4 mt-6">{block.slice(3)}</TypographyH2>;
    } else if (block.startsWith('1. ') || block.startsWith('- ')) {
      return renderList(block, index);
    } else if (block.startsWith('> ')) {
      return renderBlockquote(block, index);
    } else {
      return <p key={index} className="mb-4 leading-7">{renderInlineMarkdown(block)}</p>;
    }
  };

  const renderInlineMarkdown = (text: string): (string | JSX.Element)[] => {
    const parts = text.split(/(\*\*.*?\*\*|\`.*?\`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-semibold">{part.slice(2, -2)}</strong>;
      } else if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={index} className="bg-gray-700 text-gray-200 px-1 rounded">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  const renderList = (block: string, index: number): JSX.Element => {
    const items = block.split('\n');
    const isOrdered = items[0].startsWith('1. ');
    const ListTag = isOrdered ? 'ol' : 'ul';
    return (
      <ListTag key={index} className={`mb-4 pl-6 ${isOrdered ? 'list-decimal' : 'list-disc'}`}>
        {items.map((item, itemIndex) => (
          <li key={itemIndex} className="mb-2">{renderInlineMarkdown(item.replace(/^\d+\.\s|-\s/, ''))}</li>
        ))}
      </ListTag>
    );
  };

  const renderBlockquote = (block: string, index: number): JSX.Element => {
    return (
      <blockquote key={index} className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-gray-800 italic">
        {renderInlineMarkdown(block.replace(/^>\s/, ''))}
      </blockquote>
    );
  };

  const renderInteractiveBlock = (block: string, index: number): JSX.Element => {
    if (interactiveBlocksState[block]) {
      return <div key={index} className={`mb-6 ${index}`}>{interactiveBlocksState[block]}</div>;
    } else {
      return <Card key={index} className={`mb-6 p-3 ${block}`}>Loading...</Card>;
    }
  }

  const createInteractiveBlock = async (block: string): Promise<void> => {
    const obj = await import(`../content/${post_name}/components/${block}.tsx`).then((module) => {
      return module.default;
    });

    const interactiveBlock = React.createElement(obj);
    let tempInteractiveBlocksState = interactiveBlocksState;
    tempInteractiveBlocksState[block] = interactiveBlock;
    setInteractiveBlocksState(tempInteractiveBlocksState);
  }

  const renderCodeBlock = (block: string, index: number): JSX.Element => {
    const lines = block.split('\n');
    const code = lines.slice(1, -1).join('\n');

    return (
      <pre key={index} className="bg-gray-800 p-4 rounded-lg overflow-x-auto mb-6 text-sm">
        <code>{highlightSyntax(code)}</code>
      </pre>
    );
  };

  const highlightSyntax = (code: string): (string | JSX.Element)[] => {
    const keywords = ['def', 'return', 'import', 'from', 'if', 'else', 'for', 'while', 'class', 'try', 'except'];
    const parts = code.split(/(["'`].*?["'`]|\b\w+\b|[{}()[\]])/g);

    return parts.map((part, index) => {
      if (keywords.includes(part)) {
        return <span key={index} className="text-purple-400">{part}</span>;
      } else if (part.match(/^["'`].*["'`]$/)) {
        return <span key={index} className="text-green-400">{part}</span>;
      } else if (part.match(/^\d+$/)) {
        return <span key={index} className="text-blue-400">{part}</span>;
      } else if (part.match(/[{}()[\]]/)) {
        return <span key={index} className="text-yellow-400">{part}</span>;
      }
      return <span key={index} className="text-gray-300">{part}</span>;
    });
  };

  return (
    <Card className="mx-auto my-8 text-primary border-2 border-slate-200">
      <CardContent className="p-6">
          <article className="prose prose-slate max-w-none">
            {parseMarkdown(content)}
          </article>
      </CardContent>
    </Card>
  );
};

export default BlogPostLayout;
