export class Person 
{
    personId: string;
    name: string;
    age: number;
    sex: string;
    pulsations: number;

    CalculatePulsations(): void
    {
        if (!this.sex)
            this.pulsations = 0;
        else
            this.pulsations = (this.sex == 'F') ? ((220 - this.age) / 10) : ((210 - this.age) / 10);
    }
}
