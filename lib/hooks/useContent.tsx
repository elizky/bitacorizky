'use client'
import { Content, TextElement } from '../utils/interfaces';
import { useState, useEffect } from 'react';

const useContent = (initialContent: Content | undefined) => {
  const [title, setTitle] = useState<string>('');
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  useEffect(() => {
    const parseTextElement = (textElement: TextElement): string => {
      let parsedText = '';

      if (textElement.text) {
        parsedText = textElement.text;
      }

      if (textElement.content) {
        parsedText = textElement.content
          .map((childElement) => parseTextElement(childElement))
          .join('');
      }

      if (textElement.marks) {
        textElement.marks.forEach((mark) => {
          switch (mark.type) {
            case 'bold':
              parsedText = `<strong>${parsedText}</strong>`;
              break;
            case 'italic':
              parsedText = `<em>${parsedText}</em>`;
              break;
            case 'strike':
              parsedText = `<del>${parsedText}</del>`;
              break;
            default:
              break;
          }
        });
      }

      return parsedText;
    };

    const parseContent = (content: Content): [string, string[]] => {
      const extractedTitle = content.content
        .filter((element) => element.type === 'heading')
        .map((element) => {
          if (element.content) {
            return element.content.map((textElement) => parseTextElement(textElement)).join('');
          }
          return '';
        })
        .filter(Boolean)
        .join('');

      const extractedParagraphs = content.content
        .filter((element) => element.type === 'paragraph')
        .map((element) => {
          if (element.content) {
            return element.content.map((textElement) => parseTextElement(textElement)).join('');
          }
          return '';
        })
        .filter(Boolean);

      return [extractedTitle, extractedParagraphs];
    };

    if (initialContent) {
      const [parsedTitle, parsedParagraphs] = parseContent(initialContent);
      setTitle(parsedTitle);
      setParagraphs(parsedParagraphs);
    }
  }, [initialContent]);

  return { title, paragraphs };
};

export default useContent;
