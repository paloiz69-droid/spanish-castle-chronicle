import { describe, expect, test } from "bun:test";
import { getYoutubeVideoId } from "./youtube";

describe("individual documentary identification", () => {
  test("retains Xivert's supplied video ID", () => {
    expect(getYoutubeVideoId("https://youtu.be/E5fFov0byw4")).toBe("E5fFov0byw4");
  });
  test("retains Busot's supplied video ID", () => {
    expect(getYoutubeVideoId("https://www.youtube.com/watch?v=Q7jne0C38uU&t=30")).toBe("Q7jne0C38uU");
  });
  test("does not assign a documentary when no URL exists", () => {
    expect(getYoutubeVideoId(undefined)).toBeUndefined();
  });
  test("rejects channels, incomplete IDs and unofficial hosts", () => {
    for (const url of ["https://www.youtube.com/@Kdronazo", "https://youtu.be/short", "https://youtube.com.example.org/watch?v=E5fFov0byw4", "not a URL"]) {
      expect(getYoutubeVideoId(url)).toBeUndefined();
    }
  });
});