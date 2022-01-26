export class DefaultConfig {
    /**
     * Variables de configuración de la aplicación
     */
    static DEFAULT_CONFIG_APP = {
        DEFAULT_NUMBERRECORDS: 10,
        DEFAULT_SHOWPAGE: 5,
        DEFAULT_PAGE: 1,
        DefaultTimerMessage: 6000,
        DefaultTimerToast: 8000,
        DefaultColor: '#2d62ed',

        DefaultConfirmButtonColor: '#2d62ed',
        DefaultCancelButtonColor: '#a1a1a5',
        DefaulCircleProgressColor: '#007934',
        DefaultDate: 'M/d/yyyy',
        DefaultDateTime: 'M/d/yyyy HH:mm:ss',
        DefaultNumberDecimal: '1.1-2',

        DefaultActiveDelete: true,
        DefaultActiveUpdate: true,

        DefaultStyleTable: 'cuore-table',
        Icon: {
            Create: 'plus',
            Update: 'edit',
            Delete: 'trash-alt',
            Cancel: 'times',
            View: 'eye',
            TitleHead: 'list-ul',
            Payment: 'shopping-cart',
            Check: 'check-circle',
            UnCheck: 'times-circle'
        }
    };

    /**
     * Configuaración del componente de Sumernote
     */
    static DEFAULT_SUMMERNOTE_CONFIG = {
        lang: 'es-ES',
        toolbar: [
            ['para', ['style', 'ul', 'ol', 'paragraph']],
            ['fontStyle', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript']],
            ['font', ['fontname', 'fontsize', 'color', 'height']],
            ['insert', ['link', 'picture', 'video', 'table', 'hr']],
            ['view', ['clear', 'undo', 'redo', 'codeview', 'fullscreen']]
        ]
    };

    /**
     * Expresiones regulares para validaciones de campos
     */
    static PatternValidation = {
        Url: '/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/',
        Email: '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
    };
}
