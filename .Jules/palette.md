## 2024-05-23 - Interactive Elements Semantics
**Learning:** Interactive elements like color swatches and tags were implemented as `div` and `span` with `onClick`, making them inaccessible to keyboard users and screen readers.
**Action:** Always use `<button>` for interactive elements or add `role="button"` with `tabIndex={0}` and keyboard event handlers. Using `<button>` is preferred as it handles focus and keyboard events natively.
