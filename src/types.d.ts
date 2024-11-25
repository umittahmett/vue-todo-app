export interface TaskProps{
    id: number;
    text: string;
    completed: boolean;
    createdAt: number;
    updatedAt?: number;
    completedAt?: number;
    onDelete?: () => void;
    onCheckedChange?: () => void;
    onEdit?: (id: number, newText:string) => void;
}