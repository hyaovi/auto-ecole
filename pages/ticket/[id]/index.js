import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { TICKETS_BASE_URL } from '../../../contants/endpoints';
import Image from 'next/image';
import Display from '../../../components/quiz/Display';
function Ticket() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const ticketId = router.query.id;
  useEffect(() => {
    const fetchTicketsQuestion = async () => {
      try {
        console.log('pageid', ticketId, `${TICKETS_BASE_URL}${ticketId}`);
        // if (!ticketId) return;
        const res = await fetch(`${TICKETS_BASE_URL}${ticketId}`);
        const json = await res.json();
        console.log(json.questions);
        setQuestions(json.questions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTicketsQuestion();
    return () => {
      // cleanup;
    };
  }, [ticketId]);

  return (
    <div className='container'>
      {questions.length ? <Display questionList={questions} /> : <></>}
    </div>
  );
}

export default Ticket;
