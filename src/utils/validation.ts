const validate = (formData: Record<string, string>): string | boolean => {
  for (const key in formData) {
    if (!formData[key]) {
      return "Поля заполнены некорректно";
    }
  }

  return true;
};

export default validate;
