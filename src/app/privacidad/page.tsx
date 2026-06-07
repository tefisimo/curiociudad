import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = { title: "Política de privacidad — CurioCiudad" };

export default function PrivacidadPage() {
  return (
    <div style={{ backgroundColor: "#FAF8F5" }}>
      <SiteHeader />

      <section style={{ backgroundColor: "#0058BD", padding: "56px 0 52px" }}>
        <div className="mx-auto px-8" style={{ maxWidth: "1280px" }}>
          <h1 style={{ fontFamily: "var(--font-federo)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, textTransform: "uppercase", color: "#fff", lineHeight: 1.1 }}>
            Política de privacidad
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", marginTop: "12px" }}>
            Última actualización: junio de 2026
          </p>
        </div>
      </section>

      <div className="mx-auto px-8 py-16" style={{ maxWidth: "720px" }}>
        <div className="flex flex-col gap-8" style={{ fontSize: "15px", color: "#47433E", lineHeight: 1.8 }}>

          {[
            { titulo: "1. Responsable del tratamiento", texto: "CurioCiudad es responsable del tratamiento de los datos personales recogidos a través de este sitio web." },
            { titulo: "2. Datos que recopilamos", texto: "Recopilamos únicamente los datos que nos proporcionas voluntariamente: nombre, email y datos de contacto cuando completas formularios en nuestro sitio (registro de negocios, suscripción al newsletter o contacto)." },
            { titulo: "3. Finalidad del tratamiento", texto: "Los datos recopilados se utilizan exclusivamente para: gestionar las solicitudes de registro de negocios, enviar la newsletter a quienes se suscriban, y responder a consultas de contacto. No utilizamos tus datos para ningún otro fin." },
            { titulo: "4. Base jurídica", texto: "El tratamiento de tus datos se basa en el consentimiento que otorgas al completar nuestros formularios. Puedes retirar tu consentimiento en cualquier momento." },
            { titulo: "5. Conservación de datos", texto: "Conservamos tus datos únicamente durante el tiempo necesario para la finalidad para la que fueron recogidos, o hasta que solicites su eliminación." },
            { titulo: "6. Tus derechos", texto: "Tienes derecho a acceder, rectificar, suprimir, limitar el tratamiento y oponerte al uso de tus datos personales. Para ejercer cualquiera de estos derechos, contáctanos a través de nuestra página de contacto." },
            { titulo: "7. Cookies", texto: "Este sitio puede utilizar cookies técnicas necesarias para su funcionamiento. No utilizamos cookies de rastreo ni publicidad." },
            { titulo: "8. Contacto", texto: "Para cualquier consulta relacionada con tu privacidad, puedes contactarnos a través de nuestra página de contacto." },
          ].map(({ titulo, texto }) => (
            <div key={titulo}>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#000", marginBottom: "8px" }}>{titulo}</h2>
              <p>{texto}</p>
            </div>
          ))}

        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
