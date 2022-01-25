import { MessageService } from '@appcore/services/message.service';
import { BaseGenericService } from '@appcore/services/base-generic.services';
import { Utility } from '@appcore/utility';

export class BaseComponent<T> {
    $onMethod: any;
    inputDateFormat = Utility.DEFAULT_CONFIG_APP.DefaultDate;
    inputDatetimeFormat = Utility.DEFAULT_CONFIG_APP.DefaultDateTime;

    constructor(readonly serviceEntidad: BaseGenericService<T>,
                readonly messageService: MessageService) { }

    confirmAction($callBack: any, $messge = 'ConfirmarEliminacion', param: any = ''): void {
        if ($callBack) {
            this.messageService.confirmAction($callBack, $messge, param);
        }
    }

    Delete<TValue>(idEliminar: TValue): void {
        this.confirmAction(() => {
            this.serviceEntidad.delete(idEliminar)
                .subscribe(() => {
                    if (this.$onMethod) { this.$onMethod(); }
                });
        });
    }
}
