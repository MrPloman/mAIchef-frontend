import { Component } from '@angular/core';

@Component({
  selector: 'app-replan-actions',
  imports: [],
  templateUrl: './replan-actions.html',
  styleUrl: './replan-actions.scss',
})
export class ReplanActions {
  liked = false;
  likeCount = 24;
  toggleLike(): void {
    this.liked = !this.liked;
    this.likeCount += this.liked ? 1 : -1;
    // this.router.navigate(['/recipes/new'], { queryParams: { fork: this.recipe._id } });
  }
}
