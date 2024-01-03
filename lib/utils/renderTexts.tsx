import parser from 'html-react-parser';

export const renderText = (textElement: string | string[] | null, index: number) => {
  if (textElement === null) {
    return null;
  } else if (typeof textElement === 'string') {
    return <p key={index}>{parser(textElement)}</p>;
  } else if (Array.isArray(textElement)) {
    return (
      <ul className='ml-8 -my-4 list-disc [&>li]:mt-2' key={index}>
        {textElement.map((item, subIndex) => (
          <li key={subIndex}>{parser(item)}</li>
        ))}
      </ul>
    );
  }
  return null;
};
export const renderTextForModal = (textElement: string | string[] | null, index: number) => {
  if (textElement === null) {
    return null;
  } else if (typeof textElement === 'string') {
    return <div key={index}>{parser(textElement)}</div>;
  } else if (Array.isArray(textElement)) {
    return (
      <ul className='ml-8 -my-4 list-disc [&>li]:mt-2' key={index}>
        {textElement.map((item, subIndex) => (
          <li key={subIndex}>{parser(item)}</li>
        ))}
      </ul>
    );
  }
  return null;
};
