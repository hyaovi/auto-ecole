import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { TICKETS_BASE_URL } from '../../../contants/endpoints';
import Display from '../../../components/quiz/Display';
function Ticket() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const ticketId = router.query.id;

  // fetch Ticket
  useEffect(() => {
    const fetchTicketsQuestion = async () => {
      try {
        if (!ticketId) return;
        console.log('pageid', ticketId, `${TICKETS_BASE_URL}${ticketId}`);
        const res = await fetch(`${TICKETS_BASE_URL}${ticketId}`);
        const json = await res.json();
        setQuestions(json.questions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTicketsQuestion();
    return () => {};
  }, [ticketId]);

  return (
    <div className='full-height quiz-bg-light'>
      <div className='container'>
        {questions.length ? <Display questionList={questions} /> : <></>}
      </div>
    </div>
  );
}

export default Ticket;
