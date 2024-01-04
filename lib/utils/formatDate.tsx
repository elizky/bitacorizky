const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en', { month: 'long' });
  const year = date.getFullYear();
  return `${month} ${day} , ${year}`;
};

export default formatDate;
