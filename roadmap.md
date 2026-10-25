# Documentary thumbnails and mobile planner usability

## Xivert video
- [x] Associate the supplied video with Xivert only and add click-to-load official inline playback.
- [x] Verify desktop hover, mobile touch, deferred player loading and unchanged public page.
- [x] Supersede inline playback with standard external YouTube links; embedding permission is no longer needed.

### Xivert verification
- Thumbnail identifies Castillo de Xivert; desktop hover and mobile activation passed. The iframe is absent until click and autoplay is disabled.
- Existing two gallery photos remain present; Busot has no new video section. No runtime errors and preview build OK.
- Public page text and script sources are unchanged; nothing was published.

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

## Catalogue documentary thumbnails
- [x] Inspect existing component and static catalogue; change only frontend files, with no shared backend writes or publication.
- [x] Reuse the component for all valid documentary URLs with lazy official thumbnails, reserved image space, accessible links and a missing-image fallback.
- [ ] Verify all catalogue associations, desktop/mobile interaction, missing images, no-video behavior, diagnostics and before/after performance.
- [ ] Deliver preview review findings without publishing.