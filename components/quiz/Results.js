import React from 'react';
import { useRouter } from 'next/router';

function Results({ results, restartQuiz }) {
  const router = useRouter();
  const redirectToTickects = () => {
    router.push('/');
  };
  return (
    <div className=''>
      <div className='quiz-results wrapper'>
        <div className='percentage m-2 mb-5 m-md-5 shadow-lg'>
          {`${results.percentage}%`}
        </div>
        <p>
          {' '}
          <button onClick={restartQuiz} className='btn btn-outline-primary'>
            Restart this quiz
          </button>{' '}
          <button onClick={redirectToTickects} className='btn btn-primary'>
            Pick another
          </button>
        </p>
      </div>
    </div>
  );
}

export default Results;
