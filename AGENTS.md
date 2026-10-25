# Architecture rules

- Keep planner navigation UI in the existing route and keep Maps URL generation and localStorage persistence unchanged; these improvements are presentation-only.
- Measure the live sticky header for planner scrolling and docking offsets rather than assuming a fixed mobile height, because mobile search and navigation change its height.
- Use the shared YoutubeVideo component for documentary thumbnails, deriving validated individual IDs from catalogue URLs and opening standard external links without iframes; this avoids player overhead and embedding restrictions.