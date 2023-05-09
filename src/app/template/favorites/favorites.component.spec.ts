import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FavoritesComponent } from './favorites.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NgxsModule, Store } from '@ngxs/store';
import { FavoritesState } from 'src/app/shared/states/favorites/favorites.state';
import { PhotosData } from 'src/app/shared/helpers/testing-data/photos-data';

describe('FavoritesComponent', () => {
  let fixture: ComponentFixture<FavoritesComponent>;
  let storeSpy: jasmine.SpyObj<Store>;
  let router: Router;

  beforeEach(() => {
    storeSpy = jasmine.createSpyObj('Store', ['select']);

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([FavoritesState]), RouterTestingModule],
      declarations: [FavoritesComponent],
      providers: [{ provide: Store, useValue: storeSpy }],
    });

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(FavoritesComponent);
    storeSpy.select.and.returnValue(of(PhotosData));
    fixture.detectChanges();
  });

  it('should navigate to the correct address when clicking the favorite', () => {
    const navigateSpy = spyOn(router, 'navigate');

    fixture.debugElement
      .query(By.css('#item-0'))
      .triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/photos/0']);
  });
});
