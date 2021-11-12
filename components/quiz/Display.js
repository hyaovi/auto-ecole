import { useState } from 'react';
import Image from 'next/image';
function Display({ questionList = [] }) {
  const [currentId, setcurrentId] = useState(0);

  return (
    <div className='row'>
      <div className='col-12 col-md-10 col-lg-7 col-xl-6'>
        <div className='d-flex flex-nowrap'>
          <h1 className='h5'>
            <span className='mr-2'>{`${currentId} ->`}</span>{' '}
            {questionList[0].question}
          </h1>
        </div>
        <div className='rounded'>
          <Image
            layout='responsive'
            height='40%'
            width='100%'
            objectFit='contain'
            src={`/images/pdd/${questionList[0].imageName}.jpg`}
            alt='img'
          />
        </div>
        <ul className=' list-unstyled '>
          {questionList[0].answers.map((answer) => {
            return (
              <li className='alert alert-secondary' key={answer.id}>
                {answer.answer_text}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Display;
