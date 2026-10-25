# Documentary thumbnails and mobile planner usability

## Redundant sidebar video button
- [x] Hide only the sidebar video button when the shared clickable thumbnail is present; preserve original links and other controls.
- [ ] Verify desktop/mobile thumbnail activation, missing-image fallback, layout and unchanged public page without publishing.

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
- [x] Verify all catalogue associations, desktop/mobile interaction, missing images, no-video behavior, diagnostics and before/after performance.
- [x] Deliver preview review findings without publishing.

### Documentary verification results
- 45 catalogue entries have valid individual IDs; all 45 official thumbnail URLs returned HTTP 200 images. No entries lack video URLs.
- Browser checked all 45 thumbnail/link associations and absence of iframes. Xivert and Busot links opened the correct YouTube URLs through keyboard activation; Xivert also passed mobile activation at 412px.
- Desktop hover scale is 1.03; reduced-motion scale is none. Mobile layout remains 16:9 with no horizontal overflow. Simulated image error shows the fallback and retains the correct link.
- Four identifier tests passed, including missing URL and invalid/channel URL handling. No real no-video catalogue page exists to exercise; no catalogue data was modified to create one.
- No JavaScript errors; latest preview build OK. Official images load lazily one per viewed castle; sampled image transfers were approximately 21 KB for Xivert and 30 KB for Busot. No player requests or dependencies added.
- Local before/after DCL samples: Busot 121/126 ms; Xivert 281/91 ms. These are single development-server observations, not production benchmarks; no reliable speed improvement is claimed.
- No publication or shared backend writes occurred. Public Xivert still lacks the new documentary label and retains baseline script URLs; full text/script equality could not be established due to dynamic rendering, so do not claim byte-identical public output.