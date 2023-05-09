import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxsModule, Store } from '@ngxs/store';
import { PhotosComponent } from './photos.component';
import { AddFavorites } from 'src/app/shared/states/favorites/favorites.action';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { UpdateFavoriteStatus } from 'src/app/shared/states/photos/photos.action';
import { PhotosData } from 'src/app/shared/helpers/testing-data/photos-data';
import { PhotosState } from 'src/app/shared/states/photos/photos.state';

describe('PhotosComponent', () => {
  let fixture: ComponentFixture<PhotosComponent>;
  let storeSpy: jasmine.SpyObj<Store>;

  const samplePhoto = {
    id: 0,
    author: 'Alejandro Escamilla',
    width: 5000,
    height: 3333,
    url: 'https://unsplash.com/photos/yC-Yzbqy7PY',
    download_url: 'https://picsum.photos/id/0/300/300',
  };

  beforeEach(() => {
    storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PhotosState]), HttpClientTestingModule],
      declarations: [PhotosComponent],
      providers: [{ provide: Store, useValue: storeSpy }],
    });
  });

  beforeEach(() => {
    storeSpy.select.and.returnValue(of(PhotosData));
    fixture = TestBed.createComponent(PhotosComponent);
    fixture.detectChanges();
  });

  it('should dispatch some actions on button click', () => {
    fixture.debugElement
      .query(By.css('#item-0'))
      .triggerEventHandler('click', null);

    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      new AddFavorites(samplePhoto)
    );
    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      new UpdateFavoriteStatus(samplePhoto.id)
    );
  });

  it('should update favorites state after dispatching AddFavorites', () => {
    storeSpy.dispatch(new AddFavorites(samplePhoto));

    storeSpy.select((state) => {
      expect(state.favorites.photos).toContain(samplePhoto);
    });
  });
});
