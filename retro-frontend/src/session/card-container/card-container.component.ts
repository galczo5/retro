import { Component, Input, OnInit } from '@angular/core';
import { SessionHttpService } from '../../app/session-http.service';
import { ContainersService } from '../containers.service';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements OnInit {

  @Input()
  sessionHash: string;

  @Input()
  hash: string;

  @Input()
  header: string;

  constructor(private readonly httpService: SessionHttpService,
              private readonly containersService: ContainersService) { }

  ngOnInit(): void {
  }

  deleteContainer(): void {
    this.httpService.deleteContainer(this.sessionHash, this.hash)
      .subscribe(() => {
        this.containersService.fetch();
      });
  }

}
