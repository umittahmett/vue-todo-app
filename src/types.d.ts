export interface TaskProps{
    id: number;
    text: string;
    completed: boolean;
    createdAt: Date;
    updatedAt?: Date;
    completedAt?: Date;
}