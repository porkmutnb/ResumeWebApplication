import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Auth } from './auth';

// Interface สำหรับข้อมูลไฟล์จาก Google Drive
export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webContentLink?: string;
  webViewLink?: string;
  thumbnailLink?: string;
  durationMillis?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Special {
  private readonly DRIVE_API_URL = 'https://www.googleapis.com/drive/v3/files';

  constructor(private http: HttpClient, private authService: Auth) {}

  getDriveFolders(
    folderId: string = 'root'
  ): Observable<{ files: DriveFile[] }> {
    const accessToken = this.authService.getGoogleAccessToken();
    if (!accessToken) {
      return of({ files: [] }); // หรือ throw error
    }

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    const params = new HttpParams().set(
      'q',
      `mimeType='application/vnd.google-apps.folder' and '${folderId}' in parents and trashed = false`
    );

    return this.http.get<{ files: DriveFile[] }>(this.DRIVE_API_URL, {
      headers,
      params,
    });
  }
  getDriveVideos(): Observable<{ files: DriveFile[] }> {
    const accessToken = this.authService.getGoogleAccessToken();
    if (!accessToken) {
      return of({ files: [] });
    }

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    // Query for video files
    const params = new HttpParams()
      .set('q', "mimeType contains 'video/' and trashed = false")
      .set(
        'fields',
        'files(id, name, mimeType, webContentLink, webViewLink, thumbnailLink, durationMillis)'
      );

    return this.http.get<{ files: DriveFile[] }>(this.DRIVE_API_URL, {
      headers,
      params,
    });
  }
}
