import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { of } from 'rxjs';

import { photosService } from './photos.service';
import { environment } from 'src/environments/environment.development';
import { PhotosData } from '../helpers/testing-data/photos-data';

describe('photosService', () => {
  let service: photosService;
  let httpMock: HttpTestingController;
  let spyStore: jasmine.SpyObj<Store>;

  beforeEach(() => {
    spyStore = jasmine.createSpyObj('Store', ['select']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [photosService, { provide: Store, useValue: spyStore }],
    });

    service = TestBed.inject(photosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return data with get method check isFavorite properties', () => {
    const page = 1;
    const limit = 10;
    const mockPhotos = PhotosData;
    const mockFavorites = PhotosData.slice(0, 1);

    spyStore.select.and.returnValue(of(mockFavorites));

    service.getPhotos(page, limit).subscribe((photos) => {
      expect(photos[0].isFavorite).toBe(true);
    });

    const req = httpMock.expectOne(
      `${environment.ApiUrl}v2/list?page=${page}&limit=${limit}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPhotos);
  });
});
