import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RemUseCase } from "application/use-cases/ReminderUseCase";


@ApiTags("Reminder")
@Controller("rem")
export class RemController {
    constructor(private readonly remUsecase: RemUseCase){}

    @Get("/")
    async getReminder(){
        const result = await this.remUsecase.reminde();
        return result;
    }

    
}