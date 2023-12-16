import { Budget } from "../types";

export function calculateRemainingBudget(budget : Budget) {
    const budgetInitial = budget.budget_initial || 0;
    const usedBudget = budget.used_budget || 0;
    return budgetInitial - usedBudget;  
     
}