import { Injectable } from '@angular/core';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private sanitizer:DomSanitizer) { }

  public transformB64toImage(base64Image: string): SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }
}
