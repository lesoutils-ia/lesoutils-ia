import type { APIRoute } from 'astro';

export const prerender = false; // Obligatoire pour une route API

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const email = data.get("email");

    // Vérification de base
    if (!email || typeof email !== 'string') {
      return new Response(JSON.stringify({ message: "Email requis" }), { status: 400 });
    }

    // Appel à l'API Brevo
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": import.meta.env.BREVO_API_KEY // <-- On appelle la variable du fichier .env
      },
      body: JSON.stringify({
        email: email,
        listIds: [2], // Vérifie dans Brevo > Contacts > Listes si ton ID est bien le 2
        updateEnabled: true // Permet de mettre à jour si le contact existe déjà
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
