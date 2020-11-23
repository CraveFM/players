# nativescript-evoplayer


:one: Create the blank `Angular` `Nativescript` Project

```
% ns create ns-blank-ng --template @nativescript/template-blank-ng && cd ns-blank-ng
```

:two: Add the [exoplayer](https://www.npmjs.com/package/@nstudio/nativescript-exoplayer) plugin

```
% ns plugin add nativescript-exoplayer
```

:three: Add some code

:pushpin: Add the below `import` and `registration` to the `home` component file `home.component.ts`

```typescript
// somewhere at top of your component or bootstrap file
import { registerElement } from "@nativescript/angular";
import { Video } from '@nstudio/nativescript-exoplayer';
registerElement("Video", () => Video);
```

:pushpin: Add the below snippet to the `home` template file `home.component.html`


```html
    <!-- Add your page content here -->
    <Video
    src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
    autoplay="true"
    height="300"></Video>
```

:four: Run the app

:pushpin: Using local `Playground`

```
% ns run
```

:pushpin: Using Preview

```
% ns preview
```

## :x: Custom

<<<<<<< HEAD
:mobile: Android

Open up the manifest file `AndroidManifest.xml` and add by the following in `<application>` parameter tag:

:keyboard: Dans [VSC](https://code.visualstudio.com/) Ouvrir un fichier -> `Ctrl p` :computer: Windows -> `⌘ p` :apple: MacOS


```xml
	<application
		...
		android:usesCleartextTraffic="true">
```

# References:

https://developer.android.com/training/articles/security-config



