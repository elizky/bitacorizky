import React from 'react';

interface GreetingProps {
  morning: string;
  afternoon: string;
  nigth: string;
  name: string;
}

const Greeting: React.FC<GreetingProps> = ({ morning, afternoon, nigth, name }) => {
  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 12) {
      return `¡${morning}, ${name}!`;
    } else if (currentHour >= 12 && currentHour < 20) {
      return `¡${afternoon}, ${name}!`;
    } else {
      return `¡${nigth}, ${name}!`;
    }
  };

  const sayHi = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 12) {
      return `¡${morning}!`;
    } else if (currentHour >= 12 && currentHour < 20) {
      return `¡${afternoon}!`;
    } else {
      return `¡${nigth}!`;
    }
  };

  return <p className='invisible md:visible'>{name ? getGreeting() : sayHi()}</p>;
};

export default Greeting;
