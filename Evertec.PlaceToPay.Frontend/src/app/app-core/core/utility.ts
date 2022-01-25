import { NgForm } from '@angular/forms';
import { DefaultConfig } from '@appcore/config/default.config';
import Speech from 'speak-tts';
import { HttpResponse } from '@angular/common/http';

export class Utility extends DefaultConfig {
  /**
   * Generar Copia de un Objeto
   * @param obj objecto a copiar
   */
  static copyObj<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Estandarizar primera letra mayuscula
   * @param value String con el valor
   */
  static firstUpperCase(value: string): string {
    if (value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }

    return value;
  }

  /**
   * Valida si un objeto por lo menos tiene una propiedad con valor
   * @param obj objeto a validar
   */
  static objectHasValue<T>(obj: T): boolean {
    if (obj) {
      if (Object.entries(obj).length === 0) {
        return false;
      }

      return (
        Object.values(obj).filter(
          (value: any) => value !== null && value !== undefined && value !== ''
        ).length > 0
      );
    } else {
      return false;
    }
  }

  /**
   * Reinicia el formulario
   * @param form Formulario a limpiar
   */
  static resetForm(form: NgForm): void {
    for (const obj in form.form.controls) {
      if (obj) {
        form.form.controls[obj].reset();
      }
    }
  }

  static downloadFile(value: HttpResponse<Blob>, name: string) {
    const contentDisposition = value.headers.get('content-disposition');
    let filename = `Información ${name}.xlsx`;
    if (contentDisposition) {
      filename = this.getFilenameFromContentDisposition(contentDisposition);
    }

    const newBlob = new Blob([value.body], {
      type: value.body.type,
    });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }

    const data = window.URL.createObjectURL(newBlob);
    const link = document.createElement('a');
    link.href = data;
    link.download = filename;
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(data);
    }, 100);
  }

  private static getFilenameFromContentDisposition(
    contentDisposition: string
  ): string {
    const regex = /filename=(?<filename>[^,;]+);/g;
    const match = regex.exec(contentDisposition);
    if (match && match.groups && match.groups.filename) {
      const filename = match.groups.filename;
      return filename;
    }

    return '';
  }

  /**
   * Compara los valores de dos objetos con la misma estructura
   * @param obj1 objeto
   * @param obj2 objeto
   */
  static compareObjects<T>(obj1: T, obj2: T): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  /**
   * Reemplaza los valores de una formato definido {0} con los valores enviados
   * @param strFormat Cadena con el formato
   * @param srtArgs valores a reeemplazar en el formato
   */
  static format(strFormat: string, srtArgs: string[]): string {
    return strFormat.replace(/{(\d+)}/g, (match: string, itemNumber: number) =>
      srtArgs[itemNumber] && typeof srtArgs[itemNumber] !== 'undefined'
        ? srtArgs[itemNumber]
        : match
    );
  }

  /**
   * Leer textos de la pagina
   * @param textSpeech Cadena para leer
   */
  static SpeechPage(textSpeech: string): Speech {
    const speech = new Speech();
    if (speech.hasBrowserSupport()) {
      speech.setLanguage('es-AR');
      speech.speak({
        text: textSpeech,
      });

      return speech;
    }
  }

  /**
   * Incluir Script JavaScript sobre la pagina
   * @param url Url del Script
   */
  static runScript = async (url: string) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;

      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    });
  }

  /**
   * Incluir Estilos Css sobre la pagina
   * @param url Url de los Estilos
   */
  static runStyle = async (url: string) => {
    return new Promise((resolve, reject) => {
      const style = document.createElement('link');
      style.href = url;
      style.onload = resolve;
      style.onerror = reject;

      const firstScript = document.getElementsByTagName('link')[0];
      firstScript.parentNode.insertBefore(style, firstScript);
    });
  }
}
