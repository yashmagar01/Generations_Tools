## 2024-05-23 - Mobile Safe Areas
**Learning:** Modern mobile web apps must account for safe areas (notch, home indicator) using `env(safe-area-inset-*)` CSS variables.
**Action:** Always add `pb-[env(safe-area-inset-bottom)]` to fixed bottom navigation or full-screen overlays, and `pt-[env(safe-area-inset-top)]` to sticky headers to ensure content isn't obscured by system UI.
