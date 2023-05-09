import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { SinglePhotoComponent } from './single-photo.component';

describe('SinglePhotoComponent', () => {
  let fixture: ComponentFixture<SinglePhotoComponent>;
  let storeSpy: jasmine.SpyObj<Store>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [SinglePhotoComponent],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: () => 1 }) },
        },
      ],
      imports: [MatDialogModule],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePhotoComponent);
  });

  it('should remove favorite and redirect to home page', () => {
    dialogSpy.open.and.returnValue({
      afterClosed: () => of(true),
    } as any);

    storeSpy.dispatch.and.returnValue(of(null));

    fixture.componentInstance.removeFavorites(1);

    expect(dialogSpy.open).toHaveBeenCalledOnceWith(jasmine.any(Function), {
      width: '30%',
      data: { message: 'Are you sure want to remove?' },
    });

    expect(storeSpy.dispatch.calls.allArgs()).toEqual([
      [jasmine.anything()],
      [jasmine.anything()],
    ]);

    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/']);
  });

  it('should not remove favorite', () => {
    dialogSpy.open.and.returnValue({
      afterClosed: () => of(false),
    } as any);

    fixture.componentInstance.removeFavorites(1);

    expect(dialogSpy.open).toHaveBeenCalledOnceWith(jasmine.any(Function), {
      width: '30%',
      data: { message: 'Are you sure want to remove?' },
    });

    expect(storeSpy.dispatch).not.toHaveBeenCalled();

    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
