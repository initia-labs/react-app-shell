# react-app-shell

## Usage

Import the main css file `./styles.css` along with your app's global css file.

```
import "<path-to-your-global-css>/globals.css";
import "<path-to-this-dir>/react-app-shell/styles.css";

...
```

Then import the components to where you desire

## Components

### AppMenu

- params
  - app: current app e.g. "app", "bridge" (so that this app will be rendered as checked)
  - subdomain (optional): subdomain to your app url e.g. "testnet" for "https://app.testnet.initia.xyz"

### InitiaTerms

- params (none)
