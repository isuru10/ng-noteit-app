import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notebook} from "../notes/model/notebook";
import {FeedbackViewModel} from "../feedback/feedback.component";
import {Note} from "../notes/model/note";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = "http:localhost:8082/api";
  private ALL_NOTEBOOKS_URL = `${this.BASE_URL}\\notebooks\\all`;
  private SEND_FEEDBACK_URL = `${this.BASE_URL}\\feedback`;
  private SAVE_UPDATE_NOTEBOOK_URL = `${this.BASE_URL}\\notebooks`;
  private DELETE_NOTEBOOK_URL = `${this.BASE_URL}\\notebooks`;
  private GET_ALL_NOTES_URL = `${this.BASE_URL}\\notes\\all`;
  private NOTES_BY_NOTEBOOK_URL = `${this.BASE_URL}\\notes\\byNotebook`;
  private DELETE_NOTE_URL = `${this.BASE_URL}\\notes`;
  private SAVE_UPDATE_NOTE_URL = `${this.BASE_URL}\\notes`;

  constructor(private http: HttpClient) {

  }

  getAllNotebooks(): Observable<Notebook[]> {
    return this.http.get<Notebook[]>(this.ALL_NOTEBOOKS_URL);
  }

  postFeedback(feedback : FeedbackViewModel) : Observable<any>{
    return this.http.post(this.SEND_FEEDBACK_URL, feedback);
  }

  postNotebook(notebook : Notebook): Observable<Notebook>{
    return this.http.post<Notebook>(this.SAVE_UPDATE_NOTEBOOK_URL, notebook);
  }

  deleteNotebook(id: string): Observable<any>{
    return this.http.delete(this.DELETE_NOTEBOOK_URL + id);
  }

  getAllNotes(): Observable<Note[]>{
    return this.http.get<Note[]>(this.GET_ALL_NOTES_URL);
  }

  getAllNotesByNoteBook(notebookId: string): Observable<Note[]>{
    return this.http.get<Note[]>(this.NOTES_BY_NOTEBOOK_URL + notebookId);
  }

  deleteNote(id: string): Observable<any>{
    return this.http.delete(this.DELETE_NOTE_URL + id);
  }

  postNote(note : Note): Observable<Note>{
    return this.http.post<Note>(this.SAVE_UPDATE_NOTE_URL, note);
  }
}
