# Nirmeeti v1.5.0 Release Notes

**Release Date:** December 21, 2025\
**Type:** Major Feature Release (Android Support)

---

## 🎉 Highlights

This release transforms Nirmeeti from a web-only application into a **hybrid
web + Android app** with native mobile features.

---

## ✨ New Features

### Android App Support

- Full Android application via Capacitor
- Offline-first architecture
- Native share integration
- Native clipboard with haptic feedback
- Optimized touch UI (48px targets, safe areas)
- Dark status bar theming

### Native Utilities (`src/lib/native.ts`)

- `copyToClipboard()` - With haptic feedback on native
- `shareContent()` - Android share sheet integration
- `hapticFeedback()` - Light/medium/heavy vibration
- `initStatusBar()` - Native status bar styling
- `canShare()` - Platform detection

---

## 📱 Updated Components

All 9 tool components now support native features:

| Component         | Native Copy | Native Share |
| ----------------- | :---------: | :----------: |
| PasswordGenerator |     ✅      |      ✅      |
| UniqueID          |     ✅      |      ✅      |
| ColorPalette      |     ✅      |      -       |
| LoremIpsum        |     ✅      |      -       |
| RandomQuote       |     ✅      |      ✅      |
| HashtagGenerator  |     ✅      |      -       |
| CSSGradient       |     ✅      |      -       |
| RandomNumber      |     ✅      |      -       |
| ProfileGenerator  |     ✅      |      ✅      |

---

## 🔧 Configuration Changes

### `capacitor.config.ts`

- App ID: `com.yashmagar.nirmeeti`
- App Name: `Nirmeeti`
- Offline mode (no server URL)
- StatusBar, Keyboard plugins

### `package.json`

- New scripts: `android:sync`, `android:build`, `android:run`
- Version: `1.5.0`

### `index.html`

- Mobile viewport with `viewport-fit=cover`
- PWA meta tags
- Nirmeeti branding

### `index.css`

- Safe area inset support
- Touch optimization
- Minimum 44px touch targets

---

## 📦 New Dependencies

```
@capacitor/share@7.0.3
@capacitor/clipboard@7.0.3
@capacitor/haptics@7.0.3
@capacitor/status-bar@7.0.4
@capacitor/keyboard@7.0.4
```

---

## 🚀 Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Android
npm run android:sync    # Sync web to Android
npm run android:build   # Build + open Studio
npm run android:run     # Run on device
```

---

## 📱 Installation

### Web

Visit: https://generations-tools.vercel.app/

### Android APK

1. Download `nirmeeti-v1.5.0.apk`
2. Enable "Install unknown apps"
3. Install and enjoy!

---

## 🔜 Roadmap

- [ ] iOS support
- [ ] Dark/Light theme toggle
- [ ] More tools
- [ ] Play Store release

---

**Full Changelog:**
[v1.0.0...v1.5.0](https://github.com/yashmagar01/Generations_Tools/compare/v1.0.0...v1.5.0)
