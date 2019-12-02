import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// Component
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MusicPlayerPage } from '../pages/music-player/music-player';
import { FavoritePage } from '../pages/favorite/favorite';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Services
import { MusicProvider } from '../providers/music/music';

// Plugins
import { SocialSharing } from '@ionic-native/social-sharing';
import { MediaPlugin } from '@ionic-native/media';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MusicPlayerPage,
    FavoritePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MusicPlayerPage,
    FavoritePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MusicProvider,
    SocialSharing,
    MediaPlugin
  ]
})
export class AppModule {}
