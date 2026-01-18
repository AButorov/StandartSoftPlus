import "@testing-library/jest-dom/vitest";
import { beforeAll, afterEach, afterAll, vi } from "vitest";

// Мокируем fetch глобально для всех тестов
beforeAll(() => {
  globalThis.fetch = vi.fn() as any;
});

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});
