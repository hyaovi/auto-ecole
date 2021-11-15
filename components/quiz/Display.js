import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useDocumentVisibility } from '../../hook/useDocumentVisibility';
import { useInterval } from '../../hook/useInterval';
import Img from '../common/Img';
import Results from './Results';
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
  // XXX remove or change animation logics
  const htmlEl = useRef(null);
  const parentEl = useRef(null);
  const [timer, setTimer] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [showResults, setShowResults] = useState(false);
  const [userLogs, setUserLogs] = useState([]);
  const [stats, setStats] = useState(initialStats);
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestionState);
  const isDocumentVisible = useDocumentVisibility();
  const timeOut = 5; // unit : minutes

  useEffect(() => {
    if (isDocumentVisible) {
      setDelay(1000);
    } else {
      setDelay(null);
    }
    return () => {};
  }, [isDocumentVisible]);

  useInterval(() => {
    if (timer === timeOut * 60) {
      // timeout stop quiz and show results
      if (!showResults) setShowResults(true);
    } else {
      setTimer(timer + 1);
    }
  }, delay);
  const logsLength = useMemo(() => () => userLogs.length, [userLogs]);

  const resetQuiz = useCallback(() => {
    if (questionList.length) {
      // reset timer
      setTimer(0);
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
  }, [questionList]);

  useEffect(() => {
    // reset quiz
    resetQuiz();
  }, [questionList, resetQuiz]);
  useEffect(() => {
    const el = htmlEl.current;
    const elWrapper = parentEl.current;
    if (el) {
      console.log(el, elWrapper);
      elWrapper.classList.add('slide-up-wrapper');
      el.classList.add('slide-up');
      setTimeout(() => {
        elWrapper.classList.remove('slide-up-wrapper');
        el.classList.remove('slide-up');
      }, 500);
    }
  }, [logsLength]);
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
          <Results
            restartQuiz={resetQuiz}
            results={{
              percentage: (stats.correctAnswers / questionList.length) * 100,
            }}
          />
        </>
      ) : (
        currentQuestion.id && (
          <div className='row ' ref={parentEl}>
            <div
              className='col-12 col-md-10 col-lg-7 col-xl-6 slide-up'
              ref={htmlEl}>
              <div className='d-flex flex-nowrap mt-3 mt-lg-5'>
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
