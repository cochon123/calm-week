# Design rationale
**User:** post-secondary students juggling classes + part-time work (persona: "Maya, 20, SAIT, works 20h/wk, feels overwhelmed by long to-do lists").
**Problem:** typical planners show everything at once, which increases anxiety and decision paralysis.
**Principles:** 1) One focus ("Right now" hero card). 2) Energy, not just time (🟢🟡🔴). 3) Gentle warnings, not red alarms (days with load > 5 flagged).
**Flow:** add task (3 fields) → appears in week grid → hero shows next task → "Done — next".
**Accessibility:** skip link; semantic landmarks and labelled sections; all controls keyboard reachable with visible focus ring; 44px touch targets; aria-live for the current task; aria-pressed toggles; dark mode (auto from OS), high-contrast mode, larger-text mode; respects prefers-reduced-motion; emoji paired with text labels.
**Visual:** soft violet/pink gradient hero for calm energy; rounded cards; generous whitespace; responsive auto-fit grid for mobile.
