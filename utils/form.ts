export async function sendFeedback({
  contact,
  message,
  lang,
  section,
}: {
  contact: string;
  message?: string;
  lang: string;
  section: string;
}) {
  try {
    const data = await $fetch(`${import.meta.env.VITE_API_URL}/feedback`, {
      method: "POST",

      body: {
        contact,
        message,
        section,
        lang,
      },
    });

    if (data) {
      return { status: true };
    }
  } catch (error: any) {
    const message = error.response?._data?.message;
    return { status: false, message };
  }
}
