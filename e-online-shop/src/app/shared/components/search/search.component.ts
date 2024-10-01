import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-search',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './search.component.html',
	styleUrl: './search.component.css',
})
export class SearchComponent {
	@Input() placeholder = 'Search...';
	@Input() searchTerm = '';
	@Output() searchTermChange: EventEmitter<string> = new EventEmitter<string>();

	public onSearchTermChange(value: string): void {
		this.searchTerm = value;
		this.searchTermChange.emit(this.searchTerm);
	}
}
