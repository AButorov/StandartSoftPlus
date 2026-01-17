import { useState, type FormEvent, type ChangeEvent } from "react";

interface FormData {
  name: string;
  contactType: "phone" | "email" | "whatsapp" | "telegram";
  contactValue: string;
  message: string;
}

type ContactType = "phone" | "email" | "whatsapp" | "telegram";

export default function ContactFormCard() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contactType: "email",
    contactValue: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const contactOptions = [
    { value: "phone", label: "Телефон" },
    { value: "email", label: "E-mail" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "telegram", label: "Telegram" },
  ];

  const getContactPlaceholder = (): string => {
    switch (formData.contactType) {
      case "phone":
        return "+7 (900) 123-45-67";
      case "email":
        return "email@example.com";
      case "whatsapp":
        return "+7 (900) 123-45-67";
      case "telegram":
        return "@username или +7 (900) 123-45-67";
      default:
        return "";
    }
  };

  const getContactInputType = (): string => {
    switch (formData.contactType) {
      case "phone":
      case "whatsapp":
        return "tel";
      case "email":
        return "email";
      case "telegram":
        return "text";
      default:
        return "text";
    }
  };

  const validateContact = (value: string): boolean => {
    if (!value.trim()) return false;

    switch (formData.contactType) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "phone":
      case "whatsapp":
        return (
          /^[\d\s\+\-\(\)]+$/.test(value) &&
          value.replace(/\D/g, "").length >= 10
        );
      case "telegram":
        return value.length >= 2;
      default:
        return true;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateContact(formData.contactValue)) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      // Получаем API ключ из переменной окружения или используем заглушку
      const apiKey = import.meta.env.PUBLIC_WEB3FORMS_KEY || "DEMO_KEY";

      // Если ключ не настроен, показываем предупреждение
      if (apiKey === "DEMO_KEY") {
        console.warn(
          "Web3Forms API ключ не настроен. Форма работает в демо-режиме."
        );
        // Симулируем успешную отправку для демо
        setTimeout(() => {
          setStatus("success");
          setFormData({
            name: "",
            contactType: "email",
            contactValue: "",
            message: "",
          });
          setTimeout(() => setStatus("idle"), 5000);
        }, 1500);
        return;
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: apiKey,
          name: formData.name,
          contact_type: contactOptions.find(
            (opt) => opt.value === formData.contactType
          )?.label,
          contact: formData.contactValue,
          message: formData.message,
          subject: `Новая заявка от ${formData.name} (${contactOptions.find((opt) => opt.value === formData.contactType)?.label})`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          contactType: "email",
          contactValue: "",
          message: "",
        });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      setStatus("error");
    }
  };

  const handleContactTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      contactType: e.target.value as ContactType,
      contactValue: "",
    });
  };

  // Проверка, активен ли label
  const isLabelActive = (name: string): boolean => {
    if (focusedField === name) return true;
    const value = formData[name as keyof FormData];
    return value !== null && value !== undefined && value.toString().length > 0;
  };

  return (
    <div className="contact-form-card">
      <div className="card-header">
        <h2>Начнём сотрудничество</h2>
        <p>Расскажите о вашем проекте, консультация бесплатно</p>
      </div>

      <form onSubmit={handleSubmit} className="card-body">
        {/* Имя */}
        <div className="input-wrapper">
          <label
            htmlFor="name"
            className={`floating-label ${isLabelActive("name") ? "active" : ""}`}
          >
            Как вам обращаться? *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            className="form-input"
            placeholder=" "
          />
        </div>

        {/* Способ связи и контакт */}
        <div className="form-row">
          <div className="input-wrapper">
            <label
              htmlFor="contactType"
              className={`floating-label ${isLabelActive("contactType") ? "active" : ""}`}
            >
              Способ связи *
            </label>
            <select
              id="contactType"
              name="contactType"
              required
              value={formData.contactType}
              onChange={handleContactTypeChange}
              onFocus={() => setFocusedField("contactType")}
              onBlur={() => setFocusedField(null)}
              className="form-input form-select"
            >
              {contactOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="input-wrapper">
            <label
              htmlFor="contactValue"
              className={`floating-label ${isLabelActive("contactValue") ? "active" : ""}`}
            >
              {
                contactOptions.find((opt) => opt.value === formData.contactType)
                  ?.label
              }{" "}
              *
            </label>
            <input
              type={getContactInputType()}
              id="contactValue"
              name="contactValue"
              required
              value={formData.contactValue}
              onChange={(e) =>
                setFormData({ ...formData, contactValue: e.target.value })
              }
              onFocus={() => setFocusedField("contactValue")}
              onBlur={() => setFocusedField(null)}
              className="form-input"
              placeholder={getContactPlaceholder()}
            />
          </div>
        </div>

        {/* Сообщение */}
        <div className="input-wrapper">
          <label
            htmlFor="message"
            className={`floating-label ${isLabelActive("message") ? "active" : ""}`}
          >
            Сообщение *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            className="form-input form-textarea"
            placeholder=" "
          />
        </div>

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="submit-button"
        >
          {status === "loading" ? (
            <span className="button-content">
              <svg className="spinner" viewBox="0 0 24 24">
                <circle
                  className="spinner-circle"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  opacity="0.25"
                />
                <path
                  className="spinner-path"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Отправка...
            </span>
          ) : (
            "Отправить заявку →"
          )}
        </button>

        {/* Сообщение об успехе */}
        {status === "success" && (
          <div className="message message-success">
            <svg
              className="message-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3>Спасибо за обращение!</h3>
              <p>Мы свяжемся с вами в ближайшее время.</p>
            </div>
          </div>
        )}

        {/* Сообщение об ошибке */}
        {status === "error" && (
          <div className="message message-error">
            <svg
              className="message-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3>Ошибка отправки</h3>
              <p>Проверьте правильность заполнения и попробуйте снова.</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
