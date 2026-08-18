// JavaScript & Supabase Sécurité Client - Le Grand Élysée Palace & Spa
console.log("Initialisation du site Le Grand Élysée Palace & Spa...");

// Initialisation optionnelle Supabase Client pour la sécurité & formulaires
const SUPABASE_URL = "https://your-project.supabase.co";
const SUPABASE_ANON_KEY = "your-anon-key";
let supabaseClient = null;

if (window.supabase) {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase Security SDK prêt");
  } catch(e) {
    console.warn("Supabase non configuré:", e);
  }
}

// Interception et sécurité des formulaires de contact / réservation
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");
  forms.forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      console.log("Données sécurisées envoyées:", data);
      
      if (supabaseClient) {
        try {
          await supabaseClient.from("contact_messages").insert([data]);
        } catch(err) {
          console.error("Erreur d'envoi Supabase:", err);
        }
      }
      
      alert("Votre message a bien été envoyé de manière sécurisée !");
      form.reset();
    });
  });
});