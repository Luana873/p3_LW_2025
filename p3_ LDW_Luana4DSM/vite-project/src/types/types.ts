export interface Category {
    id: string;
    name: string;
    }
    
    
    export interface Task {
    id: string;
    categoryId: string;
    text: string;
    done: boolean;
    }