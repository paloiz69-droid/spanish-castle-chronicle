# Architecture rules

- Keep planner navigation UI in the existing route and keep Maps URL generation and localStorage persistence unchanged; these improvements are presentation-only.
- Measure the live sticky header for planner scrolling and docking offsets rather than assuming a fixed mobile height, because mobile search and navigation change its height.
- Use the isolated YoutubeVideo component for requested inline video sections, mounting the official privacy-enhanced iframe only after explicit activation to avoid loading players on initial page load.