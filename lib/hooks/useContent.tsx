import { Content, TextElement } from '../utils/interfaces';
import { useState, useEffect } from 'react';

const useContent = (initialContent: Content | undefined) => {
  const [title, setTitle] = useState<string>('');
  const [paragraphs, setParagraphs] = useState<(string | string[])[]>([]);

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

    const parseContent = (content: Content): [string, (string | string[])[]] => {
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

      const extractedText = content.content
        .map((element) => {
          if (element.content) {
            if (element.type === 'paragraph') {
              return element.content.map((textElement) => parseTextElement(textElement)).join('');
            } else if (element.type === 'orderedList') {
              return element.content
                .filter((listItem) => listItem.type === 'listItem')
                .map((listItem) => {
                  if (listItem.content) {
                    return listItem.content
                      .filter((paragraph) => paragraph.type === 'paragraph')
                      .map((paragraph) => {
                        if (paragraph.content) {
                          return paragraph.content
                            .map((textElement) => parseTextElement(textElement))
                            .join('');
                        }
                        return '';
                      })
                      .filter(Boolean);
                  }
                  return '';
                })
                .filter(Boolean);
            }
          }
          return '';
        })
        .flat()
        .filter(Boolean);

      return [extractedTitle, extractedText];
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
