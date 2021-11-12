import questionList from '../../../../contants/pdd.parsed.json';

import { getQuestionsByTicket } from '../../../../utils/quiz';

export default function handler({ query: { id } }, res) {
  const questions = getQuestionsByTicket(questionList, id);
  res.status(200).json({ questions });
}
