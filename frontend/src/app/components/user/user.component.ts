import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userType: string | null = null;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.userType = this.activatedRoute.snapshot.paramMap.get('type');
  }
}
