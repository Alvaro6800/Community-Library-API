import cron from 'node-cron'
import moment from 'moment'
import loanRepository from '../repositores/loanRepositories.js'
import sendEmail from './emailService.js';

cron.schedule('39 * * * *', async () => {
    console.log('Running daily job to check for due dates...');
    const loans = await loanRepository.findAllLoansRepository();
    const today = moment().startOf('day');

    loans.forEach((loan) => {
        const dueDate = moment(loan.dueDate).startOf('day');
        const reminderDueDate = moment(dueDate).subtract(1, 'days');
        if(today.isSame(reminderDueDate)){
            sendEmail(loan.userEmail, loan.bookTitle, loan.dueDate, loan.username)
        }
    })
})