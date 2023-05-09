import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { LayoutComponent } from './layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { PhotosData } from '../shared/helpers/testing-data/photos-data';
import { PhotosState } from '../shared/states/photos/photos.state';
import { HttpClientModule } from '@angular/common/http';

describe('LayoutComponent', () => {
  let spyStore: jasmine.SpyObj<Store>;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(() => {
    spyStore = jasmine.createSpyObj('Store', ['select']);

    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([PhotosState]),
        HttpClientModule,
        RouterTestingModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatBadgeModule,
      ],
      declarations: [LayoutComponent],
      providers: [{ provide: Store, useValue: spyStore }],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
  });

  it('should get the length of favorites', () => {
    const expectedLength = PhotosData.length;
    const favoritesLength$ = of(expectedLength);
    spyStore.select.and.returnValue(favoritesLength$);
    expect(fixture.componentInstance.favoritesLength$).toBe(favoritesLength$);
  });
});
