import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup
  hide = false
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _alertController: AlertController,
    private _authService: AuthService,
    private _loaderService: LoaderService,
    private _alertService: AlertService
  ) { }

  ngOnInit() {
    const message = this._activatedRoute.snapshot.queryParamMap.get('message');
    if (message) {
      this._alertService.presentToast(message, 'danger')
    }
    this.registerForm = this._formBuilder.group({
      name: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  eye() {
    this.hide = !this.hide
  }

  async presentAlert(msg, name) {
    const alert = await this._alertController.create({
      header: `Dear ${name},`,
      message: `${msg}`
    });
    await alert.present();

    setTimeout(() => {
      alert.dismiss();
    }, 3000)
  }

  onSubmit() {
    let name = this.registerForm.get('name').value
    let username = this.registerForm.get('username').value.toLowerCase()
    let email = this.registerForm.get('email').value.toLowerCase()
    let password = this.registerForm.get('password').value
    this._authService.register(name, username, email, password).subscribe(
      async data => {
        this._loaderService.isLoading.next(false)
        this.presentAlert(data['msg'], data['name'])
        await this._router.navigate(['login']);
        this.registerForm.reset()
      }
    )
  }
}
