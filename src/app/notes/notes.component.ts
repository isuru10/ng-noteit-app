import { Component, OnInit } from '@angular/core';
import {Notebook} from "./model/notebook";
import {ApiService} from "../shared/api.service";
import {Note} from "./model/note";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  selectedNotebook : Notebook;
  searchText: string;
  notebooks : Notebook [] = [
    {
      id:'1',
      name:'NB1',
      nbOfNotes: 2
    },
    {
      id:'2',
      name:'NB2',
      nbOfNotes: 2
    }
  ];

  notes : Note [] = [
    {
      id: "001",
      title: "Note Title 1",
      text: "Note content",
      notebookId: "NB1",
      lastModifiedOn: "12/08/2019"
    },
    {
      id: "002",
      title: "Note Title 2",
      text: "Note content 2",
      notebookId: "NB2",
      lastModifiedOn: "10/08/2019"
    }
  ];
  constructor(private apiService : ApiService) { }

  ngOnInit() {
    this.getAllNoteBooks();
    this.getAllNotes();
  }

  public getAllNoteBooks(){

    this.apiService.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
      },
      err => {
              alert("An error has occured");
            }
    );
  }

  public getAllNotes(){
    this.apiService.getAllNotes().subscribe(
      res => {

      },
      err => {
        alert("Could not get all notes");
      }
    );
  }

  createNotebook() {
    let newNotebook: Notebook = {
      name: 'New Notebook',
      id: null,
      nbOfNotes: 0
    }

    this.apiService.postNotebook(newNotebook).subscribe(
      res =>{
        newNotebook.id = res.id;
        this.notebooks.push(newNotebook);
      },
        err =>{
        alert("Error occured while saving notebook");
      }
    );
  }

  updateNotebook(updateNotebook: Notebook) {
    this.apiService.postNotebook(updateNotebook).subscribe(
      res=>{

      },
      err => {
        alert("Error occured while updating notebook");
      }
    );
  }

  deleteNotebook(notebook: Notebook) {
    if(confirm("Are you sure you want to delete?")){
      this.apiService.deleteNotebook(notebook.id).subscribe(
        res => {
          let indexOfNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook, 1);
        },
        err => {
          alert("Could not delete notebook");
          let indexOfNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook, 1);
        }
      );
    }
  }



  createNote(notebookId: string) {
    let newNote: Note = {
      id: null,
      title: 'New note',
      text: "",
      notebookId: notebookId,
      lastModifiedOn: null
    }

    this.apiService.postNote(newNote).subscribe(
      res => {
        newNote.id = res.id;
        this.notes.push(newNote);
      },
      err => {
        alert("Could not save note");
        this.notes.push(newNote);
      }
    );

  }

  selectNotebook(notebook: Notebook) {
    this.selectedNotebook = notebook;
    this.apiService.getAllNotesByNoteBook(notebook.id).subscribe(
      res => {
        this.notes = res;
      },
      err => {
        alert("Error occured while getting notes by notebook");
      }
    );
  }

  updateNote(updatedNote: Note) {
    this.apiService.postNote(updatedNote).subscribe(
      res => {
      },
      err => {
        alert("Could not save note");
      }
    );
  }

  deleteNote(note: Note) {
    if(confirm("Are you sure you want to delete this note?")){
      this.apiService.deleteNote(note.id).subscribe(
        res => {
          let indexOfNote = this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1);
        },
        err => {
          alert("Could not delete note");
          let indexOfNote = this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1);
        }
      );
    }
  }

  selectAllNotes() {
    this.selectedNotebook = null;
    this.getAllNotes();
  }
}
