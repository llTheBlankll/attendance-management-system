import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SortRequest} from "../../interfaces/SortRequest";
import {PageRequest} from "../../interfaces/PageRequest";
import {Announcement} from "../../interfaces/dto/announcement/announcement";
import {MessageDTO} from "../../interfaces/MessageDTO";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private readonly API_URL = environment.apiUrl;
  private readonly http = inject(HttpClient);

  // * GET REQUESTS
  public getAnnouncement(announcementId: number) {
    return this.http.get<Announcement>(`${this.API_URL}/announcements/${announcementId}`);
  }

  public getAllAnnouncement(sortRequest?: SortRequest, pageRequest?: PageRequest) {
    return this.http.get<Announcement[]>(`${this.API_URL}/announcements/all`, {
      params: {
        ...(pageRequest && {
          page: pageRequest.pageNumber,
          size: pageRequest.pageSize
        }),
        ...(sortRequest && {
          sortBy: sortRequest.sortBy,
          sortDirection: sortRequest.sortDirection
        })
      },
      observe: "response"
    })
  }

  public searchAnnouncement(query: string, sortRequest?: SortRequest, pageRequest?: PageRequest) {
    return this.http.get(`${this.API_URL}/announcements/search`, {
      params: {
        q: query,
        ...(sortRequest && {
          sortBy: sortRequest.sortBy,
          sortDirection: sortRequest.sortDirection
        }),
        ...(pageRequest && {
          page: pageRequest.pageNumber,
          size: pageRequest.pageSize
        })
      }
    })
  }

  // * END GET REQUESTS

  // * POST REQUESTS
  public createAnnouncement(announcement: Announcement) {
    return this.http.post<MessageDTO>(`${this.API_URL}/announcements/create`, JSON.stringify(announcement), {
      observe: "response"
    });
  }

  // * END POST REQUESTS

  // * PUT REQUESTS
  public updateAnnouncement(announcementId: number, announcement: Announcement) {
    return this.http.put<MessageDTO>(`${this.API_URL}/announcements/${announcementId}`, announcement, {
      observe: "response"
    });
  }

  // * END PUT REQUESTS

  // * DELETE REQUESTS
  public deleteAnnouncement(announcementId: number) {
    return this.http.delete<MessageDTO>(`${this.API_URL}/announcements/${announcementId}`, {
      observe: "response"
    });
  }

  // * END DELETE REQUESTS
}