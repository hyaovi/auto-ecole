export const getTicketsFromQuestions = (questions) => {
  return questions.reduce((tickets, question) => {
    if (!tickets.includes(question.ticketNumber)) {
      tickets.push(question.ticketNumber);
    }
    return tickets;
  }, []);
};

export const getQuestionsByTicket = (questions, ticketNumber) => {
  return questions.filter((question) => question.ticketNumber == ticketNumber);
};
