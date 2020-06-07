import { Component, OnInit } from '@angular/core';
import { DataAccessService } from 'src/app/services/data-access.service';

@Component({
  selector: 'movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss']
})
export class MovielistComponent implements OnInit {

  constructor(private dataAccessService: DataAccessService) { }

  ngOnInit(): void {
  }
}
