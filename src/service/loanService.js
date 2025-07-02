import loanRepository from "../repositores/loanRepositories.js";  

async function createLoanRepository(userId, bookId, dueDate){
    const createdLoan = await loanRepository.createLoanRepository(userId, bookId, dueDate);

    if(!createdLoan)
        throw new Error('Error creating Loan');

    return createdLoan;
}

async function findAllLoansService(){
    const loans = await loanRepository.findAllLoansRepository();
    return loans;
}

async function findLoanByIdService(loanId){
    const loan = await loanRepository.findLoanByIdRepository(loanId);

    if(!loan)
        throw new Error("Loan not found");

    return loan;
}

async function deleteLoanService(loanId, userId){
    const loan = await loanRepository.findLoanByIdRepository(loanId);

    if(!loan)
        throw new Error("Loan not found");

    console.log(loan.userId)
    if(loan.userId !== userId)
        throw new Error("Unauthorized")

    const {message} = await loanRepository.deleteLoanRepository(loanId);

    return message;
}


export default{
    createLoanRepository
    , findAllLoansService
    , findLoanByIdService
    , deleteLoanService
}