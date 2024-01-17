import { DomSanitizer } from '@angular/platform-browser'
import {PipeTransform, Pipe, Input} from "@angular/core";

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {

  @Input() pagina:string| undefined;
  constructor(private sanitized: DomSanitizer) {}

  //aggira la sicurezza e considera attendibile il valore specificato come HTML sicuro.
  transform(value: string) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
