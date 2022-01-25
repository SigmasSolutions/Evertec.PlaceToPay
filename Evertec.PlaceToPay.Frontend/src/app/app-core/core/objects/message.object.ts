import { SweetAlertIcon } from 'sweetalert2';

export interface Message {
    title?: string;
    text: string;
    confirmButton?: string;
    cancelButton?: string;
    tags?: string[];
    details?: string;

    typeMessage?: SweetAlertIcon;
}
