import { useState, useEffect } from 'react';
import Img from '../common/Img';

const initialStats = {
  totalAnswered: 0,
  correctAnswers: 0,
  totalQuestions: 0,
};
const initialQuestionState = {
  id: undefined,
  index: undefined,
  answerId: undefined,
  answerIndex: undefined,
};

function Display({ questionList = [] }) {
  const [showResults, setShowResults] = useState(false);
  const [userLogs, setUserLogs] = useState([]);
  const [stats, setStats] = useState(initialStats);
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestionState);

  useEffect(() => {
    // reset quiz
    const resetQuiz = () => {
      if (questionList.length) {
        // reset stats
        setStats(initialStats);

        // reset logs
        setUserLogs([]);

        // hide results
        setShowResults(false);

        // set first question
        const firstQuestionIndex = 0;
        const question = questionList[0];

        setCurrentQuestion((PREV_STATE) => ({
          ...PREV_STATE,
          index: firstQuestionIndex,
          id: question.id,
        }));
      }
    };
    resetQuiz();
  }, [questionList]);

  useEffect(() => {
    setCurrentQuestion((PREV_STATE) => ({
      ...PREV_STATE,
      answerId: undefined,
      answerIndex: undefined,
    }));
  }, [currentQuestion.id]);

  const handleUserAnswer = (optionAnswer) => {
    const {
      id: answerId,
      index: answerIndex,
      is_correct: isCorrect,
    } = optionAnswer;
    const newCurrrentQuestion = {
      ...currentQuestion,
      answerId,
      answerIndex,
      isCorrect,
    };
    setCurrentQuestion((PREV_STATE) => ({
      ...PREV_STATE,
      ...newCurrrentQuestion,
    }));
  };
  const handleSubmit = () => {
    const currentLog = currentQuestion;
    setUserLogs((PREV_STATE) => [...PREV_STATE, currentLog]);
    updateStats();
    setNextQuestion();
  };
  const updateStats = () => {
    let { totalAnswered, correctAnswers } = stats;
    console.log(currentQuestion);
    totalAnswered++;
    if (currentQuestion.isCorrect) {
      correctAnswers++;
      console.log('is correct');
    } else {
      console.log('is wrong');
    }
    setStats((PREV_STATE) => ({
      ...PREV_STATE,
      totalAnswered,
      correctAnswers,
    }));
  };
  const setNextQuestion = () => {
    const nextIndex = currentQuestion.index + 1;
    if (nextIndex === questionList.length) {
      setShowResults(true);
      return;
    }
    const { id } = questionList[nextIndex];
    setCurrentQuestion((PREV_STATE) => ({
      ...PREV_STATE,
      id,
      index: nextIndex,
    }));
  };

  return (
    <>
      {showResults ? (
        <>
          <p>{`${(stats.correctAnswers / questionList.length) * 100}%`}</p>
        </>
      ) : (
        currentQuestion.id && (
          <div className='row'>
            <div className='col-12 col-md-10 col-lg-7 col-xl-6'>
              <div className='d-flex flex-nowrap'>
                <small className='pr-2 small text-nowrap'>
                  {`${currentQuestion.index + 1} ->  `}{' '}
                </small>
                <h1 className='h5'>
                  {questionList[currentQuestion.index].question}
                </h1>
              </div>
              <div className=''>
                <Img
                  className='rounded-3 mb-3 img-fluid'
                  layout='responsive'
                  objectFit='contain'
                  src={`/images/pdd/${
                    questionList[currentQuestion.index].imageName
                  }.jpg`}
                  alt='img'
                />
              </div>
              <ul className=' list-unstyled '>
                {questionList[currentQuestion.index].answers.map(
                  (answer, index) => {
                    return (
                      <li
                        className={`quiz-option ${
                          currentQuestion.answerId === answer.id
                            ? 'selected'
                            : ''
                        }`}
                        key={answer.id}
                        onPointerDown={() =>
                          handleUserAnswer({ ...answer, index })
                        }>
                        <span className='quiz-option-number'>
                          {`${index + 1}`.padStart(2, '0')}
                        </span>{' '}
                        {answer.answer_text}
                      </li>
                    );
                  },
                )}
              </ul>
              {currentQuestion.answerId && (
                <p>
                  {' '}
                  <button className='btn btn-primary' onClick={handleSubmit}>
                    Submit
                  </button>{' '}
                </p>
              )}
            </div>
          </div>
        )
      )}
    </>
  );
}

export default Display;
