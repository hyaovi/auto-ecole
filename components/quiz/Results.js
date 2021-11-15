import React from 'react';

function Results({ results, restartQuiz }) {
  return (
    <div className=''>
      <div className='quiz-results wrapper'>
        <div className='percentage m-2 mb-5 m-md-5 shadow-lg'>
          {`${results.percentage}%`}
        </div>
        <p>
          {' '}
          <button onClick={restartQuiz} className='btn btn-outline-primary'>
            Restart
          </button>{' '}
        </p>
      </div>
    </div>
  );
}

export default Results;
