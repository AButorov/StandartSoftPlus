import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactFormCard from "../../src/components/ContactFormCard";

describe("ContactFormCard", () => {
  beforeEach(() => {
    // Мокируем успешный ответ от API
    (globalThis.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
  });

  it("рендерит форму с обязательными полями", () => {
    render(<ContactFormCard />);

    expect(screen.getByText(/Начнём сотрудничество/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Как вам обращаться/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Способ связи/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Сообщение/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Отправить заявку/i }),
    ).toBeInTheDocument();
  });

  it("изменяет placeholder при смене способа связи", () => {
    render(<ContactFormCard />);

    const contactTypeSelect = screen.getByLabelText(/Способ связи/i);
    const contactValueInput = screen.getByPlaceholderText(/email@example.com/i);

    expect(contactValueInput).toHaveAttribute(
      "placeholder",
      "email@example.com",
    );
    expect(contactValueInput).toHaveAttribute("type", "email");

    fireEvent.change(contactTypeSelect, { target: { value: "phone" } });

    const phoneInput = screen.getByPlaceholderText(/\+7 \(900\) 123-45-67/i);
    expect(phoneInput).toHaveAttribute("type", "tel");
  });

  it("показывает ошибку при невалидном контакте", async () => {
    render(<ContactFormCard />);

    const nameInput = screen.getByLabelText(/Как вам обращаться/i);
    const contactTypeSelect = screen.getByLabelText(/Способ связи/i);
    const messageInput = screen.getByLabelText(/Сообщение/i);
    const submitButton = screen.getByRole("button", {
      name: /Отправить заявку/i,
    });

    fireEvent.change(contactTypeSelect, { target: { value: "phone" } });

    const phoneInput = screen.getByPlaceholderText(/\+7 \(900\) 123-45-67/i);

    fireEvent.change(nameInput, { target: { value: "Иван" } });
    fireEvent.change(phoneInput, { target: { value: "123" } });
    fireEvent.change(messageInput, { target: { value: "Тестовое сообщение" } });

    fireEvent.submit(submitButton.closest("form")!);

    await waitFor(() => {
      expect(screen.getByText(/Ошибка отправки/i)).toBeInTheDocument();
    });
  });

  it("успешно отправляет форму с валидными данными", async () => {
    render(<ContactFormCard />);

    const nameInput = screen.getByLabelText(/Как вам обращаться/i);
    const contactValueInput = screen.getByPlaceholderText(/email@example.com/i);
    const messageInput = screen.getByLabelText(/Сообщение/i);
    const submitButton = screen.getByRole("button", {
      name: /Отправить заявку/i,
    });

    fireEvent.change(nameInput, { target: { value: "Иван Тестов" } });
    fireEvent.change(contactValueInput, {
      target: { value: "test@example.com" },
    });
    fireEvent.change(messageInput, { target: { value: "Тестовое сообщение" } });

    fireEvent.click(submitButton);

    expect(screen.getByText(/Отправка.../i)).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText(/Спасибо за обращение!/i)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it("показывает индикатор загрузки при отправке", async () => {
    render(<ContactFormCard />);

    const nameInput = screen.getByLabelText(/Как вам обращаться/i);
    const contactValueInput = screen.getByPlaceholderText(/email@example.com/i);
    const messageInput = screen.getByLabelText(/Сообщение/i);
    const submitButton = screen.getByRole("button", {
      name: /Отправить заявку/i,
    });

    fireEvent.change(nameInput, { target: { value: "Тест" } });
    fireEvent.change(contactValueInput, {
      target: { value: "test@example.com" },
    });
    fireEvent.change(messageInput, { target: { value: "Сообщение" } });

    fireEvent.click(submitButton);

    expect(screen.getByText(/Отправка.../i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("очищает форму после успешной отправки", async () => {
    render(<ContactFormCard />);

    const nameInput = screen.getByLabelText(
      /Как вам обращаться/i,
    ) as HTMLInputElement;
    const contactValueInput = screen.getByPlaceholderText(
      /email@example.com/i,
    ) as HTMLInputElement;
    const messageInput = screen.getByLabelText(
      /Сообщение/i,
    ) as HTMLTextAreaElement;
    const submitButton = screen.getByRole("button", {
      name: /Отправить заявку/i,
    });

    fireEvent.change(nameInput, { target: { value: "Тест" } });
    fireEvent.change(contactValueInput, {
      target: { value: "test@example.com" },
    });
    fireEvent.change(messageInput, { target: { value: "Сообщение" } });

    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(screen.getByText(/Спасибо за обращение!/i)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    expect(nameInput.value).toBe("");
    expect(contactValueInput.value).toBe("");
    expect(messageInput.value).toBe("");
  });
});
