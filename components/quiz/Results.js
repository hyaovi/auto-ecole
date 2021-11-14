import React from 'react';

function Results({ results }) {
  return (
    <div className='quiz-results wrapper'>
      <div className='percentage m-2 m-md-5 shadow-lg'>
        {`${results.percentage}%`}
      </div>
    </div>
  );
}

export default Results;
