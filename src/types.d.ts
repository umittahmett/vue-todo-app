export interface TaskProps{
    id: number;
    text: string;
    completed: boolean;
    createdAt: string;
    updatedAt?: string;
    completedAt?: string;
    onDelete?: () => void;
}