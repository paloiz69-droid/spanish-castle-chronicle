# Mobile planner usability

## Xivert video
- [ ] Associate the supplied video with Xivert only and add click-to-load official inline playback.
- [ ] Verify desktop hover, mobile touch, deferred player loading and unchanged public page.

- [x] Add a mobile planning shortcut with live count, header clearance, visibility management and reduced-motion support.
- [x] Preserve mobile step-by-step priority and update the requested explanation without changing Maps links.
- [x] Check selection, saved-route loading, mobile sizes, desktop, Maps URLs and preview diagnostics.
- [x] Compare the public page before and after; provide preview without publishing.

## Verification

- Browser checks passed at 360, 412, 768 and 1280px: selection/count, scroll and focus, stored-route loading, return navigation, single-leg URLs, complete-itinerary URL and runtime errors.
- Phone screenshots checked at 360 and 412px: header clearance, shortcut separation and planning section without shortcut.
- Latest preview compilation reports build OK.
- Public page text and script URLs match the pre-edit capture. No publishing action was performed.
- A physical Samsung and its Google Maps app were not tested. Existing header overflow at the 768px desktop-navigation breakpoint is outside this planner change; narrow-phone overflow checks passed.