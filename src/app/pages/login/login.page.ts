import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, {static: true}) slides:IonSlides;/*Se der erro retirar {static: true} */
  public wavesPosition: number = 0;
  public wavesDifference: number = 80;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;

  constructor(
    public keyboard: Keyboard,
    private loadingCrtl: LoadingController,
    private AuthService: AuthService,
    private toastCtrl: ToastController
    ) { }

  ngOnInit() { }

  segmentChanged(event: any){
    if (event.detail.value === "login") {
      this.slides.slidePrev();
      this.wavesPosition += this.wavesDifference;
    } else {
      this.slides.slideNext();
      this.wavesPosition -= this.wavesDifference;
    }
  }

  async login() {
    await this.presentLoading();

    try {
      /*await*/ this.AuthService.login(this.userLogin);
      } catch (error) { 
        this.presentToast(error.message);
      } finally {
        this.loading.dismiss();
    }
  }

  async register() {
    await this.presentLoading();

    try {
      /*await*/ this.AuthService.register(this.userRegister);
      } catch (error) { 
        this.presentToast(error.message);
      } finally {
        this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCrtl.create({message: 'Por favor, aguarde...'});
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }


}