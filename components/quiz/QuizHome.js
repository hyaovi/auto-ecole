import Link from 'next/link';
import { useEffect, useState } from 'react';
import questions from '../../contants/pdd.parsed.json';
import { getTicketsFromQuestions } from '../../utils/quiz';

function QuizHome() {
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    const ticketList = getTicketsFromQuestions(questions);
    setTickets(ticketList);
  }, []);
  const selectTicket = (ticketNumber) => {
    console.log(ticketNumber);
    setSelected(ticketNumber);
  };

  return (
    <>
      <div className='row justify-content-center text-center'>
        <h1 className='h3 mb-5  col-12'>Онлайн Экзамен Как В ГАИ.</h1>
        <div className='col-10 col-lg-8'>
          <div className='d-flex flex-column justify-content-center'>
            <div className='d-flex flex-wrap justify-content-center mb-5'>
              {tickets.map((ticket, index) => (
                <div
                  onPointerUp={() => selectTicket(ticket)}
                  className={`card-ticket ${
                    ticket == selected ? 'selected' : ''
                  }`}
                  key={index}>
                  <div className=''>
                    <Link href={`/ticket/${ticket}`}>
                      <a className='text-decoration-none stretched-link'>
                        {ticket}
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizHome;
