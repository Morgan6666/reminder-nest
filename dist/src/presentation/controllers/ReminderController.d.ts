import { RemUseCase } from "application/use-cases/ReminderUseCase";
export declare class RemController {
    private readonly remUsecase;
    constructor(remUsecase: RemUseCase);
    getReminder(): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
    }>;
}
