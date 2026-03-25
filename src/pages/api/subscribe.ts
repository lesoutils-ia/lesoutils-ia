import type { APIRoute } from 'astro';

export const prerender = false; // Important pour Render

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const email = data.get("email");

    if (!email || typeof email !== 'string') {
      return new Response(JSON.stringify({ message: "Email requis" }), { status: 400 });
    }

    // Sur Render, Astro récupère la variable via import.meta.env
    const apiKey = import.meta.env.BREVO_API_KEY;

    if (!apiKey) {
      console.error("ERREUR : La variable BREVO_API_KEY est introuvable sur Render.");
      return new Response(JSON.stringify({ message: "Erreur de config serveur" }), { status: 500 });
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": apiKey
      },
      body: JSON.stringify({
        email: email,
        listIds: [2], // Vérifie bien l'ID de ta liste dans Brevo
        updateEnabled: true
      })
    });

    if (response.ok) {
      return new Response(JSON.stringify({ message: "Succès" }), { status: 200 });
    } else {
      const errorDetail = await response.json();
      return new Response(JSON.stringify({ message: errorDetail.message }), { status: 500 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Erreur serveur" }), { status: 500 });
  }
};
